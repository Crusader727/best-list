import { Button, Layout, notification, Popconfirm } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getStorage, setRawStorage, setStorage } from "../utils/storage";
const { Header } = Layout;

const StyledHeader = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 700px) {
        padding: 0 4px;
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

const StyledExportButton = styled(Button)`
    background: none;
    color: white;
    margin-right: 8px;
`;
const StyledButton = styled(Button)`
    background: none;
    color: white;
`;

export const HeaderComonent = () => {
    const [api, contextHolder] = notification.useNotification();

    const navigate = useNavigate();

    const handleExport = () => {
        navigator.clipboard.writeText(JSON.stringify(getStorage()));
        api.success({
            message: `Successfully copied to clipboard`,
        });
    };

    const handleImport = () => {
        navigator.clipboard.readText().then((impValue) => {
            setRawStorage(impValue);

            api.success({
                message: `Successfully imported`,
            });
            navigate(0);
        });
    };

    return (
        <StyledHeader>
            {contextHolder}
            <div style={{ display: "flex", alignItems: "center" }}>
                <StyledLink to="/">
                    <StyledLogo className="demo-logo">logo</StyledLogo>
                </StyledLink>
                <StyledLink to="/navigation">Navigation</StyledLink>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <StyledExportButton type="dashed" onClick={handleExport}>
                    export
                </StyledExportButton>
                <Popconfirm
                    title="Are you sure?"
                    onConfirm={handleImport}
                    onCancel={() => {}}
                    okText="yes"
                    cancelText="no"
                >
                    <StyledButton type="dashed">import</StyledButton>
                </Popconfirm>
            </div>
        </StyledHeader>
    );
};
