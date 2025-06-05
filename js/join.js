

import { encrypt_text, decrypt_text } from './crypto.js';

document.addEventListener("DOMContentLoaded", () => {
  const joinBtn = document.getElementById("join_btn");
  if (joinBtn) {
    joinBtn.addEventListener("click", join);
  } else {
    console.error("join_btn not found in DOM");
  }

  // 페이지 로드 시: 복호화된 객체 출력
  const encryptedUser = sessionStorage.getItem("SignUp_Session_Encrypted");
  if (encryptedUser) {
    try {
      const decrypted = decrypt_text(encryptedUser);
      const userObj = JSON.parse(decrypted);
      console.log("[복호화된 회원가입 정보 출력]", userObj);
    } catch (error) {
      console.warn("[복호화 실패]", error);
    }
  } else {
    console.log("[회원가입 세션 없음] 복호화 생략됨");
  }
});

function join() {
  const nameRegex = /^[가-힣]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  let form = document.querySelector("#join_form");
  let name = document.querySelector("#form3Example1c");
  let email = document.querySelector("#form3Example3c");
  let password = document.querySelector("#form3Example4c");
  let re_password = document.querySelector("#form3Example4cd");
  let agree = document.querySelector("#form2Example3c");

  form.action = "../login/login.html?from=signup";
  form.method = "get";

  if (!nameRegex.test(name.value)) {
    alert("이름은 한글만 입력 가능합니다.");
    name.focus(); return;
  }
  if (!emailRegex.test(email.value)) {
    alert("이메일 형식이 올바르지 않습니다.");
    email.focus(); return;
  }
  if (!pwRegex.test(password.value)) {
    alert("비밀번호는 8자 이상이며 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.");
    password.focus(); return;
  }
  if (password.value !== re_password.value) {
    alert("비밀번호가 일치하지 않습니다.");
    re_password.focus(); return;
  }
  if (!agree.checked) {
    alert("약관에 동의하셔야 가입이 가능합니다.");
    return;
  }

  if (name.value && email.value && password.value && re_password.value) {
    const userInfo = {
      name: name.value,
      email: email.value,
      password: password.value,
      re_password: re_password.value
    };

    const userJson = JSON.stringify(userInfo);
    const encrypted = encrypt_text(userJson);
    sessionStorage.setItem("SignUp_Session_Encrypted", encrypted);

    form.submit();
  } else {
    alert("회원가입 폼에 모든 정보를 입력해주세요.");
  }
}
