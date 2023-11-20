import styled from "styled-components";
import { Button } from "../../common-componnets/button";
import Header from "./header";
import { Font10, Font12 } from "../../common-componnets/typography";
import { colors } from "../../common-componnets/color";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db, doc, setDoc } from "../../firebase-config";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";
import { ReactComponent as Caution } from "../../assets/caution.svg";
import { ReactComponent as CheckMark } from "../../assets/checkMark.svg";

const SignUpWrapper = styled.div`
  margin: 20px;
`;

const StyledForm = styled.form``;

const StyledLabel = styled.label`
  display: flex;
  cursor: pointer;
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
  width: 40px;
`;

const StyledLink = styled(NavLink)`
  color: ${colors.main};
`;

const StyldButton = styled(Button)`
  margin: 32px 0px;
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

const CheckedWrapper = styled.div`
  display: flex;
  gap: 12px;
  position: relative;
  margin-bottom: 32px;
  align-items: center;
`;

const CheckedInput = styled.input`
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  position: absolute;
`;

const CheckedCircle = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
  background: ${colors.main};
  opacity: ${(p) => (p.isChecked ? "1" : "0.2")};
`;

const StyledText = styled.div`
  display: flex;
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidateMail, setIsValidateMail] = useState(true);
  const [isValidatePassward, setIsValidatePassword] = useState(true);
  const [isValidateChecked, setIsValidateChecked] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const user = auth.currentUser;
  console.log(user);

  const signUpwithEmail = () => {
    console.log("register");
    if (!email) {
      setIsValidateMail(false);
    }
    if (!password) {
      setIsValidatePassword(false);
    }
    if (!isChecked) {
      setIsValidateChecked(false);
    }
    if (!email || !password || !isChecked) {
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setDoc(doc(db, "User", user.uid), {
          mailaddress: user.email,
        })
          .then(() => navigate("/register-profile"))
          .catch((e) => console.log(e));
        console.log(user);
      })
      .catch((error) => {
        //エラーハンドリング
        //1,already in use
        //2,network error
        //3,
      });
  };

  console.log(email, password, isChecked);
  return (
    <>
      <SignUpWrapper>
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
            {!isValidateMail && (
              <ErrorMessageWrapper>
                <Caution />
                <Font10 bold color={colors.error}>
                  メールアドレスを入力してください
                </Font10>
              </ErrorMessageWrapper>
            )}
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
            {!isValidatePassward && (
              <ErrorMessageWrapper>
                <Caution />
                <Font10 bold color={colors.error}>
                  パスワードを入力してください
                </Font10>
              </ErrorMessageWrapper>
            )}
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
          </PasswordField>
          {!isValidateChecked && (
            <ErrorMessageWrapper>
              <Caution />
              <Font10 bold color={colors.error}>
                利用規約とプライバシーポリシーに同意してください
              </Font10>
            </ErrorMessageWrapper>
          )}
          <CheckedWrapper>
            <StyledLabel for="check">
              <CheckedInput
                type="checkbox"
                id="check"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <CheckedCircle isChecked={isChecked}>
                <CheckMark color={colors.white} />
              </CheckedCircle>
            </StyledLabel>
            <StyledText>
              <Font10 color={colors.black} bold>
                <StyledLink to={"terms-of-service"}>利用規約</StyledLink>と
                <StyledLink to={"privacy-policy"}>
                  プライバシーポリシー
                </StyledLink>
                に同意する。
              </Font10>
              <Font10 color={colors.main}>(必須)</Font10>
            </StyledText>
          </CheckedWrapper>
          <StyldButton onClick={() => signUpwithEmail()}>
            <Font12 color={colors.white}>登録する</Font12>
          </StyldButton>
          {/* <Border />
          <GoogleButton onClick={() => SignUpWithGoogle()}>
            <Font12 color={colors.blue}>Googleアカウントで登録</Font12>
          </GoogleButton> */}
        </StyledForm>
      </SignUpWrapper>
    </>
  );
};

export default SignUp;
