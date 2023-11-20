import styled from "styled-components";

const ModalWrapper = styled.div`
position: fixed;
top: 0;
width: 100%;
background:rgba(0, 0, 0, 0.40);
height:100vh;
display: flex;
justify-content: center;
}
`;

export const Modal = ({children,onClick}) => {
    return(
        <ModalWrapper onClick={onClick}>
            {children}
        </ModalWrapper>
    )
}