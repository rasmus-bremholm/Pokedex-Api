import { getPokemonList } from "@/lib/utils/getPokemonList";
import SelectionGrid from "./SelectionGrid";
import type { SearchParams } from "@/types/searchParams";

export default async function Selector({ searchParams }: { searchParams: SearchParams }) {
	const { selected } = await searchParams;
	const pokemonList = await getPokemonList();

	return <SelectionGrid pokemonList={pokemonList} selectedId={selected ? Number(selected) : null} />;
}
