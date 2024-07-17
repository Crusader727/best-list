import { Link, useLocation } from "react-router-dom";
import _ from "lodash";
import { useState } from "react";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import styled from "styled-components";
import { FolderModal } from "../components/FolderModal";
import { Folder, Item } from "../types/store";
import { useFolder } from "../hooks/useStorage";
const { Header, Content, Footer } = Layout;

const StyledLogo = styled.div`
    color: white;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`;

const StyledFolder = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 12px;
    background-color: #1677ff;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`;

export const MainPage = () => {
    const location = useLocation();

    const currentPath =
        location.pathname
            .split("/")
            .filter((a) => !!a)
            .join(".") || "";

    const { currentFolder, handleAddFolder } = useFolder(currentPath);

    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);

    const breadcrumbs = ["/", ...location.pathname.split("/").filter((a) => !!a)];

    if (!currentFolder) {
        return <div>Smth went wrong, folder is empty</div>;
    }

    return (
        <Layout style={{ height: "100vh" }}>
            <Header style={{ display: "flex", alignItems: "center" }}>
                <StyledLogo className="demo-logo">logo</StyledLogo>
            </Header>
            <Content style={{ padding: "0 48px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    {breadcrumbs.map((name, i, arr) => (
                        <Breadcrumb.Item>
                            <Link to={`..${arr.slice(0, i + 1).join("/")}`} relative="route">
                                {i === 0 ? "main" : name}
                            </Link>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
                <ButtonsContainer>
                    <Button type="primary" onClick={() => setIsFolderModalOpen(true)}>
                        Folder
                    </Button>
                    <Button type="primary" onClick={() => setIsItemModalOpen(true)}>
                        Item
                    </Button>
                </ButtonsContainer>

                {currentFolder.childFolders.map((folderName: string) => (
                    <Link to={`..${location.pathname}/${folderName}`} relative="route">
                        <StyledFolder>{folderName}</StyledFolder>
                    </Link>
                ))}
            </Content>

            <FolderModal
                isOpen={isFolderModalOpen}
                handleClose={() => {
                    setIsFolderModalOpen(false);
                }}
                handleOk={handleAddFolder}
            />

            <Footer style={{ textAlign: "center" }}>
                Best List ©{new Date().getFullYear()} Created by Crusader727
            </Footer>
        </Layout>
    );
};
