import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    pokemonTypes: {
      normal: string;
      fire: string;
      water: string;
      grass: string;
      electric: string;
      ice: string;
      fighting: string;
      poison: string;
      ground: string;
      flying: string;
      psychic: string;
      bug: string;
      rock: string;
      ghost: string;
      dragon: string;
      dark: string;
      steel: string;
      fairy: string;
    };
  }
  interface PaletteOptions {
    pokemonTypes?: Partial<Palette["pokemonTypes"]>;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-geist-sans), Arial, sans-serif",
  },
  palette: {
    background: {
      default: "#1a1a2e",  // main page background
      paper: "#16213e",    // cards, panels, surfaces
    },
    divider: "#2e2e4e",    // borders, separators

    text: {
      primary: "#ffffff",  // active / readable text
      disabled: "#6b6b8a", // inactive / muted text
    },

    primary: {
      main: "#e53935",     // accent — classic Pokedex red
    },

    pokemonTypes: {
      normal:   "#A8A878",
      fire:     "#F08030",
      water:    "#6890F0",
      grass:    "#78C850",
      electric: "#F8D030",
      ice:      "#98D8D8",
      fighting: "#C03028",
      poison:   "#A040A0",
      ground:   "#E0C068",
      flying:   "#A890F0",
      psychic:  "#F85888",
      bug:      "#A8B820",
      rock:     "#B8A038",
      ghost:    "#705898",
      dragon:   "#7038F8",
      dark:     "#705848",
      steel:    "#B8B8D0",
      fairy:    "#EE99AC",
    },
  },
});

export default theme;
