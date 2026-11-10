export default function SelectorSkeleton() {
	return (
		<div aria-hidden='true' className='mx-auto flex w-full max-w-[1200px] shrink-0 flex-col gap-3 py-4'>
			<div className='h-4 w-32 mx-5 rounded bg-skeleton' />
			<ul className='grid auto-cols-[92px] grid-flow-col grid-rows-2 gap-3 overflow-hidden px-5 py-1 lg:auto-cols-[132px]'>
				{Array.from({ length: 16 }, (_, i) => (
					<li key={i} className='h-25 animate-pulse rounded-2xl border border-divider bg-card lg:h-35' />
				))}
			</ul>
			<div className='h-2' />
		</div>
	);
}
