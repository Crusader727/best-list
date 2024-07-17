import { Link, useLocation } from "react-router-dom";
import _ from "lodash";
import { useState } from "react";
import { Breadcrumb, Button, Card } from "antd";
import styled from "styled-components";
import { FolderModal } from "../components/FolderModal";
import { useFolder } from "../hooks/useStorage";
import { ItemModal } from "../components/ItemModal";

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

const StyledCard = styled(Card)`
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

    const { currentFolder, handleAddFolder, handleAddItem } = useFolder(currentPath);

    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);

    const breadcrumbs = ["/", ...location.pathname.split("/").filter((a) => !!a)];

    if (!currentFolder) {
        return <div>Smth went wrong, folder is empty</div>;
    }

    return (
        <>
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
                {currentFolder.childFolders.map((folderName: string) => (
                    <Link to={`..${location.pathname}/${folderName}`} relative="route">
                        <StyledFolder>{folderName}</StyledFolder>
                    </Link>
                ))}
            </StyledFoldersContainer>
            <StyledItemsContainer>
                {currentFolder.items?.map((item) => (
                    <StyledCard title={item.name} extra={<Button type="link">Edit</Button>} style={{ width: 300 }}>
                        <p>{item.description || "Empty"}</p>
                    </StyledCard>
                ))}
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
