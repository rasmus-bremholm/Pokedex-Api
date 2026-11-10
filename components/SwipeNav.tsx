"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { createHref } from "@/lib/utils/createHrefs";
import { pokemonCount } from "@/consts";

const swipeThreshold = 50;
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// ponytail: module-level hand-off. The outgoing card sets the direction, and the next card (a fresh mount via key) reads it to slide in from that side.
let enterFrom = 0;

export default function SwipeNav({ id, name, children }: { id: number; name: string; children: React.ReactNode }) {
	const router = useRouter();
	const card = useRef<HTMLElement>(null);
	const startX = useRef<number | null>(null);
	const swiped = useRef(false);
	const hasPrev = id > 1;
	const hasNext = id < pokemonCount;

	// Neighbours are ready before the finger lifts, so the swipe never waits on the server.
	useEffect(() => {
		if (hasPrev) router.prefetch(createHref(id - 1));
		if (hasNext) router.prefetch(createHref(id + 1));
	}, [id, hasPrev, hasNext, router]);

	// Enter: slide in from the swipe side, or pop in (tap, surprise, first load).
	useGSAP(
		() => {
			const from = enterFrom;
			enterFrom = 0;
			if (from && !reducedMotion()) {
				gsap.from(card.current, { x: from * card.current!.offsetWidth * 0.6, opacity: 0, duration: 0.35, ease: "power3.out" });
			} else {
				gsap.from(card.current, { opacity: 0, scale: reducedMotion() ? 1 : 0.96, duration: 0.3, ease: "power2.out" });
			}
		},
		{ scope: card },
	);

	const settle = () => {
		gsap.to(card.current, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" });
	};
	const go = (dir: 1 | -1) => {
		if (!(dir > 0 ? hasNext : hasPrev)) return settle();
		enterFrom = dir;
		gsap.to(card.current, {
			x: reducedMotion() ? 0 : -dir * card.current!.offsetWidth * 0.6,
			opacity: 0,
			duration: 0.2,
			ease: "power2.in",
		});
		router.push(createHref(id + dir), { scroll: false });
	};

	const release = (clientX: number) => {
		if (startX.current === null) return;
		const dx = clientX - startX.current;
		startX.current = null;
		if (Math.abs(dx) < swipeThreshold) return settle();
		swiped.current = true; // a swipe never counts as a tap
		go(dx < 0 ? 1 : -1);
	};

	return (
		<section
			ref={card}
			aria-label={name}
			tabIndex={0}
			onPointerDown={(e) => {
				startX.current = e.clientX;
				swiped.current = false;
				gsap.killTweensOf(card.current);
			}}
			onPointerMove={(e) => {
				if (startX.current === null) return;
				const dx = e.clientX - startX.current;
				const atEdge = (dx > 0 && !hasPrev) || (dx < 0 && !hasNext);
				gsap.set(card.current, { x: atEdge ? dx * 0.3 : dx }); // rubber-band when there's no neighbour
			}}
			onPointerUp={(e) => release(e.clientX)}
			onPointerCancel={() => {
				startX.current = null;
				settle();
			}}
			onPointerLeave={(e) => release(e.clientX)}
			onClickCapture={(e) => {
				if (!swiped.current) return;
				e.preventDefault();
				e.stopPropagation();
				swiped.current = false;
			}}
			onDragStart={(e) => e.preventDefault()}
			onKeyDown={(e) => {
				if (e.key === "ArrowRight") go(1);
				if (e.key === "ArrowLeft") go(-1);
			}}
			className='relative flex h-full touch-pan-y select-none flex-col items-center gap-3 px-6 py-5 text-center outline-none focus-visible:ring-3 focus-visible:ring-primary focus-visible:ring-inset'>
			{children}
		</section>
	);
}
