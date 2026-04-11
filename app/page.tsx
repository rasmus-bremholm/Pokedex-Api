import Typography from "@mui/material/Typography";
import Gallery from "./components/gallery/Gallery";
import { getPokemonList } from "@/app/utils/actions/getPokemonList";
import { itemsPerPage } from "@/app/utils/consts";

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const pokemonList = await getPokemonList();
	const { page } = await searchParams;
	const currentPage = Number(page) ?? 1;

	const start = (currentPage - 1) * itemsPerPage;
	const paginatedPokemonList = pokemonList.results.slice(start, start + itemsPerPage);

	return <Gallery pokemonList={paginatedPokemonList} />;
}
