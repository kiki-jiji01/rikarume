import { deleteUser } from "firebase/auth";
import useFetchUser from "../../../../hooks/useFetchUser";
import { Button, ModalButton } from "../../../../common-componnets/button";
import { useNavigate } from "react-router-dom";
import {
  Font12,
  Font13,
  Font14,
  Font17,
} from "../../../../common-componnets/typography";
import { colors } from "../../../../common-componnets/color";
import { useState } from "react";
import { Modal } from "../../../../common-componnets/modal";
import styled from "styled-components";
import { ReactComponent as ArrowLeft } from "../../../../assets/arrowLeft.svg";

const Header = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray1};
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;
const ContentWrapper = styled.div`
  padding: 20px 20px 0px 20px;
`;

const ModalInner = styled.div`
  position: fixed;
  background: ${colors.white};
  border-radius: 14px;
  width: 270px;
  top: 40%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 19px 0px;
  align-items: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;
const ButtonWrapper = styled.div`
  display: flex;
`;

const DeleteAccount = () => {
  const user = useFetchUser();
  const navigate = useNavigate();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const deleteAccount = () => {
    deleteUser(user)
      .then((r) => {
        // User deleted.
        navigate(`../../../../`);
        console.log(r);
      })
      .then(() => navigate(".."))
      .catch((error) => {
        console.log(error);
        // An error ocurred
        // ...
      });
  };
  return (
    <>
      <Header>
        <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
        <Font14 bold color={colors.gray1}>
          アカウントを削除
        </Font14>
        <BlankSpace></BlankSpace>
      </Header>
      <ContentWrapper>
        <Button onClick={() => setIsModalOpened(true)}>
          <Font12 color={colors.white}>アカウントを削除する</Font12>
        </Button>
        {isModalOpened && (
          <Modal onClick={() => setIsModalOpened(false)}>
            <ModalInner>
              <TextWrapper>
                <Font17 color={colors.systemBlack}>確認</Font17>
                <Font13>本当にアカウントを削除しますか？</Font13>
              </TextWrapper>
              <ButtonWrapper>
                <ModalButton onClick={() => setIsModalOpened(false)}>
                  <Font14 color={colors.blue}>キャンセル</Font14>
                </ModalButton>
                <ModalButton onClick={() => deleteAccount()}>
                  <Font14 color={colors.error}>削除</Font14>
                </ModalButton>
              </ButtonWrapper>
            </ModalInner>
          </Modal>
        )}
      </ContentWrapper>
    </>
  );
};

export default DeleteAccount;
