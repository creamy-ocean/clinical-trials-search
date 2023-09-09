# Clinical Trials Search

> 원티드 프리온보딩 3주차 과제
> <br/>

## 프로젝트 소개

한국임상정보 사이트의 검색 영역을 클론하여 추천 검색어 목록을 구현한 사이트  
<br/>

## 실행 화면

![Honeycam 2023-09-09 00-03-44](https://github.com/creamy-ocean/clinical-trials-search/assets/93719660/64b980d4-3f1f-48eb-a8d7-c9fd581a0e84)
<br/>
<br/>

## 배포 링크 및 서버 주소

- 배포 링크: https://co-clinical-trials-search.netlify.app
- 서버 주소: https://clinical-trials-search-api.vercel.app
  <br/>

## 로컬 실행 방법

1. [서버 레포](https://github.com/walking-sunset/assignment-api)에 접속해 git clone, npm start를 하여 서버를 실행합니다.

2. 본 repository를 clone합니다.

```bash
$ git clone https://github.com/creamy-ocean/clinical-trials-search
```

3. .env파일 설정

```bash
폴더 최상단 루트에 .env파일을 생성하고 해당 파일 안에
REACT_APP_AXIOS_BASE_URL = 'http://localhost:4000'
을 작성하고 저장해주세요
```

4. 의존성 패키지를 설치합니다.

```bash
npm install
```

5. 개발 서버를 실행합니다.

```bash
npm start
```

<br/>

## 구현 기능

### API 호출별 로컬 캐싱 구현 [(코드 보러 가기)](https://github.com/creamy-ocean/clinical-trials-search/blob/master/src/utils/getCachedKeywords.ts)

- 웹 브라우저의 localStorage에 검색어별 캐시 데이터 보관
- 검색어를 입력하면 getCachedKeywords 함수를 사용
  - 캐싱된 데이터가 존재하는 경우 해당 데이터를 받아옴
  - 캐싱된 데이터가 존재하지 않는 경우 api를 호출해 데이터를 받아옴
- 로컬 캐시 데이터 만료 시간 구현
  - Date.now()에 EXPIRE_TIME을 더한 만료 시간을 캐시 데이터에 포함하여 저장
  - 캐싱된 데이터를 가져올 때 Date.now()가 만료 시간보다 큰 경우 스토리지에서 해당 데이터를 삭제하고 새롭게 api를 호출

![임상시험_1](https://github.com/creamy-ocean/clinical-trials-search/assets/93719660/af50dff9-886c-415d-be02-808371708b6d)

```javascript
import searchApi from "../api/search";

const getCachedKeywords = (keyword: string) => {
  const cachedKeywords = localStorage.getItem(keyword);
  const EXPIRE_TIME = 600000;

  const fetchRecommended = async () => {
    try {
      const res = await searchApi.getRecommended(keyword);
      const obj = {
        value: res.data,
        expiresAt: Date.now() + EXPIRE_TIME,
      };
      localStorage.setItem(keyword, JSON.stringify(obj));
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  if (cachedKeywords) {
    const parsedKeywords = JSON.parse(cachedKeywords);
    if (Date.now() > parsedKeywords.expiresAt) {
      localStorage.removeItem(keyword);
      return fetchRecommended();
    } else {
      return parsedKeywords.value;
    }
  } else {
    return fetchRecommended();
  }
};

export default getCachedKeywords;
```

### API 호출 횟수를 줄이는 전략 수립 및 실행 [(코드 보러 가기)](https://github.com/creamy-ocean/clinical-trials-search/blob/master/src/hooks/useDebounce.ts)

- 검색어가 입력될 때 useDebounce 커스텀 훅에 검색어를 전달
- 훅 내부에서 setTimeout을 이용해 0.2초 동안 추가 입력이 없으면 전달한 검색어를 리턴
- useDebounce에서 debounce 처리된 검색어가 존재할 때만 getCachedKeywords를 통해 API 호출
  - 이 때 캐싱 데이터가 있으면 캐싱된 데이터 출력

```javascript
import { useEffect, useState } from "react";

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const DELAY = 200;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, DELAY);

    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
```

### 키보드만으로 추천 검색어 이동 가능하도록 구현 [(코드 보러 가기)](https://github.com/creamy-ocean/clinical-trials-search/blob/master/src/components/domain/KeywordList.tsx)

- input 태그에 onKeyDown 이벤트 핸들러를 추가해 방향키를 사용하면 selectedItem state 값이 변하도록 구현
- 추천 검색어 리스트에서 map을 이용해 검색어 아이템의 index 값과 selectedItem state 값이 같으면 해당 검색어를 하이라이트 처리
- scrollIntoView 함수를 사용해 추천 검색어 이동 시 자동으로 스크롤 되도록 구현

```javascript
const [selectedItem, setSelectedItem] = useState(-1);
const scrollRef = useRef < HTMLUListElement > null;

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
  const focused = scrollRef.current?.querySelector(".focused");
  focused && focused.scrollIntoView({ block: "nearest" });
}, [selectedItem]);

<RecommendedList ref={scrollRef}>
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
</RecommendedList>;
```

  <br/>

## 기술 스택

<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=flat&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=flat&logo=styledcomponents&logoColor=white">
</div>
