import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainPage } from "./pages/Main";
import styled, { createGlobalStyle } from "styled-components";
import { Layout } from "antd";
import { NavigationPage } from "./pages/Navigation";
import { HeaderComonent } from "./components/Header";
const { Content, Footer } = Layout;

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
    background-color: white;
  }
`;

function App() {
    return (
        <BrowserRouter basename="best-list">
            <GlobalStyle />
            <StyledLayout>
                <HeaderComonent />
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
