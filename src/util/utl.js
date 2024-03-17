import { CODELISTURL } from "./url";
import { wnTokenAXIOS } from "./axios";

// 로그인 여부 판별
const getIsLogin = () => {
    if(sessionStorage.getItem('userId')) {
        return true;
    } else {
        return false;
    }
};

// 코드리스트 가져오기
const getCodeList = async (codeDiv) => {
    const response = await wnTokenAXIOS(CODELISTURL,{'codeDiv':codeDiv});
    return response.data.codeList;
};

// 세션아이디 return
const getSessionId = () => {
    return sessionStorage.getItem('userId')
};

const UTILS = { getIsLogin, getCodeList, getSessionId };

export default UTILS;

/*
    질문1. 이전 소스는 export const getIsLogin 를 하여 사용 시 { getIsLogin } 로 사용하였으나,
    뭔가 화면내부에서 선언한 함수같이 느껴져 불편함을 겪어 UTILS 파일에 속한 함수라는 것을 명확히 보이고자
    export default UTILS; 로 수정하였는데 이게 맞는건지 잘 모르겠습니다 제가 이상한거로 불편해하는건가요 흠
*/