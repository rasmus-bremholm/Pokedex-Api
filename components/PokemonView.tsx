import { getPokemonDetails } from "@/lib/utils/getPokemonDetails";
import { SearchParams } from "@/types/searchParams";
import Image from "next/image";

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
				<div className='flex'>
					{details.types.map((t) => (
						<div key={t}>{t}</div>
					))}
				</div>
				<div className='grid grid-cols-2 gap-4 max-w-[320px]'>
					{/* I should probably make components out of these. Break these out later */}
					<div className='flex flex-col border border-divider/30 rounded-xl px-3.5 py-2.5'>
						<p className='font-mono text-sm'>Height</p>
						<p className='font-mono text-lg'>{details.height}</p>
					</div>
					<div className='flex flex-col border border-divider/30 rounded-xl px-3.5 py-2.5'>
						<p className='font-mono text-sm'>Weight</p>
						<p className='font-mono text-lg'>{details.weight}</p>
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					<h3 className='capitalize'>Base Stats</h3>
				</div>
			</div>
			<div className='flex flex-1 flex-col items-center gap-4 w-full'>
				<Image src={details.image} width={380} height={380} alt={details.name} />
			</div>
		</div>
	);
}
