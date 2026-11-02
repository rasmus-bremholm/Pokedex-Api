"use client";

import { Pokemon } from "@/types/pokemonList";
import { useState } from "react";

export default function SelectionGrid({ pokemonList }: { pokemonList: Pokemon[] }) {
	const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
	return (
		<ul className='grid grid-cols-7 gap-4'>
			{pokemonList.map((p) => (
				<li key={p.id}>{p.name}</li>
			))}
		</ul>
	);
}
