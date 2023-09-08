import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import useDebounce from "../../hooks/useDebounce";
import getCachedKeywords from "../../utils/getCachedKeywords";
import KeywordInput from "./KeywordInput";
import KeywordItem from "./KeywordItem";

const KeywordList = () => {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [recommendedKeywords, setRecommendedKeywords] = useState([]);
  const [selectedItem, setSelectedItem] = useState(-1);
  const debouncedKeyword = useDebounce(keyword);
  const scrollRef = useRef<HTMLUListElement>(null);

  const fetchCachedKeywords = async () => {
    try {
      const recommended = await getCachedKeywords(debouncedKeyword);
      setRecommendedKeywords(recommended);
    } catch (err: any) {
      setError("추천 검색어를 불러오는 중 오류가 발생했습니다");
    }
  };

  const selectKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem((prev) => prev - 1);
    } else if (
      e.key === "ArrowDown" &&
      selectedItem < recommendedKeywords.length - 1
    ) {
      setSelectedItem((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (debouncedKeyword) {
      fetchCachedKeywords();
    }
  }, [debouncedKeyword]);

  useEffect(() => {
    const focused = scrollRef.current?.querySelector(".focused");
    focused && focused.scrollIntoView({ block: "nearest" });
  }, [selectedItem]);

  return (
    <>
      <KeywordInput
        keyword={keyword}
        setKeyword={setKeyword}
        selectKeyword={selectKeyword}
        setSelectedItem={setSelectedItem}
      />
      {error && <StyledMsg>{error}</StyledMsg>}
      {keyword && (
        <RecommendedBox>
          {recommendedKeywords.length === 0 ? (
            <StyledMsg>추천 검색어가 없습니다</StyledMsg>
          ) : (
            <>
              <RecommendedList ref={scrollRef}>
                <StyledDiv>추천 검색어</StyledDiv>
                {recommendedKeywords.map(({ sickCd, sickNm }, idx) => {
                  return (
                    <KeywordItem
                      key={sickCd}
                      sickNm={sickNm}
                      keyword={debouncedKeyword}
                      selected={selectedItem === idx}
                    />
                  );
                })}
              </RecommendedList>
            </>
          )}
        </RecommendedBox>
      )}
    </>
  );
};

export default KeywordList;

const StyledMsg = styled.div`
  margin-top: 1.8rem;
  text-align: center;
`;

const RecommendedBox = styled.div`
  min-height: 5rem;
  max-height: 52vh;
  width: 28rem;
  margin-top: 1rem;
  border-radius: 1rem;
  background-color: #fff;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 3rem;
  }
  &::-webkit-scrollbar-thumb {
    height: 5rem;
    border-radius: 2rem;
    background: #007be9;
    border: 1rem solid #fff;
  }
  &::-webkit-scrollbar-track {
    margin-top: 2.5rem;
  }
`;

const StyledDiv = styled.div`
  padding: 0.5rem 1.5rem;
  font-size: 0.8rem;
  color: #64717f;
`;

const RecommendedList = styled.ul`
  list-style: none;
  padding: 0;
`;
