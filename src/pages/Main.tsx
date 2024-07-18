import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Breadcrumb, Button } from "antd";
import styled from "styled-components";
import { FolderModal } from "../components/FolderModal";
import { useFolder } from "../hooks/useStorage";
import { ItemModal } from "../components/ItemModal";
import { ItemCard } from "../components/ItemCard";
import { ReactComponent as FolderLogo } from "../icons/folder.svg";
import { FloatingActions } from "../components/FloatingActions";

const StyledFolderLogo = styled(FolderLogo)`
    width: 120px;
    height: 120px;
`;

const StyledFolder = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-bottom: 20px;
    margin-right: 20px;

    @media (max-width: 700px) {
        margin-right: 0;
    }
`;

const StyledFoldersContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media (max-width: 700px) {
        justify-content: space-between;
    }
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

    const { store, currentFolder, handleAddFolder, handleAddItem, handleDeleteItem } = useFolder(currentPath);

    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);

    const breadcrumbs = ["/", ...location.pathname.split("/").filter((a) => !!a)];

    if (!currentFolder) {
        return <div>Smth went wrong, folder is empty</div>;
    }

    return (
        <>
            <Breadcrumb style={{ margin: "16px 0" }}>
                {breadcrumbs.map((id, i, arr) => (
                    <Breadcrumb.Item key={id}>
                        <Link to={`..${arr.slice(0, i + 1).join("/")}`} relative="route">
                            {i === 0 ? "root" : store.folders[id]?.name}
                        </Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            <StyledFoldersContainer>
                {currentFolder.childFolders.map((folderId: string) => (
                    <Link to={`..${location.pathname}/${folderId}`} relative="route" key={folderId}>
                        <StyledFolder>
                            <StyledFolderLogo />
                            {store.folders[folderId]?.name}
                        </StyledFolder>
                    </Link>
                ))}
            </StyledFoldersContainer>
            <StyledItemsContainer>
                {currentFolder?.items &&
                    Object.values(currentFolder.items).map((item) => (
                        <ItemCard
                            item={item}
                            handleAddItem={handleAddItem}
                            handleDeleteItem={handleDeleteItem}
                            key={item.id}
                        />
                    ))}
            </StyledItemsContainer>

            <FolderModal
                isOpen={isFolderModalOpen}
                handleClose={() => {
                    setIsFolderModalOpen(false);
                }}
                handleOk={handleAddFolder}
            />
            {isItemModalOpen && (
                <ItemModal
                    isOpen={isItemModalOpen}
                    handleClose={() => {
                        setIsItemModalOpen(false);
                    }}
                    handleOk={handleAddItem}
                />
            )}
            <FloatingActions>
                <Button type="link" onClick={() => setIsFolderModalOpen(true)}>
                    Add Folder
                </Button>
                {breadcrumbs.length > 1 && (
                    <Button type="link" onClick={() => setIsItemModalOpen(true)}>
                        Add Item
                    </Button>
                )}
            </FloatingActions>
        </>
    );
};
