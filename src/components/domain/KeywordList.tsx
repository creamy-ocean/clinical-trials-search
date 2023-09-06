import { useEffect, useState } from "react";
import { styled } from "styled-components";
import searchApi from "../../api/search";
import useDebounce from "../../hooks/useDebounce";
import { RecommendedKeyword } from "../../types";

const KeywordList = () => {
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [recommendedKeywords, setRecommendedKeywords] = useState<
    RecommendedKeyword[]
  >([]);
  const debouncedKeyword = useDebounce(keyword);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await searchApi.getRecommended(debouncedKeyword);
        setRecommendedKeywords(res.data);
      } catch (e) {
        setError("추천 검색어를 불러오는 중 오류가 발생했습니다");
      }
    };
    debouncedKeyword && fetchRecommended();
  }, [debouncedKeyword]);

  return (
    <>
      <input
        type="text"
        name="search-input"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div>
        {error && <span>{error}</span>}
        {recommendedKeywords.length === 0 ? (
          <span>추천 검색어가 없습니다</span>
        ) : (
          <List>
            {recommendedKeywords.map(({ sickCd, sickNm }) => {
              return <li key={sickCd}>{sickNm}</li>;
            })}
          </List>
        )}
      </div>
    </>
  );
};

export default KeywordList;

const List = styled.ul`
  list-style: none;
`;
