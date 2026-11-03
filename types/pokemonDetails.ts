export type PokemonDetailsResponse = {
	id: number;
	name: string;
	height: number;
	weight: number;
	types: { type: { name: string } }[];
	stats: { base_stat: number; stat: { name: string } }[];
	sprites: { other: { "official-artwork": { front_default: string } } };
};

export type PokemonDetails = {
	id: number;
	name: string;
	height: number;
	weight: number;
	types: string[];
	stats: { name: string; value: number }[];
	image: string;
};
