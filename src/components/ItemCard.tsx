import { Button, Card } from "antd";
import styled from "styled-components";
import { Item } from "../types/store";
import { useState } from "react";
import { ItemModal } from "./ItemModal";

const { Meta } = Card;

const StyledCard = styled(Card)`
    margin-top: 20px;
    margin-right: 20px;
    width: 300px;
    height: 100%;

    @media (max-width: 700px) {
        width: 100%;
    }
`;

const StyledCardImage = styled.img`
    height: 180px;
    object-fit: contain;
`;

interface ItemCardProps {
    item: Item;
    handleAddItem: (i: Item) => void;
    handleDeleteItem: (i: Item) => void;
}

export const ItemCard = ({ item, handleAddItem, handleDeleteItem }: ItemCardProps) => {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);

    const { imageURL, description, name } = item;

    return (
        <StyledCard
            cover={imageURL && <StyledCardImage alt="No Image" src={imageURL} />}
            actions={[
                <Button type="link" onClick={() => setIsItemModalOpen(true)}>
                    Edit
                </Button>,
                <Button type="link" onClick={() => handleDeleteItem(item)}>
                    Delete
                </Button>,
            ]}
        >
            <Meta title={name} description={description} />
            {isItemModalOpen && (
                <ItemModal
                    isOpen={isItemModalOpen}
                    handleClose={() => {
                        setIsItemModalOpen(false);
                    }}
                    initialValues={item}
                    handleOk={handleAddItem}
                />
            )}
        </StyledCard>
    );
};
