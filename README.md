# Clinical Trials Search
> 원티드 프리온보딩 3주차 과제
<br/>

## 프로젝트 소개
한국임상정보 사이트의 검색 영역을 클론하여 추천 검색어 목록을 구현한 사이트  
<br/>

## 🎬 프로젝트 로컬 실행 방법

1. [서버 레포](https://github.com/walking-sunset/assignment-api)에 접속해 git clone, npm start를 하여 서버를 실행합니다.

2. 본 repository를 clone합니다.

```bash
$ git clone [https://github.com/pre-onboarding-12th-team3/pre-onboarding-12th-3-3.git](https://github.com/creamy-ocean/clinical-trials-search)
```

3. .env파일 설정

```bash
폴더 최상단 루트에 .env파일을 생성하고 안에
REACT_APP_AXIOS_BASE_URL = 'http://localhost:4000/'
를 작성하고 저장해주세요
```

4. 의존성 패키지를 설치합니다.

```bash
npm install
```

5. 개발 서버를 실행합니다.

```bash
npm start
<br/>

## 구현 기능
- API 호출별 로컬 캐싱 구현
  - 웹 브라우저의 localStorage에 검색어별 캐시 데이터 보관
  - 검색어를 입력하면 getCachedKeywords 함수를 사용
    - 캐싱된 데이터가 존재하는 경우 해당 데이터를 받아옴
    - 캐싱된 데이터가 존재하지 않는 경우 api를 호출해 데이터를 받아옴
    - https://github.com/creamy-ocean/clinical-trials-search/blob/5cf8e61ad9f8f1eaa868086bd11aad6904804902/src/utils/getCachedKeywords.ts#L1-L34
      
- 로컬 캐시 데이터 만료 시간 구현
  - Date.now()에 EXPIRE_TIME을 더한 만료 시간을 캐시 데이터에 포함하여 저장
  - 캐싱된 데이터를 가져올 때 Date.now()가 만료 시간보다 큰 경우 스토리지에서 해당 데이터를 삭제하고 새롭게 api를 호출
  - https://github.com/creamy-ocean/clinical-trials-search/blob/5cf8e61ad9f8f1eaa868086bd11aad6904804902/src/utils/getCachedKeywords.ts#L1-L34
 
- API 호출 횟수를 줄이는 전략 수립 및 실행
  - 검색어가 입력될 때 useDebounce 커스텀 훅에 검색어를 전달
  - 훅 내부에서 setTimeout을 이용해 0.2초 동안 추가 입력이 없으면 전달한 검색어를 리턴
  - useDebounce에서 debounce 처리된 검색어가 존재할 때만 getCachedKeywords를 통해 API 호출
    - 이 때 캐싱 데이터가 있으면 캐싱된 데이터 출력
   
- 키보드만으로 추천 검색어 이동 가능하도록 구현
  - input 태그에 onKeyDown 이벤트 핸들러를 추가해 방향키를 사용하면 selectedItem state 값이 변하도록 구현
  - 추천 검색어 리스트에서 map을 이용해 검색어 아이템의 index 값과 selectedItem state 값이 같으면 해당 검색어를 하이라이트 처리
  - scrollIntoView 함수를 사용해 추천 검색어 이동 시 자동으로 스크롤 되도록 구현
<br/>

## 기술 스택
<div>
  <img src="https://img.shields.io/badge/react-61DAFB?style=flat&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/axios-5A29E4?style=flat&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/styled components-DB7093?style=flat&logo=styledcomponents&logoColor=white">
</div>
