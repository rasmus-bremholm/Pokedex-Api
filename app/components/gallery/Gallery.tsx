import { Box, Container } from "@mui/material";
import GalleryItem from "./components/GalleryItem";
import { PokemonList } from "@/app/utils/types/pokemonList";

export default async function Gallery({ pokemonList }: { pokemonList: PokemonList }) {
	return (
		<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
			{pokemonList && pokemonList.results.map((pokemon) => <GalleryItem key={pokemon.name} name={pokemon.name} url={pokemon.url} />)}
		</Box>
	);
}
