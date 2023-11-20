import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  db,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "../../firebase-config";
import { Button, ModalButton } from "../../common-componnets/button";
import styled from "styled-components";
import {
  Font10,
  Font12,
  Font14,
  Font16,
  Font17,
} from "../../common-componnets/typography";
import useFetchUser from "../../hooks/useFetchUser";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import { ReactComponent as ArrowRight } from "../../assets/arrowRight.svg";
import { ReactComponent as Heart } from "../../assets/heart.svg";
import { ReactComponent as ColorHeart } from "../../assets/heartColor.svg";

import { ReactComponent as Ellipsis } from "../../assets/ellipsis.svg";
import { colors } from "../../common-componnets/color";
import { Modal } from "../../common-componnets/modal";
import { transformedDate } from "../../util/date";
import { ReactComponent as ArrowBottom } from "../../assets/arrowBottom.svg";
import { ReactComponent as ArrowTop } from "../../assets/arrowTop.svg";
import { useFetchCategory } from "../../hooks/useFetchCategory";

const PostWrapper = styled.div``;

const Header = styled.div`
  position: fixed;
  top: 0px;
  background: white;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px 12px 20px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledArrowLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const StyledHeart = styled(Heart)`
  color: ${(p) => (p.isLiked ? colors.main : colors.gray1)};
  cursor: pointer;
`;

const ScrollWrap = styled.div`
  padding-top: 45px;
`;

const Img = styled.img`
  object-fit: cover;
  height: 375px;
  width: 375px;
`;

const ContentWrapper = styled.div`
  padding: 20px 20px 0px 20px;
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  padding: 2px 4px;
  border-radius: 2px;
  border: 0.5px solid var(--, #efefef);
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const Title = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  margin: 20px 0px 20px 0px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  margin-right: 12px;
  width: 44px;
  object-fit: cover;
  height: 44px;
  border-radius: 90px;
`;

const NameAndDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Discription = styled.div`
  margin-top: 9px;
  position: relative;
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

const PostedDateText = styled.div`
  margin-left: auto;
`;

const ModalInner = styled.div`
  position: fixed;
  bottom: 32px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  padding: 0px 8px 0px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FootterWrapper = styled.div`
  background: var(--40, rgba(239, 239, 239, 0.4));
  padding: 32px 20px 20px 20px;
  margin-top: 32px;
`;

const FotterPost = styled.div`
  margin-bottom: 32px;
`;

const FotterOther = styled.div`
  margin-bottom: 32px;
`;

const FotterTitle = styled.div`
  padding: 0px 8px 8px 0px;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const FotterItem = styled.div`
  display: flex;
  padding: 12px 0px;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const Post = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState();
  const [userData, setUserData] = useState();
  const [userProfile, setUserProfile] = useState();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [showFotterName, setShowFotterName] = useState("");
  const categories = useFetchCategory();

  const navigate = useNavigate();
  const user = useFetchUser();

  const fetchData = async () => {
    const postDocRef = doc(db, "Post", postId);
    const postData = (await getDoc(postDocRef)).data();
    const userProfRef = doc(db, "User", postData.user_id);
    const userProf = (await getDoc(userProfRef)).data();
    setPostData(postData);
    setUserProfile(userProf);
    if (user) {
      console.log("user");
      const userDocRef = doc(db, "User", user.uid);
      const userData = (await getDoc(userDocRef)).data();
      setUserData(userData);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const tags = !postData
    ? []
    : [
        postData.brandName ?? null,
        postData?.category?.join("＞"),
        postData.shippingfeePayer === "pucheser"
          ? "購入者が送料を負担する"
          : postData.shippingfeePayer === "seller"
          ? "出品者が送料を負担する"
          : null,
      ].filter((v) => v !== null);

  const likePost = () => {
    if (!user) {
      navigate(`../login`);
      return;
    }
    if (userData?.likedPostIds) {
      console.log(userData, "hwew");
      setDoc(
        doc(db, "User", user.uid),
        {
          likedPostIds: [...userData.likedPostIds, postId],
        },
        { merge: true }
      );
    } else {
      console.log(userData, "ss");
      setDoc(
        doc(db, "User", user.uid),
        {
          likedPostIds: [postId],
        },
        { merge: true }
      );
    }
  };

  const onClickContactRequest = () => {
    if (user) {
      navigate(`chat/${user.uid}`);
    } else {
      navigate(`../login`);
    }
  };

  const reportPost = () => {
    if (user) {
      navigate(`report`);
    } else {
      navigate(`../login`);
    }
  };
  console.log(userData);
  return (
    <PostWrapper>
      {!postData || !userProfile || !categories ? (
        <></>
      ) : (
        <>
          <Header>
            <StyledArrowLeft
              onClick={() => navigate(-1)}
              color={colors.gray1}
            />
            <HeaderRight>
              {userData?.likedPostIds ? (
                <ColorHeart onClick={() => likePost()} />
              ) : (
                <StyledHeart onClick={() => likePost()} />
              )}

              <Ellipsis
                onClick={() => setIsModalOpened(true)}
                color={colors.gray1}
              />
            </HeaderRight>
          </Header>
          <ScrollWrap>
            <Img src={postData.img} />
            <ContentWrapper>
              <Tags>
                {tags.map((v, i) => {
                  return (
                    <Tag key={i}>
                      <Font10>{v}</Font10>
                    </Tag>
                  );
                })}
              </Tags>
              <Title>
                <Font16 bold color={colors.black}>
                  {postData.title}
                </Font16>
                <Font16
                  bold
                  color={colors.black}
                >{`￥${postData.price}`}</Font16>
              </Title>
              <ProfileWrapper>
                <Profile
                  onClick={() =>
                    navigate(`../../user/detail/${postData.user_id}`)
                  }
                >
                  <ProfileLeftWrapper>
                    <ProfileImg src={userProfile.userPhotoUrl} />
                    <NameAndDateWrapper>
                      <Font14 bold color={colors.black}>
                        {userProfile.userName}
                      </Font14>
                      <Font10 color={colors.gray1}>
                        最終ログイン履歴：
                        {transformedDate(userProfile.lastLoginDate)}
                      </Font10>
                    </NameAndDateWrapper>
                  </ProfileLeftWrapper>
                  <ArrowRight color={colors.gray1} />
                </Profile>
                <Discription>
                  <Font10 lineHeight="160%">{postData.discription}</Font10>
                </Discription>
                <PostedDateText>
                  <Font10 color={colors.gray1}>
                    {transformedDate(Date(postData.postDate))}に投稿されました
                  </Font10>
                </PostedDateText>
              </ProfileWrapper>
              {user?.uid !== postData.user_id && (
                <Button onClick={() => onClickContactRequest()}>
                  <Font12 color={colors.white}>
                    この投稿に対して問い合わせる
                  </Font12>
                </Button>
              )}
            </ContentWrapper>
            <FootterWrapper>
              <FotterPost>
                <FotterTitle>
                  <Font10 bold color={colors.gray1}>
                    投稿
                  </Font10>
                </FotterTitle>
                <FotterItem>
                  <Font12 bold color={colors.black}>
                    検索
                  </Font12>
                  {showFotterName === "category" ? (
                    <ArrowTop
                      color={colors.gray3}
                      onClick={() => setShowFotterName("")}
                    />
                  ) : (
                    <ArrowBottom
                      color={colors.gray3}
                      onClick={() => setShowFotterName("category")}
                    />
                  )}
                </FotterItem>
                {showFotterName === "category" &&
                  categories
                    .filter((v) => v.name !== "ホーム")
                    .map((v) => {
                      return (
                        <FotterItem
                          onClick={() =>
                            navigate("/", { state: { pageNameState: v.name } })
                          }
                        >
                          <Font12 bold color={colors.gray1}>
                            {v.name}
                          </Font12>
                        </FotterItem>
                      );
                    })}
                <FotterItem
                  onClick={() => {
                    if (user) {
                      navigate(`/register`);
                    } else {
                      navigate(`../login`);
                    }
                  }}
                >
                  <Font12 bold color={colors.black}>
                    投稿
                  </Font12>
                </FotterItem>
                <FotterItem>
                  <Font12 bold color={colors.black}>
                    問い合わせ
                  </Font12>
                </FotterItem>
                <FotterItem
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
                </FotterItem>
              </FotterPost>
              <FotterOther>
                <FotterTitle>
                  <Font10 bold color={colors.gray1}>
                    その他
                  </Font10>
                </FotterTitle>
                <FotterItem
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
                </FotterItem>
                <FotterItem>
                  <Font12 bold color={colors.black}>
                    その他
                  </Font12>
                  {showFotterName === "other" ? (
                    <ArrowTop
                      color={colors.gray3}
                      onClick={() => setShowFotterName("")}
                    />
                  ) : (
                    <ArrowBottom
                      color={colors.gray3}
                      onClick={() => setShowFotterName("other")}
                    />
                  )}
                </FotterItem>
                {showFotterName === "other" && (
                  <>
                    <FotterItem
                      onClick={() =>
                        window.open(
                          "https://docs.google.com/forms/d/e/1FAIpQLSclyZnfywVOVdsHA7TDlIqoezfULACkEqoSyk6ArQld72CJuA/viewform",
                          "_blank"
                        )
                      }
                    >
                      <Font10 bold color={colors.gray1}>
                        運営チームに問い合わせ
                      </Font10>
                    </FotterItem>
                    <FotterItem
                      onClick={() => navigate("login/terms-of-service")}
                    >
                      <Font10 bold color={colors.gray1}>
                        利用規約
                      </Font10>
                    </FotterItem>
                    <FotterItem
                      onClick={() => navigate("login/privacy-policy")}
                    >
                      <Font10 bold color={colors.gray1}>
                        プライバシーポリシー
                      </Font10>
                    </FotterItem>
                  </>
                )}
              </FotterOther>
            </FootterWrapper>
          </ScrollWrap>
        </>
      )}
      {isModalOpened && (
        <Modal onClick={() => setIsModalOpened(false)}>
          <ModalInner>
            <ButtonWrapper>
              <ModalButton onClick={() => reportPost()}>
                <Font17 color={colors.blue}>この投稿を運営に報告する</Font17>
              </ModalButton>
              <ModalButton onClick={() => setIsModalOpened(false)}>
                <Font17 color={colors.blue}>キャンセル</Font17>
              </ModalButton>
            </ButtonWrapper>
          </ModalInner>
        </Modal>
      )}
    </PostWrapper>
  );
};

export default Post;
