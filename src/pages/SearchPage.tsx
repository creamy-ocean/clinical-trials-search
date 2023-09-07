import styled from "styled-components";
import KeywordList from "../components/domain/KeywordList";

const SearchPage = () => {
  return (
    <>
      <Heading>
        국내 모든 임상시험 검색하고
        <br />
        온라인으로 참여하기
      </Heading>
      <KeywordList />
    </>
  );
};

export default SearchPage;

const Heading = styled.h2`
  margin-top: 5rem;
  margin-bottom: 3rem;
  font-size: 2rem;
  letter-spacing: -0.05rem;
  text-align: center;
  line-height: 1.5;
`;
