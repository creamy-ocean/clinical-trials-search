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
      <input
        type="text"
        name="search-input"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div>
        {error && <span>{error}</span>}
        {keyword ? (
          recommendedKeywords.length === 0 ? (
            <span>추천 검색어가 없습니다</span>
          ) : (
            <List>
              {recommendedKeywords.map(({ sickCd, sickNm }, idx) => {
                return (
                  <KeywordItem
                    key={sickCd}
                    sickNm={sickNm}
                    selected={selectedItem === idx}
                  />
                );
              })}
            </List>
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default KeywordList;

const List = styled.ul`
  list-style: none;
`;
