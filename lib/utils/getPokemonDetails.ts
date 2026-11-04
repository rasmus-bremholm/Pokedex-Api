import { cacheLife, cacheTag } from "next/cache";
import { baseUrl } from "@/consts/index";
import type { PokemonDetails, PokemonDetailsResponse } from "@/types/pokemonDetails";
import { getIdFromUrl } from "@/lib/utils/getIdFromUrl";

export async function getPokemonDetails(id: number): Promise<PokemonDetails> {
	"use cache";
	cacheLife("max");
	cacheTag(`pokemon-${id}`);

	const response = await fetch(`${baseUrl}pokemon/${id}`);
	if (!response.ok) throw new Error(`PokeAPI ${response.status}`);
	const data = (await response.json()) as PokemonDetailsResponse;

	return {
		id: data.id,
		name: data.name,
		height: data.height / 10,
		weight: data.weight / 10,
		types: data.types.map((t) => t.type.name),
		stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
		image: data.sprites.other["official-artwork"].front_default,
	};
}
