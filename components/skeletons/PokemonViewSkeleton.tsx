export default function PokemonViewSkeleton() {
	return (
		<div aria-hidden='true' className='flex h-full animate-pulse flex-col items-center gap-3 px-6 py-5'>
			<div className='h-4 w-12 rounded bg-skeleton' />
			<div className='h-8 w-56 rounded bg-skeleton' />
			<div className='flex gap-2'>
				<div className='h-8 w-20 rounded-full bg-skeleton' />
				<div className='h-8 w-20 rounded-full bg-skeleton' />
			</div>
			<div className='flex min-h-0 flex-1 items-center'>
				<div className='size-[min(236px,30dvh)] rounded-full bg-skeleton md:size-[min(420px,40dvh)]' />
			</div>
		</div>
	);
}
