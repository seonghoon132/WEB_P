 // JWT 비밀 키 (실제 운영 환경에서는 복잡한 키 사용 필수)
const JWT_SECRET = "your_secret_key_here";
 


export function generateJWT(payload) {
    // 1. 헤더 생성 및 Base64 인코딩
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = btoa(JSON.stringify(header));
    // 2. 페이로드 Base64 인코딩
    const encodedPayload = btoa(JSON.stringify(payload)); // JSON 형태로 변환 후 인코딩
    // 3. 서명 생성 (HMAC-SHA256 알고리즘 사용)
    const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
    const encodedSignature = CryptoJS.enc.Base64.stringify(signature);
    // 4. 최종 토큰 조합
    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

function verifyJWT(token) { // 토큰검증
    try {
        // 1. 토큰을헤더, 페이로드, 서명으로분할
        const parts = token.split('.');
        if (parts.length!== 3) return null; // 형식오류체크
        const [encodedHeader, encodedPayload, encodedSignature] = parts;
        // 2. 서명재계산및비교
        const signature = CryptoJS.HmacSHA256(`${encodedHeader}.${encodedPayload}`, JWT_SECRET);
        const calculatedSignature= CryptoJS.enc.Base64.stringify(signature);
        if (calculatedSignature!== encodedSignature) return null; // 서명불일치
        // 3. 페이로드파싱및만료시간검증
        const payload = JSON.parse(atob(encodedPayload)); // 디코딩후해석
        if (payload.exp< Math.floor(Date.now() / 1000)) { // 밀리초단위
            console.log('보안토큰이만료되었습니다');
            return null;
        }
            return payload; // 검증성공
        } catch (error) {
            return null; // 파싱오류또는기타예외처리
    }
}


function isAuthenticated() { // 사용자 인증 상태 확인
    const token = localStorage.getItem('jwt_token');
    if (!token) return false; // 토큰 없음
        const payload = verifyJWT(token);
        console.log(payload);
    return !!payload; // 페이로드 유무로 인증 상태 판단
}

// export function checkAuth() { // 인증 검사 수행
//     const authenticated = isAuthenticated(); // 한 번만 검증 호출
//     if (authenticated) {
//         alert('정상적으로 토큰이 검증되었습니다.');
//     } else {
//         alert('토큰 검증 에러!! 인증되지 않은 접근입니다.');
//     window.location.href = '../login/login.html'; // 로그인 페이지 이동
//     }
// }

// 페이지 접근 시 검증
// export function checkAuth() {
//   const authenticated = isAuthenticated();

//   if (authenticated) {
//     console.log('정상 인증');
//   } else {
//     console.warn('토큰 검증 실패 → 자동 로그아웃');
//     localStorage.removeItem("jwt_token");
//     sessionStorage.clear(); // 필요시
//     alert('토큰이 유효하지 않습니다. 다시 로그인해주세요.');
//     location.href = '../login/login.html';
//   }
// }

export function checkAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSignup = urlParams.get('from') === 'signup';

    // 회원가입 후 로그인 진입이면 검사 생략
    if (isFromSignup) return;

    const authenticated = isAuthenticated();
    if (authenticated) {
        alert('정상적으로 토큰이 검증되었습니다.');
    } else {
        alert('토큰 검증 에러!! 인증되지 않은 접근입니다.');
        window.location.href = '../login/login.html';
    }
}