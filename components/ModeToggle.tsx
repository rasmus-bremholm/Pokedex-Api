"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { modes } from "@/consts/index";

export default function ModeToggle() {
	const pathname = usePathname();
	const activeIndex = modes.findIndex((m) => m.href === pathname);

	return (
		<nav aria-label='Mode' className='relative grid grid-cols-2 rounded-full border border-divider bg-surface p-1'>
			<span
				aria-hidden='true'
				className='absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-foreground transition-transform duration-300 ease-out'
				style={{ transform: `translateX(${activeIndex * 100}%)` }}
			/>
			{modes.map((m, i) => (
				<Link
					key={m.href}
					href={m.href}
					aria-current={i === activeIndex ? "page" : undefined}
					className='relative z-10 px-6 py-3 text-xs text-center transition-colors duration-300 aria-[current=page]:text-surface'>
					{m.label}
				</Link>
			))}
		</nav>
	);
}
