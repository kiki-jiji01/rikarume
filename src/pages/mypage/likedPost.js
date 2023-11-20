import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { caluculateLastLoginHourTime } from "../../util/date";
import styled from "styled-components";
import { db } from "../../firebase-config";
import { Font10, Font14, Font16 } from "../../common-componnets/typography";
import useFetchUserInfomation from "../../hooks/useFetchUserInformation";
import { colors } from "../../common-componnets/color";

const NoresultWrapper = styled.div`
  padding-top: 465px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MyPostWrapper = styled.div`
  padding: 286px 20px 20px 20px;
`;

const PostItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  flex-grow: 1;
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
  padding-top: 16px;
`;

const UserIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: cover;
  border-radius: 90px;
`;

const LikedPost = () => {
  const userInfo = useFetchUserInfomation();
  const [data, setData] = useState([]);

  const fetchMyPostData = async () =>
    await getDocs(collection(db, "Post")).then((r) => {
      const postData = r.docs.map((v) => {
        return {
          id: v.id,
          ...v.data(),
        };
      });
      const newData = postData.filter((post) => {
        return userInfo?.likedPostIds.includes(post.id);
      });
      setData(newData);
    });

  useEffect(() => {
    fetchMyPostData();
  }, [userInfo]);

  console.log(data, userInfo);
  return (
    <>
      {!data ? (
        <NoresultWrapper>
          <Font16 color={colors.gray3} bold>
            いいねした投稿はまだありません
          </Font16>
        </NoresultWrapper>
      ) : (
        <MyPostWrapper>
          {data.map((v) => {
            return (
              <PostItem onClick={() => {}}>
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
                  <PostPrice bold color={colors.black}>
                    ￥{v.price}
                  </PostPrice>
                  {/* vのユーザーidと同じidのドキュメントをUserコレクションから取ってくる。 */}
                  <UserWrapper>
                    <UserIcon src={v.userPhotoUrl} />
                    <Font10>{v.userName}</Font10>
                    <Font10>
                      {caluculateLastLoginHourTime(v.lastSignInTime)}時間前
                    </Font10>
                  </UserWrapper>
                </ContentWrapper>
              </PostItem>
            );
          })}
        </MyPostWrapper>
      )}
    </>
  );
};

export default LikedPost;
