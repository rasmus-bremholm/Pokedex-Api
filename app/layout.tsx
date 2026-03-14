import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeRegistry from "./utils/theme/ThemeRegistry";
import Navbar from "./components/navbar/Navbar";
import { Container } from "@mui/material";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Pokedex",
	description: "A Next.js Pokedex application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${geistSans.variable} ${geistMono.variable}`}>
			<body>
				<Navbar />
				<ThemeRegistry>
					<Container maxWidth='xl'>{children}</Container>
				</ThemeRegistry>
			</body>
		</html>
	);
}
