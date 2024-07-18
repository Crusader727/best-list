import { Link, useLocation } from "react-router-dom";
import _ from "lodash";
import { useState } from "react";
import { Breadcrumb, Button } from "antd";
import styled from "styled-components";
import { FolderModal } from "../components/FolderModal";
import { useFolder } from "../hooks/useStorage";
import { ItemModal } from "../components/ItemModal";
import { ItemCard } from "../components/ItemCard";

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`;

const StyledFolder = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 8px;
    background-color: #1677ff;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-top: 20px;
    margin-right: 20px;
`;

const StyledFolderButton = styled(Button)`
    margin-right: 12px;
`;

const StyledFoldersContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;
const StyledItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const MainPage = () => {
    const location = useLocation();

    const currentPath =
        location.pathname
            .split("/")
            .filter((a) => !!a)
            .join(".") || "";

    const { store, currentFolder, handleAddFolder, handleAddItem } = useFolder(currentPath);

    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);

    const breadcrumbs = ["/", ...location.pathname.split("/").filter((a) => !!a)];

    if (!currentFolder) {
        return <div>Smth went wrong, folder is empty</div>;
    }

    console.log(store, currentFolder);

    return (
        <>
            <Breadcrumb style={{ margin: "16px 0" }}>
                {breadcrumbs.map((name, i, arr) => (
                    <Breadcrumb.Item key={name}>
                        <Link to={`..${arr.slice(0, i + 1).join("/")}`} relative="route">
                            {i === 0 ? "main" : name}
                        </Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            <ButtonsContainer>
                <StyledFolderButton type="primary" onClick={() => setIsFolderModalOpen(true)}>
                    Folder
                </StyledFolderButton>
                {breadcrumbs.length > 1 && (
                    <Button type="primary" onClick={() => setIsItemModalOpen(true)}>
                        Item
                    </Button>
                )}
            </ButtonsContainer>
            <StyledFoldersContainer>
                {currentFolder.childFolders.map((folderId: string) => (
                    <Link to={`..${location.pathname}/${folderId}`} relative="route" key={folderId}>
                        <StyledFolder>{store.folders[folderId]?.name}</StyledFolder>
                    </Link>
                ))}
            </StyledFoldersContainer>
            <StyledItemsContainer>
                {currentFolder?.items && Object.values(currentFolder.items).map((item) => <ItemCard {...item} />)}
            </StyledItemsContainer>

            <FolderModal
                isOpen={isFolderModalOpen}
                handleClose={() => {
                    setIsFolderModalOpen(false);
                }}
                handleOk={handleAddFolder}
            />
            <ItemModal
                isOpen={isItemModalOpen}
                handleClose={() => {
                    setIsItemModalOpen(false);
                }}
                handleOk={handleAddItem}
            />
        </>
    );
};
