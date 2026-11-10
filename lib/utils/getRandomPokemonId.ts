import { pokemonCount } from "@/consts";
export function getRandomPokemonId() {
	return Math.floor(Math.random() * pokemonCount) + 1;
}
