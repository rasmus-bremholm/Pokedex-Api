"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface StatBarsProps {
	stats: { name: string; value: number }[];
	color: string;
}

const statLabels: Record<string, string> = {
	hp: "HP",
	attack: "Attack",
	defense: "Defense",
	"special-attack": "Sp. Atk",
	"special-defense": "Sp. Def",
	speed: "Speed",
};

const maxStat = 255;

export default function StatBars({ stats, color }: StatBarsProps) {
	const container = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			gsap.to(".stat-fill", { scaleX: 1, duration: 0.8, ease: "power2.out", stagger: 0.08 });
		},
		{ scope: container },
	);
	return (
		<div ref={container} className='flex max-w-105 flex-col gap-2.5'>
			{stats.map((s) => (
				<div key={s.name} className='grid grid-cols-[72px_36px_1fr] items-center gap-3'>
					<span className='text-xs'>{statLabels[s.name] ?? s.name}</span>
					<span className='text-right font-mono text-sm'>{s.value}</span>
					<span className='h-2 overflow-hidden rounded-full bg-divider/20'>
						<span
							aria-hidden='true'
							className='stat-fill block h-full origin-left rounded-full'
							style={{ width: `${(s.value / maxStat) * 100}%`, backgroundColor: color, transform: "scaleX(0)" }}
						/>
					</span>
				</div>
			))}
		</div>
	);
}
