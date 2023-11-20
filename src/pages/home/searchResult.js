import styled from "styled-components";
import { Font10, Font12, Font14 } from "../../common-componnets/typography";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { caluculateLastLoginHourTime } from "../../util/date";
import { colors } from "../../common-componnets/color";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { fetchUserInfoByPostId } from "../../util/fetchUserInfoByPostId";
import { useEffect, useState } from "react";
import useFetchUserInfomation from "../../hooks/useFetchUserInformation";
import useFetchUser from "../../hooks/useFetchUser";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import { ReactComponent as Search } from "../../assets/search.svg";

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  position: fixed;
  top: 0;
  width: calc(100% - 40px);
  background: ${colors.white};
`;

const StyledForm = styled.form`
  flex-grow: 1;
  margin-left: 8px;
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
  border: none;
  background-color: transparent;
  color: ${colors.black};
  font-size: 12px;
  width: 100%;
  margin-left: 8px;
`;

const CancelButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin-left: 12px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 77px 20px;
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

const PostPrice = styled(Font14)`
  margin-bottom: 12px;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
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

export const SearchResult = () => {
  const { searchText } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const posts = location.state.posts;
  const [isSearchMode, setIsSearchMode] = useState(false);
  const userInfo = useFetchUserInfomation();
  const user = useFetchUser();
  const [searchInputText, setSearchInputText] = useState("");

  const onSubmitSearchInput = async (e, text) => {
    e.preventDefault();
    console.log("hii");
    const result = await getDocs(collection(db, "Post"));
    const data = await Promise.all(
      result.docs.map(async (v) => {
        const userInfo = await fetchUserInfoByPostId(v.data().user_id);
        return {
          id: v.id,
          userInfo: userInfo,
          ...v.data(),
        };
      })
    );
    const postFilterdByTitle = data.filter((v) => {
      return v.title.includes(searchInputText || text);
    });
    const postFilterdByCategory = data.filter((v) => {
      return v.category?.includes(searchInputText || text);
    });
    console.log(searchInputText, postFilterdByTitle, postFilterdByCategory);
    if (searchInputText) {
      if (userInfo.searchedText?.length === 0 || !userInfo?.searchedText) {
        setDoc(
          doc(db, "User", user.uid),
          {
            searchedText: [searchInputText || text],
          },
          { merge: true }
        );
      }
      setDoc(
        doc(db, "User", user.uid),
        {
          searchedText: [...userInfo.searchedText, searchInputText || text],
        },
        { merge: true }
      );
    }
    if (searchInputText || text) {
      navigate(`../search/searchText=/${searchInputText || text}`, {
        state: {
          posts:
            !searchInputText && !text
              ? [...postFilterdByCategory, ...postFilterdByTitle]
              : data,
        },
      });
    } else {
      navigate(`../search/searchText=/ALL`, {
        state: {
          posts: data,
        },
      });
    }
    setIsSearchMode(false);
  };

  const deleteSearchedText = async (text) => {
    console.log("delete", text);
    setDoc(
      doc(db, "User", user.uid),
      {
        searchedText: userInfo.searchedText.filter((v) => v !== text),
      },
      { merge: true }
    );
  };
  console.log(location);
  return (
    <>
      <Header>
        <ArrowLeft onClick={() => navigate(-1)} color={colors.gray1} />
        <StyledForm onSubmit={(e) => onSubmitSearchInput(e)}>
          <InputWrapper>
            <Search color={colors.black} />
            <StyledInput
              type="text"
              placeholder={searchText}
              value={searchInputText}
              onChange={(e) => setSearchInputText(e.target.value)}
              onFocus={() => setIsSearchMode(true)}
              // onBlur={() =>  setIsSearchMode(false)}
            />
          </InputWrapper>
        </StyledForm>
        {isSearchMode && (
          <CancelButton onClick={() => setIsSearchMode(false)}>
            <Font12 color={colors.gray1}>キャンセル</Font12>
          </CancelButton>
        )}
      </Header>
      <PostList>
        {posts.map((v, i) => {
          return (
            <div key={i}>
              <PostItem onClick={() => navigate(`../post/${v.id}`)}>
                <ImgWrapper src={v.img ?? ""} />
                <ContentWrapper>
                  <TagWrapper>
                    {v.category && (
                      <Tag>
                        <Font10>{v.category.join(",")}</Font10>
                      </Tag>
                    )}
                  </TagWrapper>
                  <Font14 bold color={colors.black}>
                    {v.title}
                  </Font14>
                  <PostPrice bold color={colors.black}>
                    ￥{v.price}
                  </PostPrice>
                  {/* vのユーザーidと同じidのドキュメントをUserコレクションから取ってくる。 */}
                  <UserWrapper>
                    <UserIcon src={v.userInfo.userPhotoUrl} />
                    <Font10>{v.userInfo.userName}</Font10>
                    <Font10 color={colors.gray1}>|</Font10>
                    <Font10>
                      {caluculateLastLoginHourTime(v.userInfo.lastLoginDate)}
                      時間前
                    </Font10>
                  </UserWrapper>
                </ContentWrapper>
              </PostItem>
              <Border />
            </div>
          );
        })}
        {/* <PostMoreButton onClick={() => getMoreItems()}>
          <Font12 color={colors.main}>新着の投稿をもっと見る</Font12>
        </PostMoreButton> */}
      </PostList>
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
    </>
  );
};
