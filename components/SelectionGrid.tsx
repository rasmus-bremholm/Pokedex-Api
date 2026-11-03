import { Pokemon } from "@/types/pokemonList";

import SelectionGridCard from "@/components/SelectionGridCard";
import { createHref } from "@/lib/utils/createHrefs";

interface SelectionGridProps {
	pokemonList: Pokemon[];
	page: number;
	selectedId: number | null;
}

export default function SelectionGrid({ pokemonList, page, selectedId }: SelectionGridProps) {
	return (
		<ul className='grid grid-cols-[repeat(7,8.75rem)] justify-center gap-4 p-4'>
			{pokemonList.map((p) => (
				<li key={p.id}>
					<SelectionGridCard id={p.id} name={p.name} href={createHref(page, p.id)} isSelected={p.id === selectedId} />
				</li>
			))}
		</ul>
	);
}
