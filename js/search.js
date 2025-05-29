// document.getElementById("search_button_msg").addEventListener('click',search_message);

// function search_message(){
//     alert("검색합니다!");
// }



// function search_message(){
//     let mes="검색을 수행합니다" ;
//     alert(mes);
// }

// function googleSearch() {
//     const searchTerm = document.getElementById("search_input").value; // 검색어로 설정
//     const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    
//     const swearword = ['씨','병','씹','개','끼']; 
//     const containsSwearword = swearwords.some(word => searchTerm.includes(word));
//     // 새 창에서 구글 검색을 수행
//      if(containsSwearword){
//         alert("비속어가 포함되어있습니다. 다시 입력해주세요");    
//     }
//     else if(searchTerm.trim() === ''){
//         alert("공백이 포함되어있습니다. 다시 입력해주세요");
//     }else{
//         window.open(googleSearchUrl, "_blank"); // 새로운 창에서 열기.
//     }
//      return false;
//      }

// document.getElementById("search_button_msg").addEventListener('click', googleSearch);

// const search_message = () => {
//     let mes = "검색을 수행합니다";
//     alert(mes);
// };

// function googleSearch() {
//     const searchTerm = document.getElementById("search_input").value;
//     const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;

//     const swearwords = ['씨', '병', '씹', '개', '끼'];
//     const containsSwearword = swearwords.some(word => searchTerm.includes(word));

//     if (containsSwearword) {
//         alert("비속어가 포함되어있습니다. 다시 입력해주세요");
//     } else if (searchTerm.trim() === '') {
//         alert("공백이 포함되어있습니다. 다시 입력해주세요");
//     } else {
//         window.open(googleSearchUrl, "_blank");
//     }

//     return false;
// }


document.getElementById("search_button_msg").addEventListener('click', googleSearch);

const search_message = () => {
    let mes = "검색을 수행합니다";
    alert(mes);
};

function googleSearch() {
    const searchTerm = document.getElementById("search_input").value;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;

    const swearwords = ['씨', '병', '씹', '개', '끼'];
    const containsSwearword = swearwords.some(word => searchTerm.includes(word));

    if (containsSwearword) {
        alert("비속어가 포함되어있습니다. 다시 입력해주세요");
    } else if (searchTerm.trim() === '') {
        alert("공백이 포함되어있습니다. 다시 입력해주세요");
    } else {
        window.open(googleSearchUrl, "_blank");
    }

    return false;
}

