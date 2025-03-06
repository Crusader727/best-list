
import Home from "./pages/Home";

import { ThemeProvider, createGlobalStyle, styled } from "styled-components";



const theme = {
  colors: {
    background: "#FFF",
    text: "#121212",
    primary: "#3B82F6",
    secondary: "#03DAC5",
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }
  #root {
    width: 100%;
    min-height: 100%;
    padding-bottom: 80px;
  }
  input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}
`;

const App = () => {



  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
};

export default App;