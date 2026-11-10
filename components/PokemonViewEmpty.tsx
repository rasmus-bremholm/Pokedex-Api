import Link from "next/link";
import { createHref } from "@/lib/utils/createHrefs";
import { connection } from "next/server";
import { getRandomPokemonId } from "@/lib/utils/getRandomPokemonId";
import { Shuffle } from "pixelarticons/react";

export default async function PokemonViewEmpty() {
	await connection();
	const randomId = getRandomPokemonId();

	return (
		<div className='flex h-full flex-col items-center gap-3 px-6 py-5 text-center'>
			<h2 className='text-[30px] leading-none uppercase'>Pick a Pokémon</h2>
			<p className='font-body text-ink-secondary'>Tap one below, or swipe them along.</p>
			<div className='flex min-h-0 flex-1 items-center'>
				<div
					aria-hidden='true'
					className='grid size-[min(236px,30dvh)] place-items-center rounded-full border-2 border-dashed border-divider bg-card text-7xl text-divider/60 md:size-[min(420px,40dvh)]'>
					?
				</div>
			</div>
			<Link className='btn gap-3 rounded-full border-primary bg-primary px-8 text-xs uppercase text-[#1f2d38]' href={createHref(randomId)} scroll={false}>
				<Shuffle aria-hidden='true' />
				Surprise me
			</Link>
		</div>
	);
}
