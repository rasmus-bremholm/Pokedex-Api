import Link from "next/link";
export default function Navbar() {
	return (
		<nav className='bg-background flex items-center px-4'>
			<div>
				<Link href={"/"}>
					<h1 className='text-xl'>Pokedex</h1>
				</Link>
			</div>
			<div>{/* Switcher component here */}</div>
			<div>{/* Search component here */}</div>
		</nav>
	);
}
