import { cacheLife, cacheTag } from "next/cache";
import { baseUrl } from "@/consts/index";
import type { PokemonListResponse } from "@/types/pokemonList";
import { getIdFromUrl } from "@/lib/utils/getIdFromUrl";

export async function getPokemonList() {
	"use cache";
	cacheLife("max");
	cacheTag("pokemon");

	const response = await fetch(`${baseUrl}pokemon?limit=151`);
	if (!response.ok) throw new Error(`PokeAPI ${response.status}`);
	const data = (await response.json()) as PokemonListResponse;

	return data.results.map((pokemon) => ({
		id: getIdFromUrl(pokemon.url),
		name: pokemon.name,
	}));
}
