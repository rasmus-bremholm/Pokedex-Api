export type SpeciesResponse = {
	evolution_chain: { url: string };
};

export type EvolutionDetail = {
	min_level: number | null;
	item: { name: string } | null;
	trigger: { name: string };
};

export type ChainNode = {
	species: { name: string; url: string };
	evolution_details: EvolutionDetail[];
	evolves_to: ChainNode[];
};

export type ChainResponse = {
	chain: ChainNode;
};

export type EvolutionEntry = { id: number; name: string; requirement: string | null };
export type EvolutionChain = EvolutionEntry[][];
