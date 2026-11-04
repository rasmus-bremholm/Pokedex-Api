import { Suspense } from "react";
import Selector from "@/components/Selector";
import type { SearchParams } from "@/types/searchParams";
import PokemonView from "@/components/PokemonView";
// Skeletons
import PokemonViewSkeleton from "@/components/skeletons/PokemonViewSkeleton";
import SelectorSkelton from "@/components/skeletons/SelectorSkeleton";

export default function Home({ searchParams }: { searchParams: SearchParams }) {
	return (
		<>
			<main className='bg-surface grid px-20'>
				<Suspense fallback={<PokemonViewSkeleton />}>
					<PokemonView searchParams={searchParams} />
				</Suspense>
			</main>
			<Suspense fallback={<SelectorSkelton />}>
				<Selector searchParams={searchParams} />
			</Suspense>
		</>
	);
}
