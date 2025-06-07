
1. 첫번쨰 깃허브 동기화까지는 2,3주차를 했습니다. 부트스트랩을 불러와서 네이게이션 바(+하이퍼링크)와 테이블 만들고 search.js(+연동)까지 만들었습니다. 메이플스토리 사진을  불러왔습니다.

2, 2번째 깃허브 동기화는 테이블 병합과 부트스트랩을 통해 색상을 꾸며주었고 검색 기능을 만들었습니다. 응용문제에서 클릭 이벤트 식별자 값을 바꿔도 실행된다는 것을 확인 후 원래 이름으로 바꿔놓았고 밑에 함수가 우선순위가 높은 것을 알게되었습니다. 

3. 3번쨰 깃허브는 5주차 수업의 팝업창을 만들어봤습니다. 

4. 4번째 깃허브는 5주차 연습문제인 search.js에서 비속어 공백을 검사하는 코딩을 짰습니다. 그리고 6주차 로그인 폼과 로그인 후 페이지를 작성했습니다.

5. 5번쨰 깃허브 동기화는 prettydiff.com 사이트를 사용하여 소스코드를 정리했다

6. 6번째 깃허브 동기화는 이틀에 걸쳐서 했다. 홈페이지를 꾸몄고 9주차 10주차 진도를 나갔다. 로그인 조건을 덧붙이는 응용문제, 10주차 연습문제까지 완료했다!!

7. 7번째 11주차 진도를 나갔다. 응용문제까지는 못 풀었다. 그리고 로그아웃 카운팅을 세는 것 관련해서 login.js 오류가 났다. gpt가 저번주에 임시코드로 변수 const login_succese코드를 줬었는데 임시 코드여서 false가 대입되어 있었다. 그래서 오늘 로그인 버튼을 눌렀을때 작동이 안되었던 것이다. gpt를 이용할 때 그 상황만 해결되는 임시 코드를 줘서 오류가 많이 난다는 것을 깨달았다.

8. 로그 아웃 기능 추가했다. 
AES-256-GCM 대칭 암호 알고리즘 구현했다.
Crypto2.js를 생성하고 암/복호화 함수를 정의했고 로그인, 로그인 후 페이지에 연결했다.
세션에 Session_Storage_pass2로 저장 로그인 후 복호화도 구현했다.

JWT 토큰(jwt_token)을 삭제하는 함수 구현, 기존에는로그아웃과동시에쿠키, 세션을 삭제했다.
로그인 이후 .removeItem 메소드를 활용하여 로컬스토리지의 토큰을삭제했다 로그아웃시 페이지 주소가 잘못 된 것도 고쳤다.

12주차 pdf 진도를 끝냈다.

9. 자바  index.html과 pop_up.html도 모듈화를 진행했다. popup.html은 onclick 속성을 제거했고 pop_upclos.js안에 pop_up.js를 넣어 모듈화 했는데 그 안에서 실행 되게 document.addEventListener("DOMContentLoaded", () => {
    show_clock();

    const checkbox = document.getElementById('check_popup');
    checkbox?.addEventListener('click', () => {
        closePopup();
    });
}); 이 함수를 추가해놨다. 

index.html은 pop_up.js안에 './jwt_token.js만 모듈화해서 넣어놨다. onload pop_up을 지우고 document.addEventListener("DOMContentLoaded", () => {
  if (document.body.id === "main-page") {
    pop_up();
  }
}); 이렇게 직접 추가했다. search.js도 document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search_button_msg").addEventListener('click', () => {
        search_message();     // 먼저 메시지 출력
        googleSearch();       // 그 다음 실제 검색
    });
}); 이런식으로 모듈구조로 바꿔줬다.


logout.js를 따로 만들어서 로그아웃 페이지에다가 연결했다. 그동안 login페이지에 쓸데없이 로그아웃 카운트,세션 쿠키 등 없애주는 함수 등 들어가있어서 따로 분리해줬다. 그러고 로그아웃 페이지도 모듈화 했다.

join도 모듈화를 완료했고 홈페이지 이동 후 로그인 페이지로 갔을때 이미 로컬 스토리지에 데이터가 남아있어서 이미 로그인 되었습니다와 토큰검증에러 두개가 충돌되는 현상이 발생해서 오류를 수정했다.


기능 추가 완료: join.js 파일에 아래 기능을 추가함.

회원가입 정보(이름, 이메일, 비밀번호)를 JSON으로 구성

암호화 후 세션 스토리지에 저장 (SignUp_Session_Encrypted)

로그인 페이지 등에서 이 세션이 있다면 복호화하여 콘솔에 출력

세션이 없다면 복호화 생략

응용문제
프로필 들어가는 링크에다가 target _blank로 잡아놔서 세션이 NULL되니까 계속  로그인이 필요하다며 튕겨짐. 세션의 특성 창이 닫히면 정보가 사라진다라는걸 기억하자.

완성을 위해 팝업창 10초 끄는걸로 다시 복구함

마지막 13주차 응용문제 전까지 지도를 구현했다.

10. 13주차 응용문제를 풀었다. 자바스크립트 코드가 길어지니까 페이지가 완전히 로드딘 후 실행되야하는 window.onload를 사용하여 먼저 실행시켜줬다. 그리고 body태그 닫기 전에다가 map.js script를 배치하여 완전히 로드 되고 난 후 map.js를 불러오게 만들었다. 마지막 profile.css와 profile.html을 prettydiff.com를 이용하여 소스코드 정리해줬다