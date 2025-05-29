// function pop_up() {
//     window.open("../pop_up/pop_up.html", "팝업테스트", "width=400, height=300, top=10, left=10");
//     }

//     function show_clock(){
//         let currentDate= new Date(); // 현재시스템날짜객체생성
//         let divClock= document.getElementById('divClock');
//         let msg = "현재시간: ";
        
//         if(currentDate.getHours()>12){  // 12시보다크면오후아니면오전
//             msg += "오후";
//             msg += currentDate.getHours()-12+"시";
//         }
//         else {
//             msg += "오전";
//             msg += currentDate.getHours()+"시";
//         }
//         msg += currentDate.getMinutes()+"분";
//         msg += currentDate.getSeconds()+"초";
//         divClock.innerText= msg;
//         if (currentDate.getMinutes()>58) {    //정각1분전빨강색출력
//        divClock.style.color="red";
//         }
//         setTimeout(show_clock, 1000);  //1초마다갱신
//        }
        
//     const over = (obj) => {
//         obj.src="image/png-transparent-maplestory-logo-anfall-skill-online-game-others.png";
//     };
//     const out = (obj) => {
//          obj.src="image/lnb_logo.png"; 
//     };

function pop_up() {
    window.open("../pop_up/pop_up.html", "팝업테스트", "width=400, height=300, top=10, left=10");
}
function show_clock() {
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