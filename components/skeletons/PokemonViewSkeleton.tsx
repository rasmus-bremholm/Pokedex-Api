const block = "rounded bg-divider/20";

export default function PokemonViewSkeleton() {
	return (
		<div className='flex animate-pulse gap-10 p-4'>
			<div className='flex flex-1 flex-col gap-4'>
				<div className={`h-6 w-12 ${block}`} />
				<div className={`h-12 w-64 ${block}`} />
				<div className='flex gap-2'>
					<div className='h-8 w-20 rounded-full bg-divider/20' />
					<div className='h-8 w-20 rounded-full bg-divider/20' />
				</div>
				<div className='grid max-w-[320px] grid-cols-2 gap-4'>
					<div className='h-[68px] rounded-xl bg-divider/20' />
					<div className='h-[68px] rounded-xl bg-divider/20' />
				</div>
				<div className='flex flex-col gap-4'>
					<h3>Base Stats</h3>
					<div className='flex max-w-105 flex-col gap-2.5'>
						{Array.from({ length: 6 }, (_, i) => (
							<div key={i} className={`h-5 ${block}`} />
						))}
					</div>
				</div>
			</div>
			<div className='flex flex-1 flex-col items-center gap-4'>
				<div className='aspect-square w-[380px] rounded-full bg-divider/20' />
			</div>
		</div>
	);
}
