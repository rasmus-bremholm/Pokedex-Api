export default function Navbar() {
	return (
		<nav className='bg-background flex items-center px-4'>
			<div>
				<p className='text-3xl'>Pokedex</p>
			</div>
			<div>{/* Switcher component here */}</div>
			<div>{/* Search component here */}</div>
		</nav>
	);
}
