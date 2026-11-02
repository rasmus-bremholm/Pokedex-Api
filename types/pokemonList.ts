export type PokemonListItemResponse = {
	name: string;
	url: string;
};

export type PokemonListResponse = {
	results: PokemonListItemResponse[];
};

export type Pokemon = {
	id: number;
	name: string;
};
