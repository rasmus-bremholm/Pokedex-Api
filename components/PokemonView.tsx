import { getPokemonDetails } from "@/lib/utils/getPokemonDetails";
import { createHref } from "@/lib/utils/createHrefs";
import { imageBaseUrl, pokemonCount } from "@/consts/index";
import { SearchParams } from "@/types/searchParams";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ChevronRight } from "pixelarticons/react";
import StatBars from "./StatBars";
import SwipeNav from "./SwipeNav";
import PokemonViewEmpty from "@/components/PokemonViewEmpty";
import { getEvolutionChain } from "@/lib/utils/getEvolutionChain";

// Types whose colour is too dark for dark chip text.
const lightTextTypes = ["poison", "ghost", "fighting", "dragon", "dark"];

const peek = "absolute top-1/2 size-22 -translate-y-1/2 rounded-full bg-skeleton";

export default async function PokemonView({ searchParams }: { searchParams: SearchParams }) {
	const { selected } = await searchParams;
	const id = Number(selected);

	if (!id) return <PokemonViewEmpty />; //empty state

	const [details, evolution] = await Promise.all([getPokemonDetails(id), getEvolutionChain(id)]);
	const typeVar = { "--type-color": `var(--color-type-${details.types[0]})` } as React.CSSProperties;

	return (
		<SwipeNav key={id} id={id} name={details.name}>
			<p className='font-mono text-sm text-ink-secondary'>#{String(details.id).padStart(3, "0")}</p>
			<h2 aria-live='polite' className='text-[32px] leading-none uppercase md:text-[44px]'>
				{details.name}
			</h2>
			<div className='flex gap-2'>
				{details.types.map((t) => (
					<span
						key={t}
						style={{ "--type-color": `var(--color-type-${t})` } as React.CSSProperties}
						className={`rounded-full bg-(--type-color) px-4 py-2 text-xs uppercase ${lightTextTypes.includes(t) ? "text-white" : "text-[#1f2d38]"}`}>
						{t}
					</span>
				))}
			</div>

			<div className='relative -mx-6 flex min-h-0 flex-1 items-center justify-center self-stretch'>
				{id > 1 && <span aria-hidden='true' className={`${peek} left-0 -translate-x-1/2`} />}
				<div
					style={typeVar}
					className='grid size-[min(236px,30dvh)] place-items-center rounded-full border-2 border-dashed border-(--type-color) bg-(--type-color)/20 md:size-[min(420px,40dvh)]'>
					<Image src={details.image} width={380} height={380} alt={details.name} priority className='size-[90%] object-contain' />
				</div>
				{id < pokemonCount && <span aria-hidden='true' className={`${peek} right-0 translate-x-1/2`} />}
			</div>

			<div className='flex w-full items-center justify-between gap-3'>
				<div className='flex min-w-0 items-center gap-1.5 overflow-x-auto py-1'>
					{evolution.map((stage, i) => (
						<React.Fragment key={i}>
							{i > 0 && <ChevronRight aria-hidden='true' className='size-4 shrink-0 text-divider' />}
							{stage.map((entry) => (
								<Link
									key={entry.id}
									href={createHref(entry.id)}
									scroll={false}
									aria-current={entry.id === id ? "true" : undefined}
									className='flex w-18 shrink-0 flex-col items-center gap-1 rounded-xl border border-divider bg-card p-1.5 aria-[current=true]:border-3 aria-[current=true]:border-primary aria-[current=true]:bg-white'>
									<Image src={`${imageBaseUrl}${entry.id}.png`} width={40} height={40} alt='' />
									<span className='w-full truncate text-[8px] uppercase'>{entry.name}</span>
								</Link>
							))}
						</React.Fragment>
					))}
				</div>
				<details className='group shrink-0'>
					<summary className='btn cursor-pointer list-none gap-2 rounded-full px-6 text-xs uppercase [&::-webkit-details-marker]:hidden'>
						Stats <span className='transition-transform group-open:rotate-180'>▾</span>
					</summary>
					<div className='absolute inset-x-4 bottom-24 z-20 rounded-[20px] bg-white p-5 text-left shadow-lg'>
						<StatBars stats={details.stats} color={`var(--color-type-${details.types[0]})`} />
					</div>
				</details>
			</div>
		</SwipeNav>
	);
}
