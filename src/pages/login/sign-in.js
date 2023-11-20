import styled from "styled-components";
import { Button } from "../../common-componnets/button";
import Header from "./header";
import { Font10, Font12 } from "../../common-componnets/typography";
import { colors } from "../../common-componnets/color";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { app, db, doc, setDoc } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// const FirstLoginSetUp = styled.div`
// height:100vh;
// margin:20px;
// `;

const LoginWrapper = styled.div`
  height: 100vh;
  margin: 20px;
`;

const StyledForm = styled.form``;

const StyledLabel = styled.label`
  display: flex;
`;

const MailAdressField = styled.div`
  margin-bottom: 24px;
`;

const PasswordField = styled.div`
  margin-bottom: 32px;
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
  color: #bbb;
  font-size: 12px;
  width: 100%;
  outline: none;

  color: ${colors.black};

  &::placeholder {
    color: ${colors.gray3};
  }
`;

const PasswordButton = styled.button`
border: none;
background-color: transparent;
width:24px;
z-
`;

const PasswordForgotWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigate = useNavigate();

  console.log(user);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setDoc(
          doc(db, "User", user.uid),
          {
            lastLoginDate: user.metadata.lastSignInTime,
          },
          { merge: true }
        );
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  console.log(email, password);
  return (
    <>
      <LoginWrapper>
        <StyledForm
          //  action="/my-handling-form-page"
          //  method="post"
          onSubmit={(event) => event.preventDefault()}
        >
          <MailAdressField>
            <StyledLabel>
              <Font12 color={colors.black} bold="true">
                メールアドレス
              </Font12>
              <Font10 color={colors.main}>(必須)</Font10>
            </StyledLabel>
            <InputWrapper>
              <StyledInput
                type="email"
                id="mail"
                placeholder="メールアドレスを入力してください"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWrapper>
          </MailAdressField>
          <PasswordField>
            <StyledLabel>
              <Font12 color={colors.black} bold="true">
                パスワード
              </Font12>
              <Font10 color={colors.main}>(必須)</Font10>
            </StyledLabel>
            <InputWrapper>
              <StyledInput
                type="password"
                id="password"
                placeholder="パスワードを入力してください"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordButton>
                <Font12 color={colors.main}>表示</Font12>
              </PasswordButton>
            </InputWrapper>
            <PasswordForgotWrapper onClick={() => navigate("")}>
              <Font10>🥲 パスワードを忘れてしまった</Font10>
            </PasswordForgotWrapper>
          </PasswordField>
          <Button onClick={() => login()}>
            <Font12 color={colors.white}>ログイン</Font12>
          </Button>
        </StyledForm>
      </LoginWrapper>
    </>
  );
};

export default SignIn;
