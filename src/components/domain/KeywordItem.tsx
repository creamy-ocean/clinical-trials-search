import { styled } from "styled-components";

interface Props {
  sickNm: string;
  selected: boolean;
}

const KeywordItem = ({ sickNm, selected }: Props) => {
  console.log(selected);
  return <ListItem selected={selected}>{sickNm}</ListItem>;
};

const ListItem = styled.li<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "#D0D9D4" : "")};
`;

export default KeywordItem;
