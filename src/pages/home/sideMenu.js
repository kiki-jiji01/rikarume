import styled from "styled-components";
import { colors } from "../../common-componnets/color";
import { Font10, Font12 } from "../../common-componnets/typography";
import { Button, ModalButton } from "../../common-componnets/button";
import { ReactComponent as ArrowTop } from "../../assets/arrowTop.svg";
import { ReactComponent as ArrowBottom } from "../../assets/arrowBottom.svg";
import { useNavigate } from "react-router-dom";
import useFetchUser from "../../hooks/useFetchUser";
import { useState } from "react";
import { useFetchCategory } from "../../hooks/useFetchCategory";

const SideMenuWrapper = styled.div`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  background: ${colors.white};
`;

const Title = styled.div`
  padding: 8px 12px;
  border-top: 0.5px solid ${colors.gray2};
  border-bottom: 0.5px solid ${colors.gray2};
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const ButtonWrrapper = styled.div`
  display: flex;
  padding: 12px;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;

const Item = styled.div`
  display: flex;
  padding: 12px;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const CategoryItem = styled.div`
  display: flex;
  padding: 12px;
  gap: 8px;
  align-items: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const IconCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
  border: 0.5px solid ${colors.gray2};
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.white};
  border-radius: 90px;
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 12px 0px;
  border: 1px solid ${colors.main};
`;

export const SideMenu = ({ onClick }) => {
  const user = useFetchUser();
  const navigate = useNavigate();
  const [showPulldownName, setShowPulldownName] = useState("");
  const categories = useFetchCategory();

  return (
    <SideMenuWrapper onClick={onClick}>
      {!user && (
        <>
          <Title>
            <Font10 bold color={colors.gray1}>
              アカウント
            </Font10>
          </Title>
          <ButtonWrrapper>
            <Button onClick={() => navigate("/login")}>
              <Font12 color={colors.white}>新規登録</Font12>
            </Button>
            <LoginButton onClick={() => navigate("/login")}>
              <Font12 color={colors.main}>ログイン</Font12>
            </LoginButton>
          </ButtonWrrapper>
        </>
      )}
      <Title>
        <Font10 bold color={colors.gray1}>
          投稿
        </Font10>
      </Title>
      <Item>
        <Font12 bold color={colors.black}>
          検索
        </Font12>
        {showPulldownName === "category" ? (
          <ArrowTop
            color={colors.gray3}
            onClick={() => setShowPulldownName("")}
          />
        ) : (
          <ArrowBottom
            color={colors.gray3}
            onClick={() => setShowPulldownName("category")}
          />
        )}
      </Item>
      {showPulldownName === "category" &&
        categories.map((v) => {
          return (
            <CategoryItem
              onClick={() =>
                navigate("/", { state: { pageNameState: v.name } })
              }
            >
              <IconCircle>{v.img}</IconCircle>
              <Font12 bold color={colors.black}>
                {v.name}
              </Font12>
            </CategoryItem>
          );
        })}
      <Item
        onClick={() => {
          if (user) {
            navigate(`/register`);
          } else {
            navigate(`/login`);
          }
        }}
      >
        <Font12 bold color={colors.black}>
          投稿
        </Font12>
      </Item>
      <Item>
        <Font12 bold color={colors.black}>
          問い合わせ
        </Font12>
      </Item>
      <Item
        onClick={() => {
          if (user) {
            navigate(`/mypage`);
          } else {
            navigate(`/login`);
          }
        }}
      >
        <Font12 bold color={colors.black}>
          マイページ
        </Font12>
      </Item>
      <Title>
        <Font10 bold color={colors.gray1}>
          その他
        </Font10>
      </Title>
      <Item
        onClick={() =>
          window.open(
            "https://puzzled-hemisphere-6c6.notion.site/516f51b0f5ad487294eb624310ec8afe",
            "_blank"
          )
        }
      >
        <Font12 bold color={colors.black}>
          リカルメについて
        </Font12>
      </Item>
      <Item>
        <Font12 bold color={colors.black}>
          その他
        </Font12>
        {showPulldownName === "other" ? (
          <ArrowTop
            color={colors.gray3}
            onClick={() => setShowPulldownName("")}
          />
        ) : (
          <ArrowBottom
            color={colors.gray3}
            onClick={() => setShowPulldownName("other")}
          />
        )}
      </Item>
      {showPulldownName === "other" && (
        <>
          <Item
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSclyZnfywVOVdsHA7TDlIqoezfULACkEqoSyk6ArQld72CJuA/viewform",
                "_blank"
              )
            }
          >
            <Font12 bold color={colors.gray1}>
              運営チームに問い合わせ
            </Font12>
          </Item>
          <Item onClick={() => navigate("/login/terms-of-service")}>
            <Font12 bold color={colors.gray1}>
              利用規約
            </Font12>
          </Item>
          <Item onClick={() => navigate("/login/privacy-policy")}>
            <Font12 bold color={colors.gray1}>
              プライバシーポリシー
            </Font12>
          </Item>
        </>
      )}
    </SideMenuWrapper>
  );
};
