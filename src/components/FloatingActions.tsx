import { ReactNode } from "react";
import styled from "styled-components";

const SyledContainer = styled.div`
    position: fixed;
    bottom: 120px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #1677ff;
    background-color: white;
    border-radius: 20px;
    padding: 8px 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    width: fit-content;

    @media (max-width: 700px) {
        bottom: 24px;
        width: calc(100% - 40px);
    }
`;

export const FloatingActions = ({ children }: { children: ReactNode }) => {
    return <SyledContainer> {children}</SyledContainer>;
};
