import { Tree, TreeProps } from "antd";
import styled from "styled-components";
import { useFolder } from "../hooks/useStorage";
import { useNavigate } from "react-router-dom";

const StyledTreeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .ant-tree {
        background-color: #f5f5f5;
    }
    .ant-tree-title {
        font-size: 20px;
        color: #1677ff;
    }
`;

//@ts-ignore
const normalizeHierarchy = (hierarchy: Record<string, Object>, path = ""): Array<any> => {
    //@ts-ignore
    return Object.keys(hierarchy).reduce((acc, h) => {
        return [
            ...acc,
            {
                selectable: true,
                title: h,
                key: h,
                path: `${path}/${h}`,
                children: normalizeHierarchy(hierarchy[h] as Record<string, Object>, `${path}/${h}`),
            },
        ];
    }, []);
};

export const NavigationPage = () => {
    const { hierarchy } = useFolder();
    const navigate = useNavigate();

    const data = normalizeHierarchy(hierarchy);

    const onSelect: TreeProps["onSelect"] = (selectedKeys, { node }) => {
        //@ts-ignore
        navigate(node.path);
    };

    return (
        <StyledTreeContainer>
            <Tree onSelect={onSelect} defaultExpandAll treeData={data} />
        </StyledTreeContainer>
    );
};
