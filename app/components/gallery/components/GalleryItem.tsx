"use client";
import { Box, Typography } from "@mui/material";
import type { PokemonListItem } from "@/app/utils/types/pokemonList";
import Image from "next/image";
import { imageBaseUrl } from "@/app/utils/consts";

export default function GalleryItem({ name, url }: PokemonListItem) {
	const id = url.split("/").filter(Boolean).at(-1);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				border: "2px solid",
				borderRadius: 3,
				aspectRatio: 1,
				borderColor: "divider",
				"&:hover": {
					borderColor: "text.primary",
				},
			}}>
			<Image src={`${imageBaseUrl}${id}.png`} alt={name} height={125} width={125} />
			{name}
		</Box>
	);
}
