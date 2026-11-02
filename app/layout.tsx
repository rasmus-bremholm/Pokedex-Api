import type { Metadata } from "next";
import { Geist, Geist_Mono, Silkscreen } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Selector from "@/components/Selector";

const silkScreen = Silkscreen({
	variable: "--font-silkscreen",
	subsets: ["latin"],
	weight: ["400", "700"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Pokedex",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang='en' className={`${silkScreen.variable} ${geistMono.variable} h-full antialiased`}>
			<body className='min-h-full grid grid-cols-1 grid-rows-[78px_auto_482px] bg-background'>
				<Navbar />
				{children}
				<Selector />
			</body>
		</html>
	);
}
