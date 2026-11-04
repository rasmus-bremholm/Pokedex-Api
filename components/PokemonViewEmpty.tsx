import Link from "next/link";
import { createHref } from "@/lib/utils/createHrefs";
import { itemsPerPage } from "@/consts";
import { connection } from "next/server";
import { getRandomPokemonId } from "@/lib/utils/getRandomPokemonId";

export default async function PokemonViewEmpty() {
	await connection();
	const randomId = getRandomPokemonId();

	return (
		<div className='flex h-full p-4 gap-10'>
			<div className='flex flex-1 flex-col max-w-95  gap-2'>
				<p># ???</p>
				<h1>PICK A POKEMON</h1>
				<p className=' font-mono text-sm'>Chose one from the grid below, or search by name or number</p>
				<div className='flex flex-col gap-4'>
					<h3 className='capitalize'>Base Stats</h3>
					<div className='flex max-w-105 flex-col gap-2.5'>
						{Array.from({ length: 6 }, (_, i) => (
							<div key={i} className='bg-divider/20 h-px m-2' />
						))}
					</div>
				</div>
				<Link className='btn self-start' href={createHref(Math.ceil(randomId / itemsPerPage), randomId)}>
					Surprise Me
				</Link>
			</div>
			<div className='flex flex-1 flex-col items-center justify-center gap-4 w-full'>
				<div className='w-95 aspect-square rounded-full bg-[#e8e8ec] border border-dashed border-divider flex items-center justify-center'>?</div>
			</div>
		</div>
	);
}
