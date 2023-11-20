import styled from "styled-components";
import { Font12, Font14 } from "../../../common-componnets/typography";
import { ReactComponent as ArrowRight } from "../../../assets/arrowRight.svg";
import { useNavigate } from "react-router-dom";
import useFetchUserInfomation from "../../../hooks/useFetchUserInformation";
import { ReactComponent as ArrowLeft } from "../../../assets/arrowLeft.svg";
import { colors } from "../../../common-componnets/color";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config";

const Header = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const Item = styled.div`
  display: flex;
  padding: 16px 20px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
  border: none;
  height: 44px;
  cursor: pointer;
  background: rgba(255, 59, 48, 0.1);
  padding: 12px 20px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  margin: 20px 20px 0px 20px;
`;

const AccountInfoEdit = () => {
  const navigate = useNavigate();
  const userData = useFetchUserInfomation();

  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("..");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      {userData && (
        <>
          <Header>
            <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
            <Font14 bold color={colors.gray1}>
              会員情報編集
            </Font14>
            <BlankSpace></BlankSpace>
          </Header>
          <Item onClick={() => navigate(`profile`)}>
            <Font12 color={colors.black} bold>
              プロフィール編集
            </Font12>
            <ArrowRight color={colors.gray3} />
          </Item>
          <Item onClick={() => navigate(`mail`)}>
            <Font12 color={colors.black} bold>
              メールアドレス
            </Font12>
            <ArrowRight color={colors.gray3} />
          </Item>
          <Item onClick={() => navigate(`resetPassword`)}>
            <Font12 color={colors.black} bold>
              パスワード再設定
            </Font12>
            <ArrowRight color={colors.gray3} />
          </Item>
          <Item onClick={() => navigate(`delete`)}>
            <Font12 color={colors.black} bold>
              アカウント削除
            </Font12>
            <ArrowRight color={colors.gray3} />
          </Item>
          <ButtonWrapper>
            <DeleteButton onClick={() => logout()}>
              <Font12 bold color={colors.error}>
                ログアウト
              </Font12>
            </DeleteButton>
          </ButtonWrapper>
        </>
      )}
    </>
  );
};

export default AccountInfoEdit;
