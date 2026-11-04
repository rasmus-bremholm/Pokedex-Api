import { itemsPerPage } from "@/consts";

export default function SelectorSkeleton() {
	return (
		<div className='bg-background'>
			<ul className='grid grid-cols-[repeat(7,8.75rem)] justify-center gap-2 p-2' aria-hidden='true'>
				{Array.from({ length: itemsPerPage }, (_, i) => (
					<li key={i}>
						<div className='flex aspect-square animate-pulse flex-col items-center justify-center gap-2 rounded-2xl border border-divider bg-surface'>
							<div className='size-16 rounded-full bg-divider/20' />
							<div className='h-4 w-10 rounded bg-divider/20' />
							<div className='h-4 w-20 rounded bg-divider/20' />
						</div>
					</li>
				))}
			</ul>
			<div className='flex items-center justify-center gap-4'>
				<span className='btn opacity-50'>Prev</span>
				<span className='btn opacity-50'>Next</span>
			</div>
		</div>
	);
}
