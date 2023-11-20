import useFetchUser from "../../hooks/useFetchUser";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import styled from "styled-components";
import { Button } from "../../common-componnets/button";
import { Font10, Font12, Font14 } from "../../common-componnets/typography";
import { colors } from "../../common-componnets/color";
import { useEffect, useState } from "react";
import {
  db,
  addDoc,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "../../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import { caluculateLastLoginHourTime, transformedTime } from "../../util/date";
import { orderBy } from "firebase/firestore";

const ChatWrapper = styled.div``;

const Header = styled.div`
  position: fixed;
  top: 0px;
  background: white;

  display: flex;
  padding: 12px 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray3};
  position: fixed;
  width: calc(100% - 40px);
  background: ${colors.white};
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;
const MessagesWrapper = styled.div`
  padding: 65px 20px 20px 20px;
`;

const ScrollContent = styled.div``;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DateWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  background: ${colors.white};
  border-radius: 90px;
  border: 0.5px solid ${colors.main};
`;

const PostItem = styled.div`
  display: flex;
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
  margin-top: 16px;
`;

const UserIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: cover;
  border-radius: 90px;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
`;

const MessageItem = styled.div`
  display: flex;
  align-items: flex-end;
  ${(p) => (p.isMyMessage ? `margin-left:auto` : `margin-right:auto`)};
`;

const Message = styled.div`
  ${(p) => (p.isMyMessage ? `margin-left:6px` : `margin-right:6px`)};
  padding: 8px 12px;
  border-radius: ${(p) =>
    p.isMyMessage ? `8px 1px 8px 8px` : `1px 8px 8px 8px;`};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.isMyMessage ? colors.main : colors.gray)};
`;

const StyledForm = styled.form`
  position: fixed;
  bottom: 0px;
  width: 100%;
`;

const ItemField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  gap: 8px;
  border-top: 0.5px solid ${colors.gray2};
  background: ${colors.white};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  border-radius: 8px;
  padding: 8px 12px;
  align-items: center;
  background: ${colors.gray};
  opacity: 40%;
`;

const StyledTextarea = styled.textarea`
  outline: none;
  border: none;
  background-color: transparent;
  color: ${colors.black};
  font-size: 12px;
  width: 100%;
  height: 17px;

  &::placeholder {
    color: ${colors.gray3};
  }
`;

const Chat = () => {
  const user = useFetchUser();
  const { userId, postId } = useParams();
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [post, setPost] = useState();
  const [userProf, setUserProf] = useState();
  console.log(userId, postId);

  const postMessage = () => {
    if (post.user_id === user.uid) {
      //chat相手のidが欲しい。
      const requestUser = messages.find((v) => {
        return v.user_id !== user.uid;
      });
      addDoc(
        collection(
          db,
          "Post",
          postId,
          "ChatRoom",
          requestUser.user_id,
          "Messages"
        ),
        {
          timestamp: new Date(),
          text: inputMessage,
          user_id: userId,
        }
      );
    } else {
      addDoc(collection(db, "Post", postId, "ChatRoom", user.uid, "Messages"), {
        timestamp: new Date(),
        text: inputMessage,
        user_id: user.uid,
      });
    }
    setInputMessage("");
    fetchData();
  };
  const fetchData = async () => {
    const docRef = collection(
      db,
      "Post",
      postId,
      "ChatRoom",
      user.uid,
      "Messages"
    );
    const q = query(docRef, orderBy("timestamp", "asc"));
    getDocs(q).then((r) => {
      const messages = r.docs.map((v) => {
        return {
          ...v.data(),
          timestamp: new Date(v.data().timestamp.seconds * 1000),
        };
      });
      setMessages(messages);
    });
    const postDocRef = doc(db, "Post", postId);
    const postData = (await getDoc(postDocRef)).data();
    const userProfRef = doc(db, "User", postData.user_id);
    const userProfData = (await getDoc(userProfRef)).data();
    setPost(postData);
    setUserProf(userProfData);
  };
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  console.log(messages, Boolean(inputMessage), post, userProf, user);
  return (
    <>
      {!user || !post || !userProf ? (
        <></>
      ) : (
        <ChatWrapper>
          <Header>
            <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
            <Font14 color={colors.gray1}>{userProf.userName}さん</Font14>
            <BlankSpace></BlankSpace>
          </Header>
          <MessagesWrapper>
            <ScrollContent>
              <PostWrapper>
                {/* <Font12 color={colors.gray1}>
                  以下の投稿に対して問い合わせがありました
                </Font12> */}
                {/* <DateWrapper></DateWrapper> */}
                <PostItem>
                  <ImgWrapper src={post.img ?? ""} />
                  <ContentWrapper>
                    <TagWrapper>
                      {post.category &&
                        post.category.map((categoryName, i) => {
                          return (
                            <Tag key={i}>
                              <Font10>{categoryName}</Font10>
                            </Tag>
                          );
                        })}
                    </TagWrapper>
                    <Font14 bold color={colors.black}>
                      {" "}
                      {post.title}
                    </Font14>
                    <PostPrice bold color={colors.black}>
                      ￥{post.price}
                    </PostPrice>
                    {/* vのユーザーidと同じidのドキュメントをUserコレクションから取ってくる。 */}
                    <UserWrapper>
                      <UserIcon src={userProf.userPhotoUrl} />
                      <Font10>{userProf.userName}</Font10>
                      <Font10>
                        {caluculateLastLoginHourTime(userProf.lastLoginDate)}
                        時間前
                      </Font10>
                    </UserWrapper>
                  </ContentWrapper>
                </PostItem>
              </PostWrapper>
              <MessageList>
                {messages.map((v) => {
                  return v.user_id === user.uid ? (
                    <MessageItem isMyMessage={true}>
                      <Font10 color={colors.gray1}>
                        {transformedTime(v.timestamp)}
                      </Font10>
                      <Message isMyMessage={true}>
                        <Font12 color={colors.white}>{v.text}</Font12>
                      </Message>
                    </MessageItem>
                  ) : (
                    <MessageItem>
                      <UserIcon src={userProf.userPhotoUrl} />
                      <Message>
                        <Font12 color={colors.black}>{v.text}</Font12>
                      </Message>
                      <Font10 color={colors.gray1}>|</Font10>
                      <Font10 color={colors.gray1}>
                        {transformedTime(v.timestamp)}
                      </Font10>
                    </MessageItem>
                  );
                })}
              </MessageList>
            </ScrollContent>
          </MessagesWrapper>

          <StyledForm
            //  action="/my-handling-form-page"
            //  method="post"
            onSubmit={(event) => event.preventDefault()}
          >
            <ItemField>
              <InputWrapper>
                <StyledTextarea
                  placeholder={`${userProf.userName}さんへのメッセージ`}
                  type="text"
                  onChange={(e) => setInputMessage(e.target.value)}
                >
                  {inputMessage}
                </StyledTextarea>
              </InputWrapper>
              <Button
                disabled={!inputMessage}
                width="56px"
                onClick={() => postMessage()}
                style={!inputMessage ? { opacity: 0.4 } : {}}
              >
                <Font12 color={colors.white}>送信</Font12>
              </Button>
            </ItemField>
          </StyledForm>
        </ChatWrapper>
      )}
    </>
  );
};

export default Chat;
