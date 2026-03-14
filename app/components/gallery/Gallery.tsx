import { Box, Container } from "@mui/material";
import { getPokemonList } from "@/app/utils/actions/getPokemonList";
import GalleryItem from "./components/GalleryItem";

export default async function Gallery() {
	const pokemonList = await getPokemonList();

	return (
		<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
			{pokemonList && pokemonList.results.map((pokemon) => <GalleryItem key={pokemon.name} name={pokemon.name} url={pokemon.url} />)}
		</Box>
	);
}
