import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";

export default function Navbar() {
	return (
		<header className='flex shrink-0 items-center justify-between gap-3 border-b border-rule bg-background px-5 py-3'>
			<Link href='/' aria-label='Pokédex home' className='grid size-11 place-items-center rounded-xl bg-foreground text-xs text-surface'>
				Dex
			</Link>
			<ModeToggle />
			{/* ponytail: spacer keeps the toggle centred; search icon goes here when search exists */}
			<span aria-hidden='true' className='size-11' />
		</header>
	);
}
