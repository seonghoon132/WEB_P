import { encrypt_text, decrypt_text } from './crypto.js';

export function session_set2() { //세션 저장
    let idInput = document.querySelector("#form3Example3c");
    let pwInput = document.querySelector("#form3Example4c");
    
    if (!idInput || !pwInput) {
    alert("이메일 또는 비밀번호 입력 요소가 존재하지 않습니다.");
    return;
    } 
    const obj = { // 객체 선언
    id : idInput.value,
    otp : new Date()
     };

    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체-> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_id", obj.value);
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }
}
 
export function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

export function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href='../login/index_login.html'; // 로그인된 페이지로 이동
    }
}

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