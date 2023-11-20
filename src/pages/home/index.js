import styled from "styled-components";
import { Footer } from "./footer";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import {
  Font10,
  Font12,
  Font14,
  Font18,
} from "../../common-componnets/typography";
import { useEffect, useState } from "react";
import React from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import useFetchUser from "../../hooks/useFetchUser";
import { caluculateLastLoginHourTime } from "../../util/date";
import { useFetchCategory } from "../../hooks/useFetchCategory";
import { colors } from "../../common-componnets/color";
import { CategoryPgae } from "./categoryPage";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { ReactComponent as ArrowBottom } from "../../assets/arrowBottom.svg";
import { ReactComponent as ArrowTop } from "../../assets/arrowTop.svg";
import { ReactComponent as CheckMark } from "../../assets/checkMark.svg";
import Banner from "../../assets/banner.png";

import { Modal } from "../../common-componnets/modal";
import { SideMenu } from "./sideMenu";
import { fetchUserInfoByPostId } from "../../util/fetchUserInfoByPostId";
import useFetchUserInfomation from "../../hooks/useFetchUserInformation";
import { SearchResult } from "./searchResult";

const TopWrapper = styled.div`
  position: relative;
`;

const Header = styled.div`
  position: fixed;
  top: 0px;
  background: white;
  border-bottom: 0.5px solid ${colors.gray3};
`;

const AboveWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px 0px 20px;
`;

const StyledForm = styled.form`
  flex-grow: 1;
  margin-right: 12px;
`;

const InputWrapper = styled.label`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  border: 0.5px solid ${colors.gray};
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const StyledInput = styled.input`
  outline: none;
  margin-left: 8px;
  border: none;
  background-color: transparent;
  color: ${colors.gray3};
  font-size: 12px;
  width: 100%;
  outline: none;
  font-weight: 600;

  &::placeholder {
    color: ${colors.gray3};
  }
`;

const CancelButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
`;

const BottomWrapper = styled.div`
  display: flex;
  gap: 16px;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-x: auto;
  align-items: center;
  padding: 0px 0px 0px 20px;
`;

const ArrowBottomWrap = styled.div`
  position: fixed;
  top: 52px;
  right: -3px;
  background: ${colors.white};
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

const StyledArrowBottom = styled(ArrowBottom)``;

const Button = styled.button`
  flex-shrink: 0;
  padding: 12px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  background: ${colors.white};
  color: ${(p) => (p.focused ? colors.main : colors.gray1)};
  border-bottom: ${(p) => p.focused && `2px solid ${colors.main}`};
`;

const ScrollWrapper = styled.div`
  padding-top: 95px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 20px;
`;

const BannerImg = styled.img`
  marin-bottom: 32px;
  padding: 0 20px;
`;

const CategoryWrapper = styled.div``;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px 8px 20px;
`;

const CategoryList = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0px 20px;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryListItem = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  height: 80px;
  width: 80px;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px 4px 0px 0px;
  border: 0.5px solid ${colors.gray2};
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const CategoryName = styled.div`
  display: flex;
  padding: 8px 0px;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 4px 4px;
  border-right: 0.5px solid ${colors.gray2};
  border-bottom: 0.5px solid ${colors.gray2};
  border-left: 0.5px solid ${colors.gray2};
`;

const PostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  gap: 8px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 98px;
  gap: 12px;
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

const PostPrice = styled(Font14)``;

const UserWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const UserIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: cover;
  border-radius: 90px;
`;

const Border = styled.div`
  height: 0.5px;
  background: #ddd;
  margin: 16px 0px 16px 0px;
`;

const PostMoreButton = styled.button`
  margin: 0 auto 32px auto;
  display: flex;
  padding: 10px 20px;
  align-items: center;
  border-radius: 90px;
  border: 0.5px solid ${colors.gray};
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const FootterWrapper = styled.div`
  background: var(--40, rgba(239, 239, 239, 0.4));
  padding: 32px 20px 20px 20px;
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

const ModalInner = styled.div`
  position: fixed;
  max-height: 40%;
  bottom: 0px;
  padding: 12px 0px;
  background: ${colors.white};
  width: 100%;
  overflow-y: auto;
  border-radius: 12px 12px 0px 0px;
`;

const Item = styled.div`
  display: flex;
  background: ${colors.white};
  padding: 16px 16px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const SearchModeModalInner = styled.div`
  position: absolute;
  top: 53px;
  padding: 0px 20px;
  background: ${colors.white};
  height: 100vh;
  overflow-y: auto;
  width: calc(100% - 40px);
`;

const SearchModeItem = styled.div`
  display: flex;
  background: ${colors.white};
  padding: 16px 0px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
`;

export const Home = () => {
  const pageNameState = useLocation();
  console.log(pageNameState.state);
  const [length, setLength] = useState(3);
  const [data, setData] = useState([]);
  const [showModalName, setShowModalName] = useState("");
  const [searchInputText, setSearchInputText] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [pageName, setPageName] = useState(
    pageNameState?.state?.pageNameState
      ? pageNameState?.state?.pageNameState
      : "ホーム"
  );
  const [showFotterName, setShowFotterName] = useState("");
  const navigate = useNavigate();
  const user = useFetchUser();
  const categoriesWithoutHome = useFetchCategory();
  const categories = [
    ...categoriesWithoutHome.slice(0, 0),
    { name: "ホーム" },
    ...categoriesWithoutHome.slice(0),
  ];
  const userInfo = useFetchUserInfomation();
  const fetchData = async () => {
    const result = await getDocs(collection(db, "Post"));
    const newData = await Promise.all(
      result.docs.map(async (v) => {
        const userInfo = await fetchUserInfoByPostId(v.data().user_id);
        return {
          id: v.id,
          userInfo: userInfo,
          ...v.data(),
        };
      })
    );
    setData(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitSearchInput = async (e, text) => {
    e.preventDefault();
    //title,categoryから一文字でも当てはまった投稿データを取得。
    const postFilterdByTitle = data.filter((v) => {
      return v.title.includes(searchInputText || text);
    });
    const postFilterdByCategory = data.filter((v) => {
      return v.category?.includes(searchInputText || text);
    });
    console.log(searchInputText);
    if (searchInputText) {
      if (userInfo.searchedText.length === 0 || !userInfo.searchedText) {
        setDoc(
          doc(db, "User", user.uid),
          {
            searchedText: [searchInputText],
          },
          { merge: true }
        );
      }
      setDoc(
        doc(db, "User", user.uid),
        {
          searchedText: [...userInfo?.searchedText, searchInputText],
        },
        { merge: true }
      );
    }
    navigate(`search/searchText=/${searchInputText || text}`, {
      state: { posts: [...postFilterdByCategory, ...postFilterdByTitle] },
    });
  };

  const deleteSearchedText = async (text) => {
    setDoc(
      doc(db, "User", user.uid),
      {
        searchedText: userInfo.searchedText.filter((v) => v !== text),
      },
      { merge: true }
    );
  };

  const getMoreItems = () => {
    setLength(length + 3);
  };

  const postsFilteredByCategory = data.filter((v) => {
    return v.category?.includes(pageName);
  });

  const onFocus = () => {
    if (!user) {
      navigate("login");
    }
    setIsSearchMode(true);
  };

  console.log(data, user, length);
  return (
    <>
      {!data || !categories ? (
        <></>
      ) : (
        <TopWrapper>
          <Header>
            <AboveWrapper>
              <StyledForm onSubmit={(e) => onSubmitSearchInput(e)}>
                <InputWrapper>
                  <Search color={colors.gray1} />
                  <StyledInput
                    type="text"
                    placeholder="キーワードから探しませんか？"
                    value={searchInputText}
                    onChange={(e) => setSearchInputText(e.target.value)}
                    onFocus={() => onFocus()}
                    // onBlur={() =>  setIsSearchMode(false)}
                  />
                </InputWrapper>
              </StyledForm>
              {isSearchMode ? (
                <CancelButton onClick={() => setIsSearchMode(false)}>
                  <Font12 color={colors.gray1}>キャンセル</Font12>
                </CancelButton>
              ) : (
                <>
                  <Menu
                    color={colors.gray1}
                    onClick={() => setShowModalName("sideMenu")}
                  />
                </>
              )}
            </AboveWrapper>
            <BottomWrapper>
              {categories.map((v) => {
                return (
                  <Button
                    onClick={() => {
                      if (v.name === "ホーム") {
                        navigate("");
                      }
                      setPageName(`${v.name}`);
                    }}
                    focused={pageName === v.name}
                  >
                    <Font12 color={pageName === v.name && colors.main}>
                      {v.name}
                    </Font12>
                  </Button>
                );
              })}
              <ArrowBottomWrap>
                <StyledArrowBottom
                  onClick={() => setShowModalName("category")}
                  color={colors.gray1}
                />
              </ArrowBottomWrap>
            </BottomWrapper>
          </Header>
          <ScrollWrapper>
            {pageName === "ホーム" ? (
              <MainWrapper>
                <BannerImg
                  src={Banner}
                  onClick={() =>
                    window.open(
                      "https://puzzled-hemisphere-6c6.notion.site/516f51b0f5ad487294eb624310ec8afe",
                      "_blank"
                    )
                  }
                />
                <CategoryWrapper>
                  <Title>
                    <Font18 bold color={colors.black}>
                      🗂️ カテゴリー
                    </Font18>
                  </Title>
                  <CategoryList>
                    {categories
                      .filter((v) => v.name !== "ホーム")
                      .map((v) => {
                        return (
                          <CategoryListItem onClick={() => setPageName(v.name)}>
                            <IconWrapper>{v.img}</IconWrapper>
                            <CategoryName>
                              <Font10 bold color={colors.black}>
                                {v.name}
                              </Font10>
                            </CategoryName>
                          </CategoryListItem>
                        );
                      })}
                  </CategoryList>
                </CategoryWrapper>
                <PostListWrapper>
                  <Font18 bold color={colors.black}>
                    🆕 新着
                  </Font18>
                  <PostList>
                    {data.slice(0, length).map((v, i) => {
                      return (
                        <div key={i}>
                          <PostItem onClick={() => navigate(`post/${v.id}`)}>
                            <ImgWrapper src={v.img ?? ""} />
                            <ContentWrapper>
                              <TagWrapper>
                                {v.category && (
                                  <Tag>
                                    <Font10>{v.category.join(",")}</Font10>
                                  </Tag>
                                )}
                              </TagWrapper>
                              <Font14 color={colors.black} bold>
                                {v.title}
                              </Font14>
                              <PostPrice color={colors.black} bold>
                                ￥{v.price}
                              </PostPrice>
                              {/* vのユーザーidと同じidのドキュメントをUserコレクションから取ってくる。 */}
                              <UserWrapper>
                                <UserIcon src={v.userInfo?.userPhotoUrl} />
                                <Font10 color={colors.gray1}>
                                  {v.userInfo?.userName}
                                </Font10>
                                <Font10 color={colors.gray1}>|</Font10>
                                <Font10>
                                  {caluculateLastLoginHourTime(
                                    v.userInfo?.lastLoginDate
                                  )}
                                  時間前
                                </Font10>
                              </UserWrapper>
                            </ContentWrapper>
                          </PostItem>
                          <Border />
                        </div>
                      );
                    })}
                    {length < data.length && (
                      <PostMoreButton onClick={() => getMoreItems()}>
                        <Font12 color={colors.main}>
                          新着の投稿をもっと見る
                        </Font12>
                      </PostMoreButton>
                    )}
                  </PostList>
                </PostListWrapper>
              </MainWrapper>
            ) : (
              <CategoryPgae posts={postsFilteredByCategory} />
            )}
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
                        <FotterItem onClick={() => setPageName(v.name)}>
                          <Font12 bold color={colors.gray1}>
                            {v.name}
                          </Font12>
                        </FotterItem>
                      );
                    })}
                <FotterItem
                  onClick={() => {
                    if (user) {
                      navigate(`register`);
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
                      navigate(`mypage`);
                    } else {
                      navigate(`login`);
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
          </ScrollWrapper>
          {showModalName === "sideMenu" && (
            <Modal onClick={() => setShowModalName("")}>
              <SideMenu onClick={(e) => e.stopPropagation()} />
            </Modal>
          )}
          {showModalName === "category" && (
            <Modal onClick={() => setShowModalName("")}>
              <ModalInner onClick={(e) => e.stopPropagation()}>
                {categories.map((v) => {
                  return (
                    <Item onClick={() => setPageName(v.name)}>
                      <Font12
                        bold
                        color={pageName === v.name ? colors.main : colors.black}
                      >
                        {v.name}
                      </Font12>
                      {pageName === v.name && <CheckMark color={colors.main} />}
                    </Item>
                  );
                })}
              </ModalInner>
            </Modal>
          )}
          {isSearchMode && (
            <SearchModeModalInner>
              {userInfo.searchedText?.length === 0 || !userInfo.searchedText ? (
                <SearchModeItem>
                  <Font12 color={colors.black}>検索履歴はありません</Font12>
                </SearchModeItem>
              ) : (
                userInfo.searchedText.map((text) => {
                  return (
                    <SearchModeItem
                      onClick={(e) => {
                        onSubmitSearchInput(e, text);
                      }}
                    >
                      <Font12 bold color={colors.black}>
                        {text}
                      </Font12>
                      <DeleteButton onClick={() => deleteSearchedText(text)}>
                        <Font12 color={colors.error}>削除</Font12>
                      </DeleteButton>
                    </SearchModeItem>
                  );
                })
              )}
            </SearchModeModalInner>
          )}
        </TopWrapper>
      )}
    </>
  );
};
