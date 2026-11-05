import { cacheLife, cacheTag } from "next/cache";
import { baseUrl } from "@/consts/index";
import { fetchJson } from "./fetchJson";

import type { SpeciesResponse, ChainResponse, ChainNode, EvolutionEntry, EvolutionDetail, EvolutionChain } from "@/types/evolutionChain";
import { getIdFromUrl } from "./getIdFromUrl";

function getRequirement(d?: EvolutionDetail): string | null {
	if (!d) return null;
	if (d.min_level) return `Lv ${d.min_level}`;
	if (d.item) return d.item.name.replace("-", " ");
	if (d.trigger.name === "trade") return "Trade";
	return null;
}

function flattenChain(node: ChainNode, depth = 0, stages: EvolutionEntry[][] = []) {
	const id = getIdFromUrl(node.species.url);

	if (id <= 151) {
		(stages[depth] ??= []).push({
			id,
			name: node.species.name,
			requirement: getRequirement(node.evolution_details[0]),
		});
	}

	node.evolves_to.forEach((next) => flattenChain(next, depth + 1, stages));
	return stages;
}

export async function getEvolutionChain(pokemonId: number): Promise<EvolutionChain> {
	"use cache";
	cacheLife("max");
	cacheTag(`evolution-${pokemonId}`);

	const species = await fetchJson<SpeciesResponse>(`${baseUrl}pokemon-species/${pokemonId}`);
	const chain = await fetchJson<ChainResponse>(species.evolution_chain.url);

	return flattenChain(chain.chain).filter((stage) => stage.length);
}
