import { useNavigate, useParams } from "react-router-dom";
import useFetchUserInfomation from "../../../../hooks/useFetchUserInformation";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase-config";
import styled from "styled-components";
import { useState } from "react";
import {
  Font10,
  Font12,
  Font13,
  Font14,
  Font17,
} from "../../../../common-componnets/typography";
import { colors } from "../../../../common-componnets/color";
import { Button } from "../../../../common-componnets/button";
import { ReactComponent as ArrowLeft } from "../../../../assets/arrowLeft.svg";
import { Modal } from "../../../../common-componnets/modal";
import { sendPasswordResetEmail } from "firebase/auth";
import { ReactComponent as Caution } from "../../../../assets/caution.svg";

const ResetPasswordInputWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  padding: 12px 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray3};
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const StyledForm = styled.form`
  padding: 12px 20px;
`;

const StyledLabel = styled.label`
  display: flex;
`;

const Field = styled.div`
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
  border: none;
  background-color: transparent;
  font-size: 12px;
  width: 100%;

  color: ${colors.black};

  &::placeholder {
    color: ${colors.gray3};
  }
`;

const ErrorMessageWrapper = styled.div`
  display: flex;
  padding: 2px 4px;
  align-items: center;
  gap: 4px;
  border-radius: 2px;
  background: rgba(255, 59, 48, 0.2);
  margin-top: 8px;
  margin-bottom: 10px;
`;

const ResetPasswordInput = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isValidatePassward, setIsValidatePassword] = useState(true);
  const [isValidatePasswardForChecking, setIsValidatePasswordForChecking] =
    useState(true);
  const userData = useFetchUserInfomation();
  const [password, setPassword] = useState("");
  const [passwordForChecking, setPasswordForChecking] = useState("");

  const postNewPassword = () => {
    if (!password) {
      setIsValidatePassword(false);
    }
    if (!passwordForChecking) {
      setIsValidatePasswordForChecking(false);
    }
    // const q = query(
    //   collection(db, "User"),
    //   where("mailaddress", "==", mailAdress)
    // );
    // getDocs(q)
    //   .then(() => {
    //     sendPasswordResetEmail(auth, mailAdress).then(() =>
    //       setShowingModalName("success")
    //     );
    //   })
    //   .catch(() => setShowingModalName("fail"));
  };
  return (
    <>
      {!userData ? (
        <></>
      ) : (
        <ResetPasswordInputWrapper>
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
            <Field>
              <StyledLabel>
                <Font12 bold="true">新しいパスワード</Font12>
              </StyledLabel>
              {!isValidatePassward && (
                <ErrorMessageWrapper>
                  <Caution />
                  <Font10 color={colors.error}>
                    新しいパスワードを入力してください
                  </Font10>
                </ErrorMessageWrapper>
              )}
              <InputWrapper>
                <StyledInput
                  type="text"
                  placeholder={"新しいパスワードを入力してください"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputWrapper>
            </Field>
            <Field>
              <StyledLabel>
                <Font12 bold="true">新しいパスワード</Font12>
              </StyledLabel>
              {!isValidatePasswardForChecking && (
                <ErrorMessageWrapper>
                  <Caution />
                  <Font10 color={colors.error}>
                    新しいパスワードを入力してください
                  </Font10>
                </ErrorMessageWrapper>
              )}
              <InputWrapper>
                <StyledInput
                  type="text"
                  placeholder={"新しいパスワードを入力してください"}
                  value={passwordForChecking}
                  onChange={(e) => setPasswordForChecking(e.target.value)}
                />
              </InputWrapper>
            </Field>
            <Button onClick={() => postNewPassword()}>
              <Font12 color={colors.white}>設定する</Font12>
            </Button>
          </StyledForm>
        </ResetPasswordInputWrapper>
      )}
    </>
  );
};

export default ResetPasswordInput;
