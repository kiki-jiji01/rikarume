import styled from "styled-components";
import { Home } from "./pages/home";

const TopWrapper = styled.div``;

function App() {
  return (
    // Headerはページ固有のロジックが入るケースもあるから、各ページにそれぞれ定義。
    <TopWrapper>
      <Home />
    </TopWrapper>
  );
}

export default App;
