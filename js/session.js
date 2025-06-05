import { encrypt_text, decrypt_text } from './crypto.js';

export function session_set() { //세션 저장
    let id = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");
    let random = new Date(); // 랜덤 타임스탬프
    const obj = { // 객체 선언
    id : id.value,
    otp : random
 }
 if (sessionStorage) {
    const objString = JSON.stringify(obj); // 객체-> JSON 문자열 변환
    let en_text = encrypt_text(objString); // 암호화
    sessionStorage.setItem("Session_Storage_id", id.value);
    sessionStorage.setItem("Session_Storage_object", objString);
    sessionStorage.setItem("Session_Storage_pass", en_text);
 } else {
    alert("세션 스토리지 지원 x");
 }
}


export function session_check_profile() {
    const userId = sessionStorage.getItem("Session_Storage_id");

    if (!userId){
        alert("로그인이 필요한 페이지입니다.");
        window.location.href = "../login/login.html"; // 로그인 페이지로 리다이렉트
    } else {
        console.log("세션 유지 중, 로그인된 사용자:", userId);
    }
}

export function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

export function session_check() {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSignup = urlParams.get('from') === 'signup';
    
    if (isFromSignup) {
        console.log("회원가입 후 첫 진입이므로 session_check 생략");
        return;
    }

    if (sessionStorage.getItem("Session_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href = '../login/index_login.html';
    }
}



// export function session_check() { //세션 검사
//     if (sessionStorage.getItem("Session_Storage_id")) {
//         alert("이미 로그인 되었습니다.");
//         location.href='../login/index_login.html'; // 로그인된 페이지로 이동
//     }
// }

function handleLogin(password) {
    const encrypted = encryptData("your-secret-key", password);
    sessionStorage.setItem("Session_Storage_pass2", encrypted);
}
// 로그인 후 페이지에서 호출
function handleDecryption() {
    const encrypted = sessionStorage.getItem("Session_Storage_pass2");
    if (encrypted) {
        const decrypted = decryptData("your-secret-key", encrypted);
        console.log("복호화된 비밀번호:", decrypted);
    }
}
