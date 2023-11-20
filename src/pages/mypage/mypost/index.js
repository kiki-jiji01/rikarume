import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import useFetchUser from "../../../hooks/useFetchUser";
import { useEffect, useState } from "react";
import { caluculateLastLoginHourTime } from "../../../util/date";
import { ReactComponent as Elipsis } from "../../../assets/ellipsis.svg";
import styled from "styled-components";
import { db } from "../../../firebase-config";
import {
  Font10,
  Font12,
  Font13,
  Font14,
  Font16,
  Font17,
} from "../../../common-componnets/typography";
import { Modal } from "../../../common-componnets/modal";
import { colors } from "../../../common-componnets/color";
import { ModalButton } from "../../../common-componnets/button";
import { useNavigate } from "react-router-dom";

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

const BogttomWrapper = styled.div`
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledElipsis = styled(Elipsis)`
  width: 12px;
  height: 12px;
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
  align-items: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const DeleteModalInner = styled.div`
  position: fixed;
  background: ${colors.white};
  border-radius: 14px;
  width: 270px;
  top: 40%;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 19px 0px;
  align-items: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;
const ButtonWrapper = styled.div`
  display: flex;
`;

const MyPost = () => {
  const navigate = useNavigate();
  const user = useFetchUser();
  const [data, setData] = useState([]);
  const [showModalName, setShowModalName] = useState("");
  const [postId, setPostId] = useState("");

  const fetchMyPostData = () => {
    const q = query(collection(db, "Post"), where("user_id", "==", user.uid));
    getDocs(q).then((r) => {
      setData(
        r.docs.map((v) => {
          return {
            id: v.id,
            ...v.data(),
          };
        })
      );
    });
  };

  const deletePost = () => {
    deleteDoc(doc(db, "Post", postId)).then((v) => setShowModalName(""));
  };

  useEffect(() => {
    if (user) {
      fetchMyPostData();
    }
  }, [user]);

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
                            <Font10 color={colors.gray1}>{categoryName}</Font10>
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
                  <BogttomWrapper>
                    <LeftWrapper>
                      <Font10 color={colors.gray1}>
                        {v.likedNumber ?? 0} いいね |{" "}
                        {caluculateLastLoginHourTime(v.postDate)}時間前
                      </Font10>
                    </LeftWrapper>
                    <StyledElipsis
                      color={colors.gray1}
                      onClick={() => {
                        setShowModalName("menu");
                        setPostId(v.id);
                      }}
                    />
                  </BogttomWrapper>
                </ContentWrapper>
              </PostItem>
            );
          })}
        </MyPostWrapper>
      )}
      {showModalName === "menu" && (
        <Modal onClick={() => setShowModalName("")}>
          <ModalInner onClick={(e) => e.stopPropagation()}>
            <Item onClick={() => navigate(`edit/${postId}`)}>
              <Font12 bold color={colors.black}>
                編集する
              </Font12>
            </Item>
            <Item>
              <Font12 bold color={colors.black}>
                非表示にする
              </Font12>
            </Item>
            <Item onClick={() => setShowModalName("delete")}>
              <Font12 bold color={colors.error}>
                投稿を削除する
              </Font12>
            </Item>
          </ModalInner>
        </Modal>
      )}
      {showModalName === "delete" && (
        <Modal>
          <DeleteModalInner>
            <TextWrapper>
              <Font17 bold color={colors.systemBlack}>
                確認
              </Font17>
              <Font13 color={colors.systemBlack}>
                本当にこの投稿を削除しますか？
              </Font13>
            </TextWrapper>
            <ButtonWrapper>
              <ModalButton onClick={() => setShowModalName("")}>
                <Font14 color={colors.blue}>キャンセル</Font14>
              </ModalButton>
              <ModalButton onClick={() => deletePost()}>
                <Font14 color={colors.error}>削除</Font14>
              </ModalButton>
            </ButtonWrapper>
          </DeleteModalInner>
        </Modal>
      )}
    </>
  );
};

export default MyPost;
