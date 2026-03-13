"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
	return (
		<AppRouterCacheProvider>
			<ThemeWrapper>{children}</ThemeWrapper>
		</AppRouterCacheProvider>
	);
}
