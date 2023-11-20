import styled from "styled-components";
import { Font10, Font14, Font16 } from "../../common-componnets/typography";
import { useNavigate } from "react-router-dom";
import { caluculateLastLoginHourTime } from "../../util/date";
import { colors } from "../../common-componnets/color";

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 13.5px 20px;
`;

const NoResultWrapper = styled.div`
  padding: 63px 0px;
  text-align: center;
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
  border-radius: 4px;
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

export const CategoryPgae = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <PostList>
      {posts.length === 0 && (
        <NoResultWrapper>
          <Font16 bold color={colors.gray3}>
            新着の投稿はありません
          </Font16>
        </NoResultWrapper>
      )}
      {posts.map((v, i) => {
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
    </PostList>
  );
};
