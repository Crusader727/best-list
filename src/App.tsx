import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/Main";
import styled, { createGlobalStyle } from "styled-components";
import { Layout } from "antd";
import { NavigationPage } from "./pages/Navigation";
const { Header, Content, Footer } = Layout;

const StyledLayout = styled(Layout)`
    height: 100%;
    min-height: 100vh;
`;

const StyledContent = styled(Content)`
    height: 100%;
    padding: 0 40px;
    @media (max-width: 700px) {
        padding: 0 20px;
        padding-bottom: 60px;
    }
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

const StyledLogo = styled.div`
    color: white;
    margin-right: 20px;
`;

const StyledLink = styled(Link)`
    margin-left: 20px;
    color: #1677ff;
`;

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <StyledLayout>
                <Header style={{ display: "flex", alignItems: "center" }}>
                    <StyledLogo className="demo-logo">logo</StyledLogo>
                    <StyledLink to="/">Main</StyledLink>
                    <StyledLink to="/navigation">Navigation</StyledLink>
                </Header>
                <StyledContent>
                    <Routes>
                        <Route path="/navigation" element={<NavigationPage />} />
                        <Route path="*" element={<MainPage />} />
                    </Routes>
                </StyledContent>
                <Footer style={{ textAlign: "center" }}>
                    Best List ©{new Date().getFullYear()} Created by Crusader727
                </Footer>
            </StyledLayout>
        </BrowserRouter>
    );
}

export default App;
