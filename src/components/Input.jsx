import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 400px;
  position: relative;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.backgroundSecondary || "#222"};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: 0.3s ease;

  &:focus-within {
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.5);
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  color: ${(props) => props.theme.colors.text || "#fff"};
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.placeholder || "#aaa"};
  }
`;

const IconWrapper = styled.span`
  position: absolute;
  right: 12px;
  color: ${(props) => props.theme.colors.icon || "#aaa"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = ({ placeholder, icon, className, ...props }) => {
  return (
    <InputWrapper className={className}>
      <StyledInput placeholder={placeholder} {...props} />
      {icon && <IconWrapper>{icon}</IconWrapper>}
    </InputWrapper>
  );
};

export default Input;