import { Box, Typography, Container } from "@mui/material";

export default function Navbar() {
	return (
		<Box component='nav'>
			<Container maxWidth='xl' sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 100 }}>
				<Box>Pokedex</Box>
				<Box>Search</Box>
			</Container>
		</Box>
	);
}
