import { Button, Card } from "antd";
import styled from "styled-components";
import { Item } from "../types/store";

const { Meta } = Card;

const StyledCard = styled(Card)`
    margin-top: 20px;
    margin-right: 20px;
    width: 300px;
    height: 100%;
`;

const StyledCardImage = styled.img`
    height: 180px;
    object-fit: contain;
`;

export const ItemCard = ({ name, description, imageURL }: Item) => {
    return (
        <StyledCard
            cover={imageURL && <StyledCardImage alt="No Image" src={imageURL} />}
            actions={[<Button type="link">Edit</Button>]}
        >
            <Meta title={name} description={description} />
        </StyledCard>
    );
};
