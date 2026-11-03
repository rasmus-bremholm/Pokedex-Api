import { Suspense } from "react";
import Selector from "@/components/Selector";
import type { SearchParams } from "@/types/searchParams";
import PokemonView from "@/components/PokemonView";

export default function Home({ searchParams }: { searchParams: SearchParams }) {
	return (
		<>
			<main className='bg-surface'>
				<Suspense fallback={<p>Loading...</p>}>
					<PokemonView searchParams={searchParams} />
				</Suspense>
			</main>
			<Suspense fallback={<p>Loading...</p>}>
				<Selector searchParams={searchParams} />
			</Suspense>
		</>
	);
}
