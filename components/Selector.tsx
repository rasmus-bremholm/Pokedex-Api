import { getPokemonList } from "@/lib/utils/getPokemonList";
import SelectionGrid from "./SelectionGrid";
import { Pokemon } from "@/types/pokemonList";
import type { SearchParams } from "@/types/searchParams";
import { itemsPerPage } from "@/consts";

export default async function Selector({ searchParams }: { searchParams: SearchParams }) {
	const { page = "1", selected } = await searchParams;
	const currentPage = Number(page);
	const selectedId = selected ? Number(selected) : null;

	const pokemonList: Pokemon[] = await getPokemonList();
	const start = (currentPage - 1) * itemsPerPage;
	const pageList = pokemonList.slice(start, start + itemsPerPage);

	return (
		<nav className='bg-background'>
			<SelectionGrid pokemonList={pageList} page={currentPage} selectedId={selectedId} />
		</nav>
	);
}
