import { Pokemon } from "@/types/pokemonList";
import Link from "next/link";
import { createHref } from "@/lib/utils/createHrefs";

interface SelectionGridProps {
	pokemonList: Pokemon[];
	page: number;
	selectedId: number | null;
}

export default function SelectionGrid({ pokemonList, page, selectedId }: SelectionGridProps) {
	return (
		<ul className='grid grid-cols-7 gap-4'>
			{pokemonList.map((p) => (
				<li key={p.id}>
					<Link
						aria-current={p.id === selectedId ? "true" : undefined}
						className='block aria-[current=true]:ring-2 aria-[current=true]:ring-primary'
						scroll={false}
						href={createHref(page, p.id)}>
						{p.name}
					</Link>
				</li>
			))}
		</ul>
	);
}
