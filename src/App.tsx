import React from "react";
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/Main";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="*" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
