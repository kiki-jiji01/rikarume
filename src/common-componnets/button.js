import styled from "styled-components";
import { colors } from "./color";

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(p) => (p.type === "primary" ? colors.main : colors.gray)};
  border-radius: 90px;
  width: ${(p) => (typeof p.width === "string" ? p.width : `${p.width}px`)};
  border: none;
  padding: 12px 0px;
  cursor: pointer;
`;

const ModalButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.white};
  border-radius: 14px;
  width: ${(p) => (typeof p.width === "string" ? p.width : `${p.width}px`)};
  border: none;
  cursor: pointer;
  padding: 16px 0px;
  border: ${(p) => (p.borderColor ? `1px solid ${p.borderColor}` : "none")};
`;

export const Button = ({
  children,
  type = "primary",
  width = "100%",
  onClick,
  style,
  disabled,
}) => {
  return (
    <ButtonWrapper
      disabled={disabled}
      type={type}
      width={width}
      onClick={onClick}
      style={style}
    >
      {children}
    </ButtonWrapper>
  );
};

export const ModalButton = ({
  children,
  width = "100%",
  onClick,
  borderColor,
}) => {
  return (
    <ModalButtonWrapper
      width={width}
      onClick={onClick}
      borderColor={borderColor}
    >
      {children}
    </ModalButtonWrapper>
  );
};
