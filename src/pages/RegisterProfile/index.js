import { useRef, useState } from "react";
import styled from "styled-components";
import { auth, db, doc, setDoc, storage } from "../../firebase-config";
import { Font10, Font12, Font14 } from "../../common-componnets/typography";
import { colors } from "../../common-componnets/color";
import { Button } from "../../common-componnets/button";
import { useNavigate } from "react-router-dom";
import { fetchImageUrl, postImage } from "../../util/uploadImage";
import { ReactComponent as Caution } from "../../assets/caution.svg";
import { ReactComponent as Camera } from "../../assets/camera.svg";

const ProfileRegisterWrapper = styled.div``;

const Header = styled.div`
  position: fixed;
  top: 0px;
  background: white;
  width: calc(100% - 40px);
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const StyledForm = styled.form`
  padding: 65px 20px 0px 20px;
`;

const ImageField = styled.div`
  margin-bottom: 24px;
`;

const ImageUploadButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImageUploadButton = styled.button`
  display: flex;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
  border: none;

  background: var(--40, rgba(239, 239, 239, 0.4));
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

const StyledLabel = styled.label`
  display: flex;
  padding-bottom: 8px;
`;

const NameField = styled.div`
  margin-bottom: 24px;
`;

const DiscriptionField = styled.div`
  margin-bottom: 32px;
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

  &::placeholder {
    color: ${colors.gray3};
  }
`;

const StyledTextarea = styled.textarea`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 12px;
  width: 100%;

  color: ${colors.black};

  &::placeholder {
    color: ${colors.gray3};
  }
`;

const ErrorMessageWrapper = styled.div`
  display: flex;
  padding: 2px 4px;
  align-items: center;
  gap: 4px;
  border-radius: 2px;
  background: rgba(255, 59, 48, 0.2);
  margin-top: 8px;
  margin-bottom: 10px;
`;

const RegisterProfile = () => {
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isValidateImage, setIsValidateImage] = useState(true);
  const [isValidateName, setIsValidateName] = useState(true);
  const [isValidateDiscription, setIsValidateDiscription] = useState(true);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const user = auth.currentUser;
  console.log(user);
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
  const registerProfile = async () => {
    if (!imageFile) {
      setIsValidateImage(false);
    }
    if (!name) {
      setIsValidateName(false);
    }
    if (!discription) {
      setIsValidateDiscription(false);
    }
    if (!imageFile || !name || !discription) {
      return;
    }
    const imageUrl = await postImage(imageFile);
    setDoc(
      doc(db, "User", user.uid),
      {
        discription: discription,
        userName: name,
        userPhotoUrl: imageUrl,
      },
      { merge: true }
    )
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
  };
  console.log(imageFile);
  return (
    <ProfileRegisterWrapper>
      <Header>
        <Font14 bold color={colors.gray1}>
          プロフィール登録
        </Font14>
      </Header>
      <StyledForm
        //  action="/my-handling-form-page"
        //  method="post"
        onSubmit={(event) => event.preventDefault()}
      >
        <ImageField>
          <StyledLabel>
            <Font12 color={colors.black} bold="true">
              プロフィール画像
            </Font12>
            <Font10 color={colors.main}>(必須)</Font10>
          </StyledLabel>
          {!isValidateImage && (
            <ErrorMessageWrapper>
              <Caution />
              <Font10 color={colors.error}>
                プロフィール画像を登録してください
              </Font10>
            </ErrorMessageWrapper>
          )}
          <ImageUploadButtonWrapper>
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
              <ImageUploadButton
                onClick={() => {
                  if (fileInputRef.current?.value) {
                    fileInputRef.current.value = "";
                  }
                  console.log("clcik");
                  fileInputRef.current?.click();
                }}
              >
                <Camera />
              </ImageUploadButton>
            )}
            <HiddenFileInput
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onFileUpload}
            />
          </ImageUploadButtonWrapper>
        </ImageField>
        <NameField>
          <StyledLabel>
            <Font12 color={colors.black} bold="true">
              ニックネーム
            </Font12>
            <Font10 color={colors.main}>(必須)</Font10>
          </StyledLabel>
          {!isValidateName && (
            <ErrorMessageWrapper>
              <Caution />
              <Font10 color={colors.error}>
                ネームニックを入力してください
              </Font10>
            </ErrorMessageWrapper>
          )}
          <InputWrapper>
            <StyledInput
              type="text"
              placeholder="ニックネームを入力してください"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrapper>
        </NameField>
        <DiscriptionField>
          <StyledLabel>
            <Font12 color={colors.black} bold="true">
              自己紹介文
            </Font12>
            <Font10 color={colors.main}>(必須)</Font10>
          </StyledLabel>
          {!isValidateDiscription && (
            <ErrorMessageWrapper>
              <Caution />
              <Font10 color={colors.error}>自己紹介文を入力してください</Font10>
            </ErrorMessageWrapper>
          )}
          <InputWrapper>
            <StyledTextarea
              type="text"
              placeholder="例）素早い返信を心がけます。 よろしくお願い致します。"
              onChange={(e) => setDiscription(e.target.value)}
            >
              {discription}
            </StyledTextarea>
          </InputWrapper>
        </DiscriptionField>
        <Button onClick={() => registerProfile()}>
          <Font12 color={colors.white}>登録する</Font12>
        </Button>
      </StyledForm>
    </ProfileRegisterWrapper>
  );
};

export default RegisterProfile;
