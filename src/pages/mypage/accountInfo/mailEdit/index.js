import { useNavigate, useParams } from "react-router-dom";
import useFetchUserInfomation from "../../../../hooks/useFetchUserInformation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import styled from "styled-components";
import { useState } from "react";
import {
  Font10,
  Font12,
  Font14,
} from "../../../../common-componnets/typography";
import { colors } from "../../../../common-componnets/color";
import { Button } from "../../../../common-componnets/button";
import { ReactComponent as ArrowLeft } from "../../../../assets/arrowLeft.svg";
import { ReactComponent as Caution } from "../../../../assets/caution.svg";

const NameEditWrapper = styled.div``;

const Header = styled.div`
  align-items: center;
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const StyledForm = styled.form`
  padding: 20px;
`;

const StyledLabel = styled.label`
  display: flex;
`;

const MailField = styled.div`
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

const MailEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userData = useFetchUserInfomation();
  const [mailAdress, setMailAdress] = useState("");
  const [isValidateMailAdress, setIsValidateMailAdress] = useState(true);

  const editMail = () => {
    if (!mailAdress) {
      setIsValidateMailAdress(false);
      return;
    }
    setDoc(
      doc(db, "User", userId),
      {
        mailaddress: mailAdress,
      },
      { merge: true }
    )
      .then(() => navigate(".."))
      .catch((e) => console.log(e));
  };

  return (
    <>
      {!userData ? (
        <></>
      ) : (
        <NameEditWrapper>
          <Header>
            <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
            <Font14 bold color={colors.gray1}>
              メールアドレス編集
            </Font14>
            <BlankSpace></BlankSpace>
          </Header>
          <StyledForm
            //  action="/my-handling-form-page"
            //  method="post"
            onSubmit={(event) => event.preventDefault()}
          >
            <MailField>
              <StyledLabel>
                <Font12 color={colors.black} bold="true">
                  メールアドレス
                </Font12>
              </StyledLabel>
              {!isValidateMailAdress && (
                <ErrorMessageWrapper>
                  <Caution />
                  <Font10 bold color={colors.error}>
                    メールアドレスを登録してください
                  </Font10>
                </ErrorMessageWrapper>
              )}
              <InputWrapper>
                <StyledInput
                  type="text"
                  placeholder={userData.mailaddress}
                  value={mailAdress}
                  onChange={(e) => setMailAdress(e.target.value)}
                />
              </InputWrapper>
            </MailField>
            <Button onClick={() => editMail()}>
              <Font12 color={colors.white}>保存する</Font12>
            </Button>
          </StyledForm>
        </NameEditWrapper>
      )}
    </>
  );
};

export default MailEdit;
