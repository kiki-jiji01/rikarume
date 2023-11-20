import styled from "styled-components";
import { colors } from "./color";
import { Font12 } from "./typography";

const Wrapper = styled.div`
  display: flex;
`;

const Button = styled.button`
  flex-grow: 1;
  padding: 12px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: ${(p) => (p.isFocused ? `2px` : `0.5px`)} solid
    ${(p) => (p.isFocused ? colors.main : colors.gray2)};
  color: ${(p) => (p.isFocused ? colors.main : colors.gray1)};
  height: 44px;
  cursor: pointer;
  background: ${colors.white};
`;

export const Tab = ({
  leftText,
  rightText,
  onClickLeft,
  onClickRight,
  isFocusedLeft,
  isFocusedRight,
}) => {
  return (
    <Wrapper>
      <Button onClick={() => onClickLeft()} isFocused={isFocusedLeft}>
        <Font12 color={isFocusedLeft ? colors.main : colors.gray1}>
          {leftText}
        </Font12>
      </Button>
      <Button onClick={() => onClickRight()} isFocused={isFocusedRight}>
        <Font12 color={isFocusedRight ? colors.main : colors.gray1}>
          {rightText}
        </Font12>
      </Button>
    </Wrapper>
  );
};
