"use client";

import { itemsPerPage } from "@/consts";
import { Pokemon } from "@/types/pokemonList";
import { useState } from "react";

export default function SelectionGrid({ pokemonList }: { pokemonList: Pokemon[] }) {
	const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
	const [page, setPage] = useState(0);

	console.log(selectedPokemon);

	const start = (page - 1) * itemsPerPage;
	const pageList = pokemonList.slice(start, start + itemsPerPage);

	return (
		<ul className='grid grid-cols-7 gap-4'>
			{pokemonList.map((p) => (
				<li onClick={() => setSelectedPokemon(p.id)} key={p.id}>
					{p.name}
				</li>
			))}
		</ul>
	);
}
