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
			<main className='relative z-10 min-h-0 flex-1 overflow-hidden bg-surface shadow-[0_2px_0_#b9b8c6]'>
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
