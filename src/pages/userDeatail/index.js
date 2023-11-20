import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import { ReactComponent as Ellipsis } from "../../assets/ellipsis.svg";
import {
  db,
  collection,
  where,
  getDocs,
  query,
  getDoc,
  doc,
  user,
} from "../../firebase-config";
import styled from "styled-components";
import { Font10, Font14, Font17 } from "../../common-componnets/typography";
import { useEffect, useState } from "react";
import React from "react";
import { caluculateLastLoginHourTime, transformedDate } from "../../util/date";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../common-componnets/color";
import { Modal } from "../../common-componnets/modal";
import { ModalButton } from "../../common-componnets/button";
import useFetchUser from "../../hooks/useFetchUser";

const UserDetailWrapper = styled.div``;

const Header = styled.div`
  position: fixed;
  top: 0px;
  background: white;
  width: calc(100% - 40px);
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const ProfileWrapper = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const Profile = styled.div`
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

const LinkWrapperInner = styled.div`
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

const ScrollWrap = styled.div`
  padding-top: 45px;
`;

const PostList = styled.div`
  margin: 0px 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const PostItem = styled.div`
  display: flex;
  align-items: center;
  height: 98px;
  gap: 12px;
  padding: 16px 0px;
`;

const ImgWrapper = styled.img`
  width: 98px;
  object-fit: cover;
  height: 98px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  padding: 2px 4px;
  align-items: center;
  border-radius: 2px;
  border: 0.5px solid var(--, #efefef);
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const PostPrice = styled.div`
  margin-bottom: 12px;
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

const UserDetail = () => {
  const user = useFetchUser();
  const { userId } = useParams();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const navigate = useNavigate();

  const fetchData = () => {
    getDocs(collection(db, "Post")).then((r) => {
      const newData = r.docs
        .map((v) => {
          return {
            id: v.id,
            ...v.data(),
          };
        })
        .filter((doc) => doc.user_id === userId);
      setData(newData);
    });
    const docRef = doc(db, "User", userId);
    getDoc(docRef).then((r) => {
      setUserData(r.data());
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const report = () => {
    if (!user) {
      navigate(`/login`);
      return;
    }
    navigate(`report`);
  };

  return (
    <>
      {!userData ? (
        <></>
      ) : (
        <UserDetailWrapper>
          <Header>
            <ArrowLeft
              color={colors.gray1}
              onClick={() => navigate(-1)}
            ></ArrowLeft>
            <Ellipsis
              color={colors.gray1}
              onClick={() => setIsModalOpened(true)}
            />
          </Header>
          <ScrollWrap>
            <ProfileWrapper>
              <Profile>
                <ProfileImg src={userData.userPhotoUrl} />
                <LinkWrapperInner>
                  <Font14 bold color={colors.black}>
                    {userData.userName}
                  </Font14>
                  <Font10>
                    最終ログイン履歴：{transformedDate(userData.lastLoginDate)}
                  </Font10>
                </LinkWrapperInner>
              </Profile>
              <Discription>
                <Font10 color={colors.black}>{userData.discription}</Font10>
              </Discription>
            </ProfileWrapper>
            <PostList>
              {data.map((v, i) => {
                return (
                  <div key={i}>
                    <PostItem onClick={() => navigate(`../../../post/${v.id}`)}>
                      <ImgWrapper src={v.img ?? ""} />
                      <ContentWrapper>
                        <TagWrapper>
                          {v.category &&
                            v.category.map((categoryName, i) => {
                              return (
                                <Tag key={i}>
                                  <Font10>{categoryName}</Font10>
                                </Tag>
                              );
                            })}
                        </TagWrapper>
                        <Font14 bold color={colors.black}>
                          {v.title}
                        </Font14>
                        <PostPrice>
                          <Font14 bold color={colors.black}>
                            ￥{v.price}
                          </Font14>
                        </PostPrice>
                        {/* vのユーザーidと同じidのドキュメントをUserコレクションから取ってくる。 */}
                        <Font10 color={colors.gray1}>
                          {v.likedNumber ?? 0}いいね！ |{" "}
                          {caluculateLastLoginHourTime(v.postDate)}時間前
                        </Font10>
                      </ContentWrapper>
                    </PostItem>
                  </div>
                );
              })}
            </PostList>
          </ScrollWrap>

          {isModalOpened && (
            <Modal onClick={() => setIsModalOpened(false)}>
              <ModalInner>
                <ButtonWrapper>
                  <ModalButton onClick={() => report()}>
                    <Font17 color={colors.blue}>
                      このユーザーを運営に報告する
                    </Font17>
                  </ModalButton>
                  <ModalButton onClick={() => setIsModalOpened(false)}>
                    <Font17 color={colors.blue}>キャンセル</Font17>
                  </ModalButton>
                </ButtonWrapper>
              </ModalInner>
            </Modal>
          )}
        </UserDetailWrapper>
      )}
    </>
  );
};

export default UserDetail;
