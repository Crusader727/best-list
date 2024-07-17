import React from "react";
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/Main";
import styled, { createGlobalStyle } from "styled-components";
import { Layout } from "antd";
import { NavigationPage } from "./pages/Navigation";
const { Header, Content, Footer } = Layout;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
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
            <Layout style={{ height: "100vh" }}>
                <Header style={{ display: "flex", alignItems: "center" }}>
                    <StyledLogo className="demo-logo">logo</StyledLogo>
                    <StyledLink to="/">Main</StyledLink>
                    <StyledLink to="/navigation">Navigation</StyledLink>
                </Header>
                <Content style={{ padding: "0 48px" }}>
                    <Routes>
                        <Route path="/navigation" element={<NavigationPage />} />
                        <Route path="*" element={<MainPage />} />
                    </Routes>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Best List ©{new Date().getFullYear()} Created by Crusader727
                </Footer>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
