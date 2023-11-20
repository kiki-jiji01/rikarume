import styled from "styled-components";
import { colors } from "./color";

const CommonStyle = styled.span`
  font-weight: ${(p) => (p.bold ? 600 : 400)};
  line-height: ${(p) => p.lineHeight};
  ${(p) => p.bold && `font-weight: 600;`}
  ${(p) => p.color && `color:${p.color};`}
`;

const Wrapper18 = styled(CommonStyle)`
  font-size: 18px;
`;
const Wrapper17 = styled(CommonStyle)`
  font-size: 17px;
`;

const Wrapper16 = styled(CommonStyle)`
  font-size: 16px;
`;

const Wrapper14 = styled(CommonStyle)`
  font-size: 14px;
`;
const Wrapper13 = styled(CommonStyle)`
  font-size: 13px;
`;

const Wrapper12 = styled(CommonStyle)`
  font-size: 12px;
`;
const Wrapper10 = styled(CommonStyle)`
  font-size: 10px;
`;

export const Font18 = ({
  children,
  lineHeight = "140%",
  bold = false,
  color = colors.gray1,
}) => {
  return (
    <Wrapper18 bold={bold} color={color} lineHeight={lineHeight}>
      {children}
    </Wrapper18>
  );
};

export const Font17 = ({
  children,
  lineHeight = "140%",
  bold = false,
  color = colors.gray1,
}) => {
  return (
    <Wrapper17 bold={bold} color={color} lineHeight={lineHeight}>
      {children}
    </Wrapper17>
  );
};

export const Font16 = ({
  children,
  lineHeight = "140%",
  bold = false,
  color = colors.gray1,
}) => {
  return (
    <Wrapper16 bold={bold} color={color} lineHeight={lineHeight}>
      {children}
    </Wrapper16>
  );
};

export const Font14 = ({
  children,
  lineHeight = "140%",
  bold = false,
  color = colors.gray1,
}) => {
  return (
    <Wrapper14 bold={bold} color={color} lineHeight={lineHeight}>
      {children}
    </Wrapper14>
  );
};

export const Font13 = ({
  children,
  lineHeight = "140%",
  bold = false,
  color = colors.gray1,
}) => {
  return (
    <Wrapper13 bold={bold} color={color} lineHeight={lineHeight}>
      {children}
    </Wrapper13>
  );
};

export const Font12 = ({
  children,
  lineHeight = "140%",
  bold = false,
  color = colors.gray1,
}) => {
  return (
    <Wrapper12 bold={bold} color={color} lineHeight={lineHeight}>
      {children}
    </Wrapper12>
  );
};

export const Font10 = ({
  children,
  lineHeight = "140%",
  bold = false,
  color = colors.gray1,
}) => {
  return (
    <Wrapper10 bold={bold} color={color} lineHeight={lineHeight}>
      {children}
    </Wrapper10>
  );
};
