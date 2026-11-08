import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";

export default function Navbar() {
	return (
		<nav className='bg-background flex items-center px-4 gap-4 md:gap-8'>
			<div>
				<Link href={"/"}>
					<h1 className='text-xl'>Pokedex</h1>
				</Link>
			</div>
			<div>
				<ModeToggle />
			</div>
			<div>{/* Search component here */}</div>
		</nav>
	);
}
