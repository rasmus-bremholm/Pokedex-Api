import { cacheLife, cacheTag } from "next/cache";
import { baseUrl } from "../consts";
import type { PokemonList } from "../types/pokemonList";

export async function getPokemonList() {
	"use cache";
	cacheLife("max");
	cacheTag("pokemon");

	const response = await fetch(`${baseUrl}pokemon?limit=151`);
	const data = (await response.json()) as PokemonList;

	return data;
}
