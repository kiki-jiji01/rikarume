import { useNavigate } from "react-router-dom";
import { Button } from "../../common-componnets/button";
import styled from "styled-components";
import { Font10, Font12, Font14 } from "../../common-componnets/typography";
import useFetchUserInfomation from "../../hooks/useFetchUserInformation";
import useFetchUser from "../../hooks/useFetchUser";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { Tab } from "../../common-componnets/tab";
import { useState } from "react";
import { colors } from "../../common-componnets/color";
import MyPost from "./mypost";
import LikedPost from "./likedPost";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Modal } from "../../common-componnets/modal";
import { SideMenu } from "../home/sideMenu";

const AccountWrapper = styled.div``;

const TopWrapper = styled.div`
  position: fixed;
  top: 0px;
  background: white;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px 12px 20px;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 16px 20px;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const ProfileInner = styled.div`
  display: flex;
  gap: 12px;
`;

const ProfileImg = styled.img`
  width: 44px;
  object-fit: cover;
  height: 44px;
  border-radius: 90px;
`;

const InnerRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const Discription = styled.div`
  position: relative;
  margin-top: 8px;
  width: 143px;
  display: flex;
  padding: 8px 12px;
  flex-direction: column;
  justify-content: center;
  border-radius: 8px;
  background: ${colors.gray};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    margin-top: -23px;
    margin-left: 6px;
    border: 15px solid transparent;
    border-bottom: 15px solid ${colors.gray};
  }
`;

const ButtonWrapper = styled.div`
  margin: 16px 0px 0px 0px;
`;

const MyPage = () => {
  const user = useFetchUser();
  const navigate = useNavigate();
  const userData = useFetchUserInfomation();
  const [showingPageName, setShowinfPageName] = useState("myPost");
  const [showModalName, setShowModalName] = useState("");
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.uid);
    } else {
      navigate("../login");
    }
  });
  return (
    <>
      {user && userData && (
        <AccountWrapper>
          <TopWrapper>
            <Header>
              <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
              <Font14 color={colors.gray1} bold>
                マイページ
              </Font14>
              <Menu
                color={colors.gray1}
                onClick={() => setShowModalName("topMenu")}
              />
            </Header>
            <Profile>
              <ProfileInner>
                <ProfileImg src={userData.userPhotoUrl} />
                <InnerRight>
                  <Font14 color={colors.black} bold>
                    {userData.userName}
                  </Font14>
                  <Font10>{userData.mailaddress}</Font10>
                </InnerRight>
              </ProfileInner>
              <Discription>
                <Font10 color={colors.black}>{userData.discription}</Font10>
              </Discription>
              <ButtonWrapper>
                <Button onClick={() => navigate(`accountInfoEdit/${user.uid}`)}>
                  <Font12 color={colors.white}>会員情報を編集する</Font12>
                </Button>
              </ButtonWrapper>
            </Profile>
            <Tab
              leftText={"あなたの投稿"}
              rightText={"いいねした投稿"}
              onClickLeft={() => setShowinfPageName("myPost")}
              onClickRight={() => setShowinfPageName("likedPost")}
              isFocusedLeft={showingPageName === "myPost"}
              isFocusedRight={showingPageName === "likedPost"}
            />
          </TopWrapper>
          {showModalName === "topMenu" && (
            <Modal onClick={() => setShowModalName("")}>
              <SideMenu onClick={(e) => e.stopPropagation()} />
            </Modal>
          )}
          {showingPageName === "myPost" && <MyPost />}
          {showingPageName === "likedPost" && <LikedPost />}
        </AccountWrapper>
      )}
    </>
  );
};

export default MyPage;
