import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../../firebase-config";
import styled from "styled-components";
import { colors } from "../../../common-componnets/color";
import { postImage } from "../../../util/uploadImage";
import { Font10, Font12, Font14 } from "../../../common-componnets/typography";
import { ReactComponent as ArrowLeft } from "../../../assets/arrowLeft.svg";
import { ReactComponent as ArrowBottom } from "../../../assets/arrowBottom.svg";
import { ReactComponent as ArrowTop } from "../../../assets/arrowTop.svg";
import { ReactComponent as CheckMark } from "../../..//assets/checkMark.svg";
import { ReactComponent as Camera } from "../../../assets/camera.svg";
import { Button } from "../../../common-componnets/button";
import { Modal } from "../../../common-componnets/modal";
import { useFetchCategory } from "../../../hooks/useFetchCategory";

const Header = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray2};
  position: fixed;
  width: calc(100% - 24px);
  background: ${colors.white};
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const StyledForm = styled.form`
  padding: 60px 20px 20px 20px;
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
`;

const StyledTextarea = styled.textarea`
  outline: none;
  border: none;
  background-color: transparent;
  color: #bbb;
  font-size: 12px;
  width: 100%;
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

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState();
  const [discription, setDiscription] = useState();
  const [price, setPrice] = useState();
  const [imageFile, setImageFile] = useState();
  const [shippingFeePayer, setShippingFeePayer] = useState("");
  const [category, setCategory] = useState("");
  const [childCategory, setChildCategory] = useState("");
  const fileInputRef = useRef(null);
  const [showModalName, setShowModalName] = useState("");
  const [isChangedImg, setIsChangedImg] = useState(false);
  const navigate = useNavigate();
  const categories = useFetchCategory();

  const fetchData = async () => {
    const postDocRef = doc(db, "Post", postId);
    const postData = (await getDoc(postDocRef)).data();
    console.log(postData);
    setTitle(postData.title);
    setDiscription(postData.discription);
    setPrice(postData.price);
    setImageFile(postData.img);
    setShippingFeePayer(postData.shippingfeePayer);
    setCategory(postData.category[0]);
    setChildCategory(postData.category[1]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onFileUpload = (e) => {
    console.log("image");
    setIsChangedImg(true);
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

  const editPost = async () => {
    console.log("post");
    const imageUrl =
      typeof imageFile === "string" ? imageFile : await postImage(imageFile);
    const docRef = doc(db, "Post", postId);
    setDoc(
      docRef,
      {
        discription: discription,
        price: price,
        title: title,
        img: imageUrl,
        shippingFeePayer: shippingFeePayer,
        category: [category, childCategory],
        // user_id:user.uid,
        // postDate:new Date()
      },
      { merge: true }
    ).then(() => navigate(".."));
  };

  console.log(title, discription, price, typeof imageFile);
  return (
    <>
      <Header>
        <ArrowLeft onClick={() => navigate(-1)} color={colors.gray1} />
        <Font14 bold color={colors.gray1}>
          投稿編集
        </Font14>
        <BlankSpace></BlankSpace>
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
                src={
                  isChangedImg
                    ? window.URL.createObjectURL(imageFile)
                    : imageFile
                }
                alt="プレビュー"
              />
            )}
          </ImageUploadWrapper>
          <Font10 color={colors.gray1}>※商品画像は1枚しか登録できません</Font10>
          <InputWrapper>
            <StyledInput
              type="text"
              id="title"
              placeholder="商品の名称や特徴を入力してください"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputWrapper>
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
          <SelectButton>
            <Font12 color={colors.gray1}>
              {shippingFeePayer === "pucheser"
                ? "購入者が送料を負担"
                : shippingFeePayer === "seller"
                ? "販売者が送料を負担"
                : "送料をどちらが負担するか選択してください"}
            </Font12>
            {showModalName === "shipper" ? (
              <ArrowTop
                color={colors.gray1}
                onClick={() => setShowModalName("")}
              />
            ) : (
              <ArrowBottom
                color={colors.gray1}
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
              <Font12 color={colors.gray1}>{category}</Font12>
            ) : (
              <Font12 color={colors.gray3}>カテゴリー</Font12>
            )}
            {showModalName === "category" ? (
              <ArrowTop
                color={colors.gray1}
                onClick={() => setShowModalName("")}
              />
            ) : (
              <ArrowBottom
                color={colors.gray1}
                onClick={() => setShowModalName("category")}
              />
            )}
          </SelectButton>
          {categories
            .filter((v) => v.name === category)[0]
            ?.hasOwnProperty("children") && (
            <SelectButton>
              {childCategory ? (
                <Font12 color={colors.gray1}>{childCategory}</Font12>
              ) : (
                <Font12 color={colors.gray3}>カテゴリー</Font12>
              )}
              {showModalName === "childCategory" ? (
                <ArrowTop
                  color={colors.gray1}
                  onClick={() => setShowModalName("")}
                />
              ) : (
                <ArrowBottom
                  color={colors.gray1}
                  onClick={() => setShowModalName("childCategory")}
                />
              )}
            </SelectButton>
          )}
        </CategoryField>
        <Button onClick={() => editPost()}>
          <Font12 color={colors.white}>保存する</Font12>
        </Button>
      </StyledForm>
      {showModalName === "shipper" && (
        <Modal onClick={() => setShowModalName("")}>
          <ModalInner onClick={(e) => e.stopPropagation()}>
            <Item
              onClick={() => {
                setShippingFeePayer("pucheser");
                setShowModalName("");
              }}
            >
              <Font12
                bold
                color={
                  shippingFeePayer === "pucheser" ? colors.main : colors.black
                }
              >
                購入者が送料を負担
              </Font12>
              {shippingFeePayer === "pucheser" && (
                <CheckMark color={colors.main} />
              )}
            </Item>
            <Item
              onClick={() => {
                setShippingFeePayer("seller");
                setShowModalName("");
              }}
            >
              <Font12
                bold
                color={
                  shippingFeePayer === "seller" ? colors.main : colors.black
                }
              >
                販売者が送料を負担
              </Font12>
              {shippingFeePayer === "seller" && (
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
    </>
  );
};

export default EditPost;
