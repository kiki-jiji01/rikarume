import { useState } from "react";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import { Button, ModalButton } from "../../common-componnets/button";
import {
  Font10,
  Font12,
  Font13,
  Font14,
  Font17,
} from "../../common-componnets/typography";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../common-componnets/color";
import { Modal } from "../../common-componnets/modal";
import { ReactComponent as Caution } from "../../assets/caution.svg";

const ReportWrapper = styled.div``;

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

const ContentWrapper = styled.div`
  margin: 20px 20px 0px 20px;
`;

const StyledForm = styled.form``;

const ReportField = styled.div`
  margin-bottom: 32px;
`;

const StyledLabel = styled.label``;

const ErrorMessageWrapper = styled.div`
  display: flex;
  padding: 2px 4px;
  align-items: center;
  gap: 4px;
  border-radius: 2px;
  background: rgba(255, 59, 48, 0.2);
  margin-top: 8px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 4px;
  border: 0.5px solid var(--, #efefef);
  background: var(--40, rgba(239, 239, 239, 0.4));
  margin-top: 8px;
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

const ModalInner = styled.div`
  position: fixed;
  background: ${colors.white};
  border-radius: 14px;
  width: 270px;
  top: 40%;
`;

const TextWrapper = styled.div`
  display: flex;
  padding: 19px 0px;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px solid ${colors.gray2};
`;

const ReportUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [reportText, setReportText] = useState("");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isValidate, setIsValidate] = useState(true);

  const reportError = () => {
    if (!reportText) {
      setIsValidate(false);
      return;
    }
    addDoc(
      collection(db, "ReportUser"),
      {
        userId: userId,
        reportReason: reportText,
      },
      { merge: true }
    )
      .then(() => setIsModalOpened(true))
      .catch((e) => console.log(e));
  };
  return (
    <ReportWrapper>
      <Header>
        <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
        <Font14 bold color={colors.gray1}>
          ユーザーを運営に報告
        </Font14>
        <BlankSpace></BlankSpace>
      </Header>
      <ContentWrapper>
        <StyledForm
          //  action="/my-handling-form-page"
          //  method="post"
          onSubmit={(event) => event.preventDefault()}
        >
          <ReportField>
            <StyledLabel>
              <Font12 bold="true" color={colors.black}>
                報告する理由を入力してください
              </Font12>
              <Font10 color={colors.main}>(必須)</Font10>
            </StyledLabel>
            {!isValidate && (
              <ErrorMessageWrapper>
                <Caution />
                <Font10 bold color={colors.error}>
                  報告する理由を入力してください
                </Font10>
              </ErrorMessageWrapper>
            )}
            <InputWrapper>
              <StyledTextarea
                type="text"
                onChange={(e) => setReportText(e.target.value)}
                placeholder="報告する理由を入力してください"
              >
                {reportText}
              </StyledTextarea>
            </InputWrapper>
          </ReportField>
          <Button onClick={() => reportError()}>
            <Font12 color={colors.white}>報告する</Font12>
          </Button>
        </StyledForm>
      </ContentWrapper>
      {isModalOpened && (
        <Modal>
          <ModalInner>
            <TextWrapper>
              <Font13>
                報告を受け付けました
                <br />
                報告ありがとうございます
              </Font13>
            </TextWrapper>
            <ModalButton
              onClick={() => {
                setIsModalOpened(false);
                navigate("..");
              }}
            >
              <Font17 color={colors.blue}>OK</Font17>
            </ModalButton>
          </ModalInner>
        </Modal>
      )}
    </ReportWrapper>
  );
};

export default ReportUser;
