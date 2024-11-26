import CookieManager from "./CookieManager";
export const cookie = new CookieManager();

// 쿠키 찾기
export const getCookie = (name, options = null) => {
    var value = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}

// 로그인 여부 확인
export const isLogin = () => {
    return getCookie('token');
}