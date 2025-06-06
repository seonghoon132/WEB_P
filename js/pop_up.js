import { generateJWT, checkAuth } from './jwt_token.js';
import { googleSearch } from './search.js';

export function pop_up() {
    var cookieCheck = getCookie("id");
    if (cookieCheck != "N"){
        window.open("../pop_up/pop_up.html", "팝업테스트", "width=400, height=300, top=10, left=10");
    }
 }
export function show_clock() {
    let currentDate = new Date(); // 현재시스템날짜객체생성
    let divClock = document.getElementById('divClock');
    let msg = "현재시간: ";
    if (currentDate.getHours() > 12) { // 12시보다크면오후아니면오전
        msg += "오후";
        msg += currentDate.getHours() - 12 + "시";
    } else {
        msg += "오전";
        msg += currentDate.getHours() + "시";
    } msg += currentDate.getMinutes() + "분";
    msg += currentDate.getSeconds() + "초";
    divClock.innerText = msg;
    if (currentDate.getMinutes() > 58) { // 정각1분전빨강색출력
        divClock.style.color = "red";
    }
    setTimeout(show_clock, 1000); // 1초마다갱신
}
const over = (obj) => {
    obj.src = "image/png-transparent-maplestory-logo-anfall-skill-online-game-others.png";
};
const out = (obj) => {
    obj.src = "image/lnb_logo.png";
};

export function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/" + ";SameSite=None; Secure";;
}
 
export function getCookie(name) {
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for ( var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            if (cookie_name[0] == "id") {
                return cookie_name[1];
            }
        }
    }
    return ; 
}

// export function closePopup() {
//     if (document.getElementById('check_popup').value) {
//         setCookie("id", "N", 1);
//         console.log("쿠키를 설정합니다.");
//         self.close();
//     }
// }
export function closePopup() {
    const checkbox = document.getElementById('check_popup');
    if (checkbox && checkbox.checked) {
        setCookie("id", "N", 1);
        console.log("쿠키를 설정했습니다.");
        window.close();
    }
}


document.addEventListener("DOMContentLoaded", () => {
  if (document.body.id === "main-page") {
    pop_up();
  }
});
