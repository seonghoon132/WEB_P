
function session_del() {//세션 삭제
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function logout(){
    session_del();
    localStorage.removeItem("jwt_token");

    // 2. 세션스토리지 비우기
    sessionStorage.clear();

    // 3. 쿠키 삭제 (예시: jwt_token 쿠키 삭제)
    document.cookie = "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // 4. 로그인 페이지로 이동
    window.location.href = "index.html";
}

// 로그아웃 횟수 증가 함수
function logout_count() {
    let count = parseInt(getCookie("logout_cnt")) || 0;
    count++;
    setCookie("logout_cnt", count, 7); // 7일 동안 저장
    console.log(`로그아웃 횟수: ${count}`);
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("logout_form").addEventListener('click', () => {
        logout();     // 먼저 메시지 출력
    
    });
});