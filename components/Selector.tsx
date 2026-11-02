import { getPokemonList } from "@/lib/utils/getPokemonList";
import SelectionGrid from "./SelectionGrid";
import { Pokemon } from "@/types/pokemonList";

export default async function Selector() {
	const pokemonList: Pokemon[] = await getPokemonList();

	return (
		<nav className='bg-background'>
			<SelectionGrid pokemonList={pokemonList} />
		</nav>
	);
}
