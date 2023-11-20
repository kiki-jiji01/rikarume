import styled from "styled-components";
import { Font12, Font14 } from "../../common-componnets/typography";
import { colors } from "../../common-componnets/color";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";
import { useNavigate } from "react-router-dom";

const Header = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  border-bottom: 0.5px solid ${colors.gray1};
  position: fixed;
  top: 0;
  background: ${colors.white};
  width: 100%;
`;

const BlankSpace = styled.div`
  width: 20px;
  height: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 64px 20px 20px 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <ArrowLeft color={colors.gray1} onClick={() => navigate(-1)} />
        <Font14 color={colors.gray1}>プライバシーポリシー</Font14>
        <BlankSpace></BlankSpace>
      </Header>
      <ContentWrapper>
        <Font12 color={colors.black}>
          リカルメ運営（以下「運営」といいます。）は、運営がリカルメ（以下「本サービス」といいます。）を提供するにあたり、ご利用される皆様（以下「利用者」といいます。）の個人に関する情報（以下「個人情報」といいます。）を取得します。{" "}
        </Font12>
        <Item>
          <Font14 color={colors.black} bold>
            第1条 （適用範囲）
          </Font14>
          <Font12 color={colors.black}>
            本プライバシーポリシー（以下「本ポリシー」といいます。）は、運営が利用者から個人情報を取得、利用及び管理するときに適用されます。
          </Font12>
        </Item>
        <Item>
          <Font14 color={colors.black} bold>
            第2条 （取得する情報）
          </Font14>
          <Font12 color={colors.black}>
            運営は、利用者から以下の情報を取得します。 (1) IPアドレス (2)
            閲覧したURL及び日時に関するタイムスタンプ
          </Font12>
        </Item>
        <Item>
          <Font14 color={colors.black} bold>
            第3条 （利用目的）
          </Font14>
          <Font12 color={colors.black}>
            運営が個人情報を収集・利用する目的は、以下のとおりです。 (1)
            本サービスの提供・運営のため (2) 上記の利用目的に付随する目的
          </Font12>
        </Item>
        <Item>
          <Font14 color={colors.black} bold>
            第4条 （安全確保の措置）
          </Font14>
          <Font12 color={colors.black}>
            運営は、収集した情報の漏えい、滅失又はき損の防止その他収集した情報の適切な管理のために必要な措置を講じます。運営が、安全管理のために講じた措置の概要は以下のとおりです。措置の具体的内容については、本ポリシーで定める窓口に対する利用者からの求めに応じて遅滞なく回答いたします。
          </Font12>
        </Item>
        <Item>
          <Font14 color={colors.black} bold>
            第5条 （個人情報の第三者への提供）
          </Font14>
          <Font12 color={colors.black}>
            1
            運営は、次に掲げる場合を除いて、あらかじめ利用者の同意を得ないで、取得した個人情報を第三者に提供することはありません。
            (1) 法令に基づく場合 (2)
            人の生命、身体又は財産の保護のために必要がある場合であって、利用者の同意を得ることが困難であるとき。
            (3)
            公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、利用者の同意を得ることが困難であるとき。
            (4)
            国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、利用者の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき。
            (5) その他法令で第三者提供の制限の例外が認められている場合 2
            前項の定めにかかわらず、次に掲げる場合には、当該個人情報の提供先は第三者に該当しないものとします。
            (1)
            運営が利用目的の達成に必要な範囲内において個人情報の取扱いの全部又は一部を委託することに伴って当該個人情報が提供される場合
            (2) 合併その他の事由による事業の承継に伴って個人情報が提供される場合
            (3) 第6条に定める共同利用者に対して提供される場合
          </Font12>
        </Item>
        <Item>
          <Font14 color={colors.black} bold>
            第6条 （個人情報の共同利用）
          </Font14>
          <Font12 color={colors.black}>
            運営は、法令改正への対応の必要性及び事業上の必要性に応じて、本ポリシーを変更する場合があります。本ポリシーの変更を行った場合には、本ウェブサイト上に掲載します。
          </Font12>
        </Item>
        <Item>
          <Font14 color={colors.black} bold>
            第8条 （開示、訂正等の手続）
          </Font14>
          <Font12 color={colors.black}>
            1
            利用者は、本条及び運営の関連規程に従って、運営に対し、個人情報保護法において認められる限度で、以下の求め又は請求を行うことができます。
            (1) 個人情報の利用目的の通知の求め (2)
            個人情報又は第三者提供記録の開示の請求 (3)
            個人情報の訂正、追加又は削除の請求 (4) 個人情報の利用の停止の請求
            (5) 個人情報の第三者への提供の停止の請求 2
            前項の求め又は請求にあたっては、同項各号のうちいずれの請求か特定の上、本人確認のための書類（運転免許証、健康保険証、住民票の写し等）をご提出頂きます。{" "}
          </Font12>
        </Item>

        <Item>
          <Font14 color={colors.black} bold>
            第9条 （お問い合わせ）
          </Font14>
          <Font12 color={colors.black}>
            運営の個人情報の取扱いに関するご相談や苦情等のお問い合わせについては、下記の窓口にご連絡ください。
            個人情報取扱事業者の氏名又は名称、住所及び代表者の氏名については利用者の求めに応じて遅滞なく回答します。
            Eメールアドレス：ricarme@gmail.com
          </Font12>
        </Item>
      </ContentWrapper>
    </>
  );
};
export default PrivacyPolicy;
