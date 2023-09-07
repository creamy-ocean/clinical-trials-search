import { styled } from "styled-components";

interface Props {
  sickNm: string;
  selected: boolean;
}

const KeywordItem = ({ sickNm, selected }: Props) => {
  console.log(selected);
  return (
    <>
      <i className="fa-solid fa-magnifying-glass" />
      <ListItem selected={selected}>{sickNm}</ListItem>
    </>
  );
};

const ListItem = styled.li<{ selected: boolean }>`
  padding: 0.25rem 2rem;
  background-color: ${({ selected }) => (selected ? "#D0D9D4" : "")};
`;

export default KeywordItem;
