// const check_input = () => {
//     const loginForm = document.getElementById('login_form');
//     const loginBtn = document.getElementById('login_btn');
//     const emailInput= document.getElementById('typeEmailX');
//     const passwordInput = document.getElementById('typePasswordX');
//     const c = '아이디, 패스워드를체크합니다';
//     alert(c);
 
//     const emailValue = emailInput.value.trim();
//     const passwordValue = passwordInput.value.trim();
 
//     if (emailValue === '') {
//         alert('이메일을입력하세요.');
//         return false;
//     }
//     if (passwordValue === '') {
//         alert('비밀번호를입력하세요.');
//         return false;
//     }
 
//     console.log('이메일:', emailValue);
//     console.log('비밀번호:', passwordValue);
//     loginForm.submit();
//  };
//  document.getElementById("login_btn").addEventListener('click', check_input);

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");
    if(get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check(); // 세션 유무 검사
}

// 로그인 횟수 증가 함수
function login_count() {
    let count = parseInt(getCookie("login_cnt")) || 0;
    count++;
    setCookie("login_cnt", count, 7); // 7일 동안 저장
    console.log(`로그인 횟수: ${count}`);
}

// 로그아웃 횟수 증가 함수
function logout_count() {
    let count = parseInt(getCookie("logout_cnt")) || 0;
    count++;
    setCookie("logout_cnt", count, 7); // 7일 동안 저장
    console.log(`로그아웃 횟수: ${count}`);
}

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
    location.href='../index.html';
}

function login_failed() {
    let failCount = parseInt(getCookie("login_fail")) || 0;
    failCount++;
    setCookie("login_fail", failCount, 1); // 1일간 저장

    const messageDiv = document.getElementById('login_fail_msg');
    if (failCount >= 3) {
        messageDiv.innerText = `로그인 실패 횟수: ${failCount}회. 로그인 제한 상태입니다. 잠시 후 다시 시도해주세요.`;
        // 로그인 제한 상태를 저장할 수도 있음
        setCookie("login_block", "true", 1);
    } else {
        messageDiv.innerText = `로그인 실패 횟수: ${failCount}회. 3회 이상 실패 시 로그인 제한됩니다.`;
    }
}

function isLoginBlocked() {
    return getCookie("login_block") === "true";
}

const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    const idsave_check = document.getElementById('idSaveCheck');
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    
    //연속된 숫자 2개이상 반복 검사 함수
    function hasRepeatedDoubleDigits(input) {
        const regex = /(\d{2,}).*\1/;
        return regex.test(input);
    }

    if (emailValue === '') {
        alert('이메일을 입력하세요.');
        return false;
    }
    if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        return false;
    }
    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
    }
    if (passwordValue.length < 12) {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        return false;
    }
    if (emailValue.length > 10){
        alert("이메일 10글자 이하로 작성해주세요!");
        return false;
    }
    if (passwordValue.length > 15){
        alert("비밀번호는 15글자 이하로 작성해주세요!");
        return false;
    }
    if (hasRepeatedDoubleDigits(emailValue)) {
        alert('연속된 숫자 2개 이상이 반복 입력되었습니다. 다른 값을 입력하세요.');
        return false;
    }

    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
    }
    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
    }
    if (isLoginBlocked()) {
        alert("3회 이상 로그인 실패로 인해 로그인이 제한되었습니다. 잠시 후 다시 시도해주세요.");
        return false;
    }
    const loginSuccess = false; // TODO: 실제 로그인 성공 여부를 판별하는 로직 필요
        if (!loginSuccess) {
        login_failed(); // 실패 횟수 증가 및 메시지 출력
        return false;  // 로그인 실패 처리
    } else {
        // 로그인 성공 시 실패 카운트 초기화
        setCookie("login_fail", 0, 0);
        setCookie("login_block", "", 0);
        // 이후 로그인 성공 처리
    }
    const check_xss = (input) => {
        const DOMPurify = window.DOMPurify;
        const sanitizedInput = DOMPurify.sanitize(input);
        if (sanitizedInput !== input) {
            alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
            return false;
        }
        return sanitizedInput;
    };
        if (!check_xss(emailValue)) return false;
        if (!check_xss(passwordValue)) return false;

    console.log('이메일:', emailValue);
    console.log('비밀번호:', passwordValue);

    // 검사 마무리 단계 쿠키 저장, 최하단 submit 이전
    if(idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    }
    else{ // 아이디 체크 x
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
    }
    

    login_count();
    session_set(); // 세션 생성
    loginForm.submit();
};

// 이벤트 리스너는 함수 밖에서 등록해야 함
document.getElementById("login_btn").addEventListener('click', check_input);
document.getElementById("logout_btn").addEventListener('click', () => {
    logout_count();
    // 로그아웃 처리 로직 추가
});







 