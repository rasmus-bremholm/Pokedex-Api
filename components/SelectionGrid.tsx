"use client";

import { useEffect, useRef, useState } from "react";
import { Pokemon } from "@/types/pokemonList";
import SelectionGridCard from "@/components/SelectionGridCard";
import { createHref } from "@/lib/utils/createHrefs";

interface SelectionGridProps {
	pokemonList: Pokemon[];
	selectedId: number | null;
}

const pad = (n: number) => `#${String(n).padStart(3, "0")}`;

export default function SelectionGrid({ pokemonList, selectedId }: SelectionGridProps) {
	const tray = useRef<HTMLUListElement>(null);
	// Columns per page and column pitch (card + gap), measured from the DOM so CSS owns the sizes.
	const [geom, setGeom] = useState({ cols: 4, colW: 104 });
	const [page, setPage] = useState(0);

	const perPage = geom.cols * 2;
	const pageW = geom.cols * geom.colW;
	const pageCount = Math.ceil(pokemonList.length / perPage);

	useEffect(() => {
		const el = tray.current!;
		const measure = () => {
			const [first, , nextCol] = el.children as HTMLCollectionOf<HTMLElement>;
			// Hidden route (Next keeps it mounted under display:none): everything measures 0, so keep the last good geometry.
			if (!el.clientWidth || !nextCol) return;
			const colW = nextCol.offsetLeft - first.offsetLeft;
			const gap = colW - first.offsetWidth;
			setGeom({ colW, cols: Math.max(1, Math.floor((el.clientWidth - first.offsetLeft + gap) / colW)) });
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	// Keep the selected Pokémon's page in view (tap, hero swipe, surprise, deep link).
	useEffect(() => {
		if (!selectedId) return;
		tray.current!.scrollTo({ left: Math.floor((selectedId - 1) / perPage) * pageW, behavior: "smooth" });
	}, [selectedId, perPage, pageW]);

	// Grid flows column-first; reorder so each page reads row by row like the design.
	const slots = Array.from({ length: pageCount * perPage }, (_, k) => {
		const p = Math.floor(k / perPage);
		const r = k % perPage;
		return pokemonList[p * perPage + (r % 2) * geom.cols + Math.floor(r / 2)];
	});

	const first = page * perPage + 1;
	const last = Math.min((page + 1) * perPage, pokemonList.length);

	return (
		<section aria-label='Pokémon' className='mx-auto flex w-full max-w-[1200px] shrink-0 flex-col gap-3 py-4'>
			<div className='flex items-center justify-between px-5 text-xs'>
				<h2 className='uppercase'>Generation I</h2>
				<p className='font-mono text-ink-secondary'>
					{pad(first)}–{pad(last)}
				</p>
			</div>
			<ul
				ref={tray}
				onScroll={(e) => setPage(Math.round(e.currentTarget.scrollLeft / pageW))}
				className='relative grid snap-x snap-mandatory auto-cols-[92px] grid-flow-col grid-rows-2 gap-3 overflow-x-auto scroll-px-5 px-5 py-1 [scrollbar-width:none] lg:auto-cols-[132px]'>
				{slots.map((p, k) => (
					<li key={p?.id ?? `empty-${k}`} className={Math.floor(k / 2) % geom.cols === 0 ? "snap-start" : undefined}>
						{p && <SelectionGridCard id={p.id} name={p.name} href={createHref(p.id)} isSelected={p.id === selectedId} />}
					</li>
				))}
			</ul>
			<div aria-hidden='true' className='flex justify-center gap-1.5'>
				{Array.from({ length: pageCount }, (_, i) => (
					<span key={i} className={`h-2 rounded-full transition-all duration-200 ${i === page ? "w-6 bg-foreground" : "w-2 bg-divider"}`} />
				))}
			</div>
		</section>
	);
}
