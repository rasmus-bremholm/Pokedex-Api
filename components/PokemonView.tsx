import { getPokemonDetails } from "@/lib/utils/getPokemonDetails";
import { SearchParams } from "@/types/searchParams";
import Image from "next/image";
import React from "react";
import StatBars from "./StatBars";

function InfoBox({ label, value }: { label: string; value: string }) {
	return (
		<div className='flex flex-col border border-divider/30 rounded-xl px-3.5 py-2.5'>
			<p className='font-mono text-sm'>{label}</p>
			<p className='font-mono text-lg'>{value}</p>
		</div>
	);
}

export default async function PokemonView({ searchParams }: { searchParams: SearchParams }) {
	const { selected } = await searchParams;
	const selectedId = selected ? Number(selected) : null;

	if (!selectedId) return <div></div>; //empty state

	const details = await getPokemonDetails(selectedId);

	return (
		<div className='flex p-4 gap-10'>
			<div className='flex flex-1 flex-col gap-4'>
				<p>#{details.id}</p>
				<h1>{details.name}</h1>
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
					{/* I should probably make components out of these. Break these out later */}
					<InfoBox label='Height' value={`${details.height} m`} />
					<InfoBox label='Weight' value={`${details.weight} kg`} />
				</div>
				<div className='flex flex-col gap-4'>
					<h3 className='capitalize'>Base Stats</h3>
					<StatBars key={details.id} stats={details.stats} color={`var(--color-type-${details.types[0]})`} />
				</div>
			</div>
			<div className='flex flex-1 flex-col items-center gap-4 w-full'>
				<Image src={details.image} width={380} height={380} alt={details.name} />
			</div>
		</div>
	);
}
