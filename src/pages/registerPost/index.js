import styled from "styled-components";
import { Button } from "../../common-componnets/button";
import { Font10, Font12, Font14 } from "../../common-componnets/typography";
import { colors } from "../../common-componnets/color";
import { useEffect, useRef, useState } from "react";
// import useFetchUser from "../../hooks/useFetchUser";
import { db, addDoc, collection } from "../../firebase-config";
import useFetchUser from "../../hooks/useFetchUser";
import { postImage } from "../../util/uploadImage";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import { ReactComponent as Menu } from "../../assets/menu.svg";
import { ReactComponent as ArrowBottom } from "../../assets/arrowBottom.svg";
import { ReactComponent as ArrowTop } from "../../assets/arrowTop.svg";
import { ReactComponent as CheckMark } from "../../assets/checkMark.svg";
import { ReactComponent as Camera } from "../../assets/camera.svg";
import { ReactComponent as Caution } from "../../assets/caution.svg";
import { Modal } from "../../common-componnets/modal";
import { useFetchCategory } from "../../hooks/useFetchCategory";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SideMenu } from "../home/sideMenu";

const RegisterPostWrapper = styled.div``;

const Header = styled.div`
  position: fixed;
  top: 0px;
  background: white;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px 12px 20px;
  border-bottom: 0.5px splid ${colors.gray2};
`;

const StyledForm = styled.form`
  padding: 65px 20px 20px 20px;
`;

const StyledLabel = styled.label`
  display: flex;
`;

const ItemField = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceField = styled(ItemField)``;

const ShippingFeeField = styled(ItemField)``;

const SelectButton = styled.button`
  border-radius: 4px;
  border: 0.5px solid ${colors.gray2};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.white};
  padding: 12px;
`;

const CategoryField = styled(ItemField)``;

const ImageUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const ImageUploadButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageUploadButton = styled.button`
  border: none;
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 0.5px solid ${colors.gray};
  background: var(--40, rgba(239, 239, 239, 0.4));
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const StyledImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
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
  color: #bbb;
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
  color: #bbb;
  font-size: 12px;
  width: 100%;
  color: ${colors.black};
  &::placeholder {
    color: ${colors.gray3};
  }
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
  justify-content: space-between;
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

const RegisterPost = () => {
  const user = useFetchUser();
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [shippingfeePayer, setShippingfeePayer] = useState("");
  const [category, setCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const [showModalName, setShowModalName] = useState("");
  const [isValidateImage, setIsValidateImage] = useState(true);
  const [isValidateTitle, setIsValidateTitle] = useState(true);
  const [isValidateDiscription, setIsValidateDiscription] = useState(true);
  const [isValidatePrice, setIsValidatePrice] = useState(true);
  const [isValidateShipping, setIsValidateShipping] = useState(true);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const categories = useFetchCategory();

  const onFileUpload = (e) => {
    console.log("image");
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      setImageFile(file);
    }
  };

  const registerPost = async () => {
    console.log("post");
    console.log("register");
    if (!imageFile) {
      setIsValidateImage(false);
    }
    if (!title) {
      setIsValidateTitle(false);
    }
    if (!discription) {
      setIsValidateDiscription(false);
    }
    if (!price) {
      setIsValidatePrice(false);
    }
    if (!shippingfeePayer) {
      setIsValidateShipping(false);
    }
    if (!imageFile || !title || !discription || !price || !shippingfeePayer) {
      return;
    }
    const imageUrl = await postImage(imageFile);
    addDoc(collection(db, "Post"), {
      discription: discription,
      price: price,
      title: title,
      img: imageUrl,
      user_id: user.uid,
      shippingfeePayer: shippingfeePayer,
      postDate: new Date(),
      category: [category, childCategory],
    })
      // .then(() => addDoc(collection(db, "Post", "ChatRoom", user.uid), {}))
      .then(() => navigate(".."));
  };
  console.log(
    categories.filter((v) => v.name === category).map((v) => [...v.children])
  );
  return (
    <>
      <RegisterPostWrapper>
        <Header>
          <ArrowLeft color={colors.gray3} onClick={() => navigate(-1)} />
          <Font14 bold>投稿</Font14>
          <Menu
            color={colors.gray3}
            onClick={() => setShowModalName("sideMenu")}
          />
        </Header>
        <StyledForm
          //  action="/my-handling-form-page"
          //  method="post"
          onSubmit={(event) => event.preventDefault()}
        >
          <ItemField>
            <StyledLabel>
              <Font12 color={colors.black} bold="true">
                🧸 商品について
              </Font12>
              <Font10 color={colors.main}>(必須)</Font10>
            </StyledLabel>
            {!isValidateImage && (
              <ErrorMessageWrapper>
                <Caution />
                <Font10 boldcolor={colors.error}>
                  商品画像を登録してください
                </Font10>
              </ErrorMessageWrapper>
            )}
            <ImageUploadWrapper>
              <ImageUploadButtonWrapper>
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
                <HiddenFileInput
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={onFileUpload}
                />
              </ImageUploadButtonWrapper>
              {imageFile && (
                <StyledImage
                  src={window.URL.createObjectURL(imageFile)}
                  alt="プレビュー"
                />
              )}
            </ImageUploadWrapper>
            <Font10 color={colors.gray1}>
              ※商品画像は1枚しか登録できません
            </Font10>
            {!isValidateTitle && (
              <ErrorMessageWrapper>
                <Caution />
                <Font10 boldcolor={colors.error}>
                  商品の名称や特徴を入力してください
                </Font10>
              </ErrorMessageWrapper>
            )}
            <InputWrapper>
              <StyledInput
                type="text"
                id="title"
                placeholder="商品の名称や特徴を入力してください"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputWrapper>
            {!isValidateDiscription && (
              <ErrorMessageWrapper>
                <Caution />
                <Font10 boldcolor={colors.error}>
                  購入希望商品の説明についてや取引について入力してください
                </Font10>
              </ErrorMessageWrapper>
            )}
            <InputWrapper>
              <StyledTextarea
                type="text"
                id="title"
                placeholder="購入希望商品の説明についてや取引について自由に入力してください"
                onChange={(e) => setDiscription(e.target.value)}
              >
                {discription}
              </StyledTextarea>
            </InputWrapper>
          </ItemField>
          <PriceField>
            <StyledLabel>
              <Font12 color={colors.black} bold="true">
                💰 買取希望価格
              </Font12>
              <Font10 color={colors.main}>(必須)</Font10>
            </StyledLabel>
            {!isValidatePrice && (
              <ErrorMessageWrapper>
                <Caution />
                <Font10 boldcolor={colors.error}>
                  買取希望価格を入力してください
                </Font10>
              </ErrorMessageWrapper>
            )}
            <InputWrapper>
              <StyledInput
                type="number"
                id="title"
                placeholder="買取希望価格を入力してください"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputWrapper>
          </PriceField>
          <ShippingFeeField>
            <StyledLabel>
              <Font12 color={colors.black} bold="true">
                🚚 送料
              </Font12>
              <Font10 color={colors.main}>(必須)</Font10>
            </StyledLabel>
            {!isValidateShipping && (
              <ErrorMessageWrapper>
                <Caution />
                <Font10 boldcolor={colors.error}>
                  送料をどちらが負担するか選択してください
                </Font10>
              </ErrorMessageWrapper>
            )}
            <SelectButton>
              {shippingfeePayer === "pucheser" ? (
                <Font12 color={colors.black}>購入者が送料を負担</Font12>
              ) : shippingfeePayer === "seller" ? (
                <Font12 color={colors.black}>販売者が送料を負担</Font12>
              ) : (
                <Font12 color={colors.gray3}>
                  送料をどちらが負担するか選択してください
                </Font12>
              )}

              {showModalName === "shipper" ? (
                <ArrowTop
                  color={colors.gray3}
                  onClick={() => setShowModalName("")}
                />
              ) : (
                <ArrowBottom
                  color={colors.gray3}
                  onClick={() => setShowModalName("shipper")}
                />
              )}
            </SelectButton>
          </ShippingFeeField>
          <CategoryField>
            <StyledLabel>
              <Font12 color={colors.black} bold="true">
                🙏🏻 希望商品について詳しく教えてください
              </Font12>
              <Font10 color={colors.gray}>（任意）</Font10>
            </StyledLabel>
            <SelectButton>
              {category ? (
                <Font12 color={colors.black}>{category}</Font12>
              ) : (
                <Font12 color={colors.gray3}>カテゴリー</Font12>
              )}
              {showModalName === "category" ? (
                <ArrowTop
                  color={colors.gray3}
                  onClick={() => setShowModalName("")}
                />
              ) : (
                <ArrowBottom
                  color={colors.gray3}
                  onClick={() => setShowModalName("category")}
                />
              )}
            </SelectButton>
            {categories
              .filter((v) => v.name === category)[0]
              ?.hasOwnProperty("children") && (
              <SelectButton>
                {childCategory ? (
                  <Font12 color={colors.black}>{childCategory}</Font12>
                ) : (
                  <Font12 color={colors.gray3}>カテゴリー</Font12>
                )}
                {showModalName === "childCategory" ? (
                  <ArrowTop
                    color={colors.gray3}
                    onClick={() => setShowModalName("")}
                  />
                ) : (
                  <ArrowBottom
                    color={colors.gray3}
                    onClick={() => setShowModalName("childCategory")}
                  />
                )}
              </SelectButton>
            )}
          </CategoryField>
          <Button onClick={() => registerPost()}>
            <Font12 color={colors.white}>投稿する</Font12>
          </Button>
        </StyledForm>
        {showModalName === "sideMenu" && (
          <Modal onClick={() => setShowModalName("")}>
            <SideMenu onClick={(e) => e.stopPropagation()} />
          </Modal>
        )}
        {showModalName === "shipper" && (
          <Modal onClick={() => setShowModalName("")}>
            <ModalInner onClick={(e) => e.stopPropagation()}>
              <Item
                onClick={() => {
                  setShippingfeePayer("pucheser");
                  setShowModalName("");
                }}
              >
                <Font12
                  bold
                  color={
                    shippingfeePayer === "pucheser" ? colors.main : colors.black
                  }
                >
                  購入者が送料を負担
                </Font12>
                {shippingfeePayer === "pucheser" && (
                  <CheckMark color={colors.main} />
                )}
              </Item>
              <Item
                onClick={() => {
                  setShippingfeePayer("seller");
                  setShowModalName("");
                }}
              >
                <Font12
                  bold
                  color={
                    shippingfeePayer === "seller" ? colors.main : colors.black
                  }
                >
                  販売者が送料を負担
                </Font12>
                {shippingfeePayer === "seller" && (
                  <CheckMark color={colors.main} />
                )}
              </Item>
            </ModalInner>
          </Modal>
        )}
        {showModalName === "category" && (
          <Modal onClick={() => setShowModalName("")}>
            <ModalInner onClick={(e) => e.stopPropagation()}>
              {categories.map((v) => {
                return (
                  <Item
                    onClick={() => {
                      setCategory(v.name);
                      setChildCategory("");
                      setShowModalName("");
                    }}
                  >
                    <Font12
                      bold
                      color={category === v.name ? colors.main : colors.black}
                    >
                      {v.name}
                    </Font12>
                    {category === v.name && <CheckMark color={colors.main} />}
                  </Item>
                );
              })}
            </ModalInner>
          </Modal>
        )}
        {showModalName === "childCategory" && (
          <Modal onClick={() => setShowModalName("")}>
            <ModalInner onClick={(e) => e.stopPropagation()}>
              {categories
                .filter((v) => v.name === category)
                .map((v) => [...v.children])[0]
                .map((v) => {
                  return (
                    <Item
                      onClick={() => {
                        setChildCategory(v);
                        setShowModalName("");
                      }}
                    >
                      <Font12
                        bold
                        color={childCategory === v ? colors.main : colors.black}
                      >
                        {v}
                      </Font12>
                      {childCategory === v && <CheckMark color={colors.main} />}
                    </Item>
                  );
                })}
            </ModalInner>
          </Modal>
        )}
      </RegisterPostWrapper>
    </>
  );
};

export default RegisterPost;
