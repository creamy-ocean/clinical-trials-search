import { useEffect, useState } from "react";
import { styled } from "styled-components";
import useDebounce from "../../hooks/useDebounce";
import getCachedKeywords from "../../utils/getCachedKeywords";
import KeywordItem from "./KeywordItem";

const KeywordList = () => {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [recommendedKeywords, setRecommendedKeywords] = useState([]);
  const debouncedKeyword = useDebounce(keyword);
  const [selectedItem, setSelectedItem] = useState(-1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem((prev) => prev - 1);
    } else if (
      e.key === "ArrowDown" &&
      selectedItem < recommendedKeywords.length - 1
    ) {
      setSelectedItem((prev) => prev + 1);
    }
    console.log(selectedItem);
  };

  const fetchCachedKeywords = async () => {
    try {
      const recommended = await getCachedKeywords(debouncedKeyword);
      setRecommendedKeywords(recommended);
    } catch (err: any) {
      setError("추천 검색어를 불러오는 중 오류가 발생했습니다");
    }
  };

  useEffect(() => {
    if (debouncedKeyword) {
      fetchCachedKeywords();
    }
  }, [debouncedKeyword]);

  return (
    <>
      <SearchBox>
        <SearchInput
          type="text"
          name="search-input"
          value={keyword}
          placeholder="질환명을 입력해 주세요."
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SearchButton>
          <i className="fa-solid fa-magnifying-glass" />
        </SearchButton>
      </SearchBox>
      {error && <StyledMsg>{error}</StyledMsg>}
      {keyword && (
        <RecommendedBox>
          {recommendedKeywords.length === 0 ? (
            <StyledMsg>추천 검색어가 없습니다</StyledMsg>
          ) : (
            <RecommendedList>
              <StyledSpan>추천 검색어</StyledSpan>
              {recommendedKeywords.map(({ sickCd, sickNm }, idx) => {
                return (
                  <KeywordItem
                    key={sickCd}
                    sickNm={sickNm}
                    selected={selectedItem === idx}
                  />
                );
              })}
            </RecommendedList>
          )}
        </RecommendedBox>
      )}
    </>
  );
};

export default KeywordList;

const SearchBox = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 24rem;
  padding: 1.5rem 2rem;
  border-radius: 3rem;
  border: 2px solid transparent;
  font-size: 1.1rem;
  font-family: "Spoqa Han Sans Neo";
  &:focus {
    outline: none;
    border: 2px solid #007be9;
  }
  &::placeholder {
    color: #aaafb7;
    font-size: 1.1rem;
    font-family: "Spoqa Han Sans Neo";
  }
`;

const SearchButton = styled.button`
  position: absolute;
  top: 23%;
  right: 3%;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background-color: #007be9;
  i {
    color: white;
    font-size: 1rem;
  }
`;

const StyledMsg = styled.div`
  margin-top: 1.8rem;
  text-align: center;
`;

const RecommendedBox = styled.div`
  min-height: 5rem;
  width: 28rem;
  margin-top: 1rem;
  border-radius: 1rem;
  background-color: #fff;
`;

const StyledSpan = styled.span`
  font-size: 0.8rem;
  color: #777;
`;

const RecommendedList = styled.ul`
  list-style: none;
  padding: 0;
`;
