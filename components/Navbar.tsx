export default function Navbar() {
	return (
		<nav className='bg-background flex items-center px-4'>
			<div>
				<h1 className='text-xl'>Pokedex</h1>
			</div>
			<div>{/* Switcher component here */}</div>
			<div>{/* Search component here */}</div>
		</nav>
	);
}
