import { Link, Outlet, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import styled from "styled-components";
import { colors } from "../../common-componnets/color";
import { Font10, Font14, Font16 } from "../../common-componnets/typography";
import { Tab } from "../../common-componnets/tab";
import SignUp from "./sign-up";
import SignIn from "./sign-in";
import { useState } from "react";

const Header = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const InfomationWrapper = styled.div`
  display: flex;
  padding: 16px 20px;
  align-items: center;
  gap: 8px;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const TextWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 8px 12px;
  background: ${colors.gray};

  &::before {
    z-index: -3;
    content: "";
    position: absolute;
    top: 50%;
    left: -16px;
    margin-top: -9px;
    border: 8px solid transparent;
    border-right: 23px solid ${colors.gray};
  }
`;

//認証状態はサインアップしたら無期限に続く（たぶん。）なのでログインページは永続期間が切れた時のみ意味をなす。
//https://firebase.google.com/docs/auth/web/auth-state-persistence?hl=ja
const Login = () => {
  const navigate = useNavigate();
  const [showingPageName, setShowinfPageName] = useState("signUp");
  return (
    <>
      <Header>
        <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
        <Font14 bold color={colors.gray1}>
          新規登録またはログイン
        </Font14>
        <BlankSpace></BlankSpace>
      </Header>
      <InfomationWrapper>
        <CircleWrapper>
          <Font10 color={colors.gray1}>運営</Font10>
        </CircleWrapper>
        <TextWrapper>
          <Font10 color={colors.black}>
            この機能は会員登録したユーザーさん限定の機能です
            よかったら登録して使ってみてね！🌼
          </Font10>
        </TextWrapper>
      </InfomationWrapper>
      <Tab
        leftText={"新規登録"}
        rightText={"ログイン"}
        onClickLeft={() => setShowinfPageName("signUp")}
        onClickRight={() => setShowinfPageName("signIn")}
        isFocusedLeft={showingPageName === "signUp"}
        isFocusedRight={showingPageName === "signIn"}
      />
      {showingPageName === "signUp" && (
        <SignUp setShowinfPageName={setShowinfPageName} />
      )}
      {showingPageName === "signIn" && <SignIn />}
    </>
  );
};

export default Login;
