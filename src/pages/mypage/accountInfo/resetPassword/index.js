import { useNavigate, useParams } from "react-router-dom";
import useFetchUserInfomation from "../../../../hooks/useFetchUserInformation";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../../firebase-config";
import styled from "styled-components";
import { useState } from "react";
import {
  Font12,
  Font13,
  Font14,
  Font17,
} from "../../../../common-componnets/typography";
import { colors } from "../../../../common-componnets/color";
import { Button, ModalButton } from "../../../../common-componnets/button";
import { ReactComponent as ArrowLeft } from "../../../../assets/arrowLeft.svg";
import { Modal } from "../../../../common-componnets/modal";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPasswordWrapper = styled.div``;

const Header = styled.div`
  align-items: center;
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray1};
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const StyledForm = styled.form`
  padding: 20px;
`;

const StyledLabel = styled.label`
  display: flex;
  padding-bottom: 8px;
`;

const MailField = styled.div`
  margin-bottom: 24px;
`;

const InputWrapper = styled.label`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  border: 0.5px solid var(--, #efefef);
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  color: ${colors.black};
  font-size: 12px;
  width: 100%;

  &::placeholder {
    color: ${colors.gray3};
  }
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
  padding: 19px 20px;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const ResetPassword = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userData = useFetchUserInfomation();
  const [mailAdress, setMailAdress] = useState("");
  const [showingModalName, setShowingModalName] = useState("");
  const checkMailisValided = () => {
    const q = query(
      collection(db, "User"),
      where("mailaddress", "==", mailAdress)
    );
    getDocs(q)
      .then(() => {
        sendPasswordResetEmail(auth, mailAdress).then(() =>
          setShowingModalName("success")
        );
      })
      .catch(() => setShowingModalName("fail"));
  };
  return (
    <>
      {!userData ? (
        <></>
      ) : (
        <ResetPasswordWrapper>
          <Header>
            <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
            <Font14 bold color={colors.gray1}>
              パスワード再設定
            </Font14>
            <BlankSpace></BlankSpace>
          </Header>
          <StyledForm
            //  action="/my-handling-form-page"
            //  method="post"
            onSubmit={(event) => event.preventDefault()}
          >
            <MailField>
              <StyledLabel>
                <Font12 color={colors.black} bold="true">
                  登録したメールアドレス
                </Font12>
              </StyledLabel>
              <InputWrapper>
                <StyledInput
                  type="text"
                  placeholder={"登録したメールアドレスを入力してください"}
                  value={mailAdress}
                  onChange={(e) => setMailAdress(e.target.value)}
                />
              </InputWrapper>
            </MailField>
            <Button onClick={() => checkMailisValided()}>
              <Font12 color={colors.white}>送信する</Font12>
            </Button>
          </StyledForm>
        </ResetPasswordWrapper>
      )}
      {showingModalName === "success" && (
        <Modal>
          <ModalInner>
            <TextWrapper>
              <Font13 color={colors.systemBlack}>
                入力頂いたメールアドレスにメールを送信しました
              </Font13>
            </TextWrapper>
            <ModalButton
              onClick={() => {
                navigate("/");
              }}
            >
              <Font17 color={colors.blue}>OK</Font17>
            </ModalButton>
          </ModalInner>
        </Modal>
      )}
    </>
  );
};

export default ResetPassword;
