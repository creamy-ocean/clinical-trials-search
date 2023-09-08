import { styled } from "styled-components";

interface Props {
  sickNm: string;
  keyword: string;
  selected: boolean;
}

const KeywordItem = ({ sickNm, keyword, selected }: Props) => {
  const keywordIdx = sickNm.indexOf(keyword);
  return (
    <ListItem selected={selected}>
      <i className="fa-solid fa-magnifying-glass" />
      <div>
        {sickNm.substring(0, keywordIdx)}
        <Highlighted>
          {sickNm.substring(keywordIdx, keywordIdx + keyword.length)}
        </Highlighted>
        {sickNm.substring(keywordIdx + keyword.length)}
      </div>
    </ListItem>
  );
};

const ListItem = styled.li<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  background-color: ${({ selected }) => (selected ? "#F8F9FA" : "")};
  cursor: pointer;
  &: hover {
    background-color: #f8f9fa;
  }
  i {
    color: #a7afb7;
    margin-right: 1rem;
  }
`;

const Highlighted = styled.span`
  font-weight: bold;
`;

export default KeywordItem;
