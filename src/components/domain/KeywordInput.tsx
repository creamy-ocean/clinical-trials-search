import { styled } from "styled-components";

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  selectKeyword: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const KeywordInput = ({ keyword, setKeyword, selectKeyword }: Props) => {
  return (
    <SearchBox>
      <SearchInput
        type="text"
        name="search-input"
        value={keyword}
        placeholder="질환명을 입력해 주세요."
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onKeyDown={selectKeyword}
      />
      {keyword && (
        <DeleteButton
          onClick={() => {
            setKeyword("");
          }}
        >
          <i className="fa-solid fa-x"></i>
        </DeleteButton>
      )}
      <SearchButton>
        <i className="fa-solid fa-magnifying-glass" />
      </SearchButton>
    </SearchBox>
  );
};

export default KeywordInput;

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

const Button = styled.button`
  position: absolute;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const DeleteButton = styled(Button)`
  width: 1.5rem;
  height: 1.5rem;
  top: 34%;
  right: 15%;
  background-color: #a7afb7;
  i {
    margin-top: 0.1rem;
    color: #fff;
  }
`;

const SearchButton = styled(Button)`
  width: 2.5rem;
  height: 2.5rem;
  top: 23%;
  right: 3%;
  background-color: #007be9;
  i {
    color: white;
    font-size: 1rem;
  }
`;
