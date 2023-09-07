import { styled } from "styled-components";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Main>
      <SearchPage />
    </Main>
  );
};

export default App;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
