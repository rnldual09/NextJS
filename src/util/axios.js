import axios from "axios";
import { BASEURL } from "./url";

// 토큰이 필요한 axios 인스턴스
const withTokenInstance = axios.create({
    baseURL:BASEURL
});

// 토큰이 필요없는 axios 인스턴스
const withNotTokenInstance = axios.create({
    baseURL:BASEURL
});

// 요청 인터셉터
withTokenInstance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `TOKEN`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

// 저는 레스트풀 하지 못한 사람입니다
export const wTokenAXIOS = (url,data) => {
    if(!sessionStorage.getItem('userId')) {
        alert('재 로그인 부탁드립니다.');
        sessionStorage.setItem('userId','');
        location.href = 'http://localhost:3000/goLogin/login';
        return false;
    } else {
        return withTokenInstance.post(url, data);
    }
};

// 저는 레스트풀 하지 못한 사람입니다22
export const wnTokenAXIOS = (url,data) => {
    return withNotTokenInstance.post(url, data);
};