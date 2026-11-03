import { Suspense } from "react";
import Selector from "@/components/Selector";
import type { SearchParams } from "@/types/searchParams";

export default function Home({ searchParams }: { searchParams: SearchParams }) {
	return (
		<>
			<main className='bg-surface'></main>
			<Suspense fallback={<p>Loading...</p>}>
				<Selector searchParams={searchParams} />
			</Suspense>
		</>
	);
}
