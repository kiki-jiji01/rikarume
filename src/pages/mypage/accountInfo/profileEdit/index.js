import { useNavigate, useParams } from "react-router-dom";
import useFetchUserInfomation from "../../../../hooks/useFetchUserInformation";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase-config";
import styled from "styled-components";
import { useRef, useState } from "react";
import {
  Font10,
  Font12,
  Font14,
} from "../../../../common-componnets/typography";
import { colors } from "../../../../common-componnets/color";
import { Button } from "../../../../common-componnets/button";
import { ReactComponent as ArrowLeft } from "../../../../assets/arrowLeft.svg";
import { postImage } from "../../../../util/uploadImage";
import { ReactComponent as Caution } from "../../../../assets/caution.svg";

const ProfileEditWrapper = styled.div``;

const Header = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray1};
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const StyledForm = styled.form`
  padding: 12px 20px;
`;

const StyledLabel = styled.label`
  display: flex;
  padding-bottom: 8px;
`;

const ImageField = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 90px;
`;

const NameField = styled.div`
  margin-bottom: 24px;
`;

const InputWrapper = styled.label`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  border: 0.5px solid var(--, #efefef);
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 12px;
  width: 100%;
  color: ${colors.black};
`;

const DiscriptionField = styled.div`
  margin-bottom: 24px;
`;

const StyledTextarea = styled.textarea`
  outline: none;
  border: none;
  background-color: transparent;
  color: ${colors.black};
  font-size: 12px;
  width: 100%;
`;

const ErrorMessageWrapper = styled.div`
  display: flex;
  padding: 2px 4px;
  align-items: center;
  gap: 4px;
  border-radius: 2px;
  background: rgba(255, 59, 48, 0.2);
  margin-bottom: 10px;
`;

const ProfileEdit = () => {
  const { userId } = useParams();
  const userProf = useFetchUserInfomation();
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isValidateImage, setIsValidateImage] = useState(true);
  const [isValidateName, setIsValidateName] = useState(true);
  const [isValidateDiscription, setIsValidateDiscription] = useState(true);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const onFileUpload = (e) => {
    console.log("image");
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      //   const validPattern = /^.+\.(jpeg|jpg|png|gif|JPEG|JPG|PNG|GIF)$/;
      //   const isValid = !!file.name.match(validPattern);

      //   if (!isValid) {
      //     setErrorMessage('ファイルの拡張子が不正です');
      //     setIsShowErrorMessage(true);
      //     // return;
      //   } else if (file.size > 5000000) {
      //     setErrorMessage(
      //       'ファイルのサイズが大き過ぎます。5MB以下のファイルを指定してください'
      //     );
      //     setIsShowErrorMessage(true);
      //     // return;
      //   } else {
      //     setErrorMessage('');
      //     setIsShowErrorMessage(false);
      //   }
      setImageFile(file);
      // } else {
      //   setImageFile(null);
      // }
    }
  };
  const editProfile = async () => {
    if (!imageFile) {
      setIsValidateImage(false);
    }
    if (!name) {
      setIsValidateName(false);
    }
    if (!discription) {
      setIsValidateDiscription(false);
    }
    if (!imageFile || !imageFile || !discription) {
      return;
    }
    const imageUrl = imageFile ? await postImage(imageFile) : undefined;
    setDoc(
      doc(db, "User", userId),
      {
        userName: name ? name : userProf.userName,
        discription: discription ? discription : userProf.discription,
        userPhotoUrl: imageUrl ? imageUrl : userProf.userPhotoUrl,
      },
      { merge: true }
    )
      .then(() => navigate(".."))
      .catch((e) => console.log(e));
  };
  console.log(name, discription, imageFile);
  return (
    <>
      {!userProf ? (
        <></>
      ) : (
        <ProfileEditWrapper>
          <Header>
            <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
            <Font14 bold color={colors.gray1}>
              プロフィール編集
            </Font14>
            <BlankSpace></BlankSpace>
          </Header>
          <StyledForm
            //  action="/my-handling-form-page"
            //  method="post"
            onSubmit={(event) => event.preventDefault()}
          >
            <ImageField>
              <StyledLabel>
                <Font12 bold color={colors.black}>
                  プロフィール画像
                </Font12>
              </StyledLabel>
              {!isValidateImage && (
                <ErrorMessageWrapper>
                  <Caution />
                  <Font10 bold color={colors.error}>
                    商品画像を登録してください
                  </Font10>
                </ErrorMessageWrapper>
              )}
              {imageFile ? (
                <StyledImage
                  src={window.URL.createObjectURL(imageFile)}
                  alt="プレビュー"
                  onClick={() => {
                    if (fileInputRef.current?.value) {
                      fileInputRef.current.value = "";
                    }
                    console.log("clcik");
                    fileInputRef.current?.click();
                  }}
                />
              ) : (
                <StyledImage
                  src={userProf.userPhotoUrl}
                  alt="プレビュー"
                  onClick={() => {
                    if (fileInputRef.current?.value) {
                      fileInputRef.current.value = "";
                    }
                    console.log("clcik");
                    fileInputRef.current?.click();
                  }}
                />
              )}
              <HiddenFileInput
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileUpload}
              />
            </ImageField>
            <NameField>
              <StyledLabel>
                <Font12 bold color={colors.black}>
                  ニックネーム
                </Font12>
              </StyledLabel>
              {!isValidateName && (
                <ErrorMessageWrapper>
                  <Caution />
                  <Font10 bold color={colors.error}>
                    名前を入力してください
                  </Font10>
                </ErrorMessageWrapper>
              )}
              <InputWrapper>
                <StyledInput
                  type="text"
                  placeholder={userProf.userName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputWrapper>
            </NameField>
            <DiscriptionField>
              <StyledLabel>
                <Font12 bold color={colors.black}>
                  自己紹介文
                </Font12>
              </StyledLabel>
              {!isValidateDiscription && (
                <ErrorMessageWrapper>
                  <Caution />
                  <Font10 bold color={colors.error}>
                    自己紹介文を入力してください
                  </Font10>
                </ErrorMessageWrapper>
              )}
              <InputWrapper>
                <StyledTextarea
                  type="text"
                  onChange={(e) => setDiscription(e.target.value)}
                  placeholder={userProf.discription}
                >
                  {discription}
                </StyledTextarea>
              </InputWrapper>
            </DiscriptionField>
            <Button onClick={() => editProfile()}>
              <Font12 color={colors.white}>保存する</Font12>
            </Button>
          </StyledForm>
        </ProfileEditWrapper>
      )}
    </>
  );
};

export default ProfileEdit;
