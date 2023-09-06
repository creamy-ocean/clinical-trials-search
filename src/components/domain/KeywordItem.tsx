interface Props {
  sickNm: string;
  selected: boolean;
}

const KeywordItem = ({ sickNm, selected }: Props) => {
  console.log(selected);
  return (
    <li
      style={
        selected ? { backgroundColor: "blue" } : { backgroundColor: "white" }
      }
    >
      {sickNm}
    </li>
  );
};

export default KeywordItem;
