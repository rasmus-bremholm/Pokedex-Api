import { getPokemonDetails } from "@/lib/utils/getPokemonDetails";
import { createHref } from "@/lib/utils/createHrefs";
import { imageBaseUrl, itemsPerPage } from "@/consts/index";
import { SearchParams } from "@/types/searchParams";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StatBars from "./StatBars";
import PokemonViewEmpty from "@/components/PokemonViewEmpty";
import { getEvolutionChain } from "@/lib/utils/getEvolutionChain";

function InfoBox({ label, value }: { label: string; value: string }) {
	return (
		<div className='flex flex-col border border-divider rounded-xl px-3.5 py-2.5'>
			<p className='font-mono text-sm'>{label}</p>
			<p className='font-mono text-lg'>{value}</p>
		</div>
	);
}

export default async function PokemonView({ searchParams }: { searchParams: SearchParams }) {
	const { selected } = await searchParams;
	const selectedId = selected ? Number(selected) : null;

	if (!selectedId) return <PokemonViewEmpty />; //empty state

	const [details, evolution] = await Promise.all([getPokemonDetails(selectedId), getEvolutionChain(selectedId)]);

	return (
		<div className='flex p-4 gap-10'>
			<div className='flex flex-1 flex-col gap-2'>
				<p>#{details.id}</p>
				<h2 className='text-4xl'>{details.name}</h2>
				<div className='flex gap-2'>
					{details.types.map((t) => (
						<span
							key={t}
							style={{ "--type-color": `var(--color-type-${t})` } as React.CSSProperties}
							className='rounded-full bg-(--type-color) px-4 py-2 text-xs capitalize text-surface'>
							{t}
						</span>
					))}
				</div>
				<div className='grid grid-cols-2 gap-4 max-w-[320px]'>
					<InfoBox label='Height' value={`${details.height} m`} />
					<InfoBox label='Weight' value={`${details.weight} kg`} />
				</div>
				<div className='flex flex-col gap-4'>
					<h3 className='capitalize'>Base Stats</h3>
					<StatBars key={details.id} stats={details.stats} color={`var(--color-type-${details.types[0]})`} />
				</div>
			</div>
			<div className='flex flex-1 flex-col items-center justify-center gap-4 w-full'>
				<Image src={details.image} width={380} height={380} alt={details.name} />
				<div className="flex gap-6">
					{evolution.map((stage, i) => (
						<div key={i} className='flex flex-col gap-2'>
							{stage.map((entry) => (
								<Link className='flex flex-col items-center border border-divider rounded-xl p-2' href={createHref(Math.ceil(entry.id / itemsPerPage), entry.id)} key={entry.id}>
									<Image src={`${imageBaseUrl}${entry.id}.png`} width={48} height={48} alt='' />
									<p>{entry.name}</p>
								</Link>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
