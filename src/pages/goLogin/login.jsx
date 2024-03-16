import { useState } from "react";
import { useRouter } from "next/router";

import ErrText from "@/component/common/errText";
import TextInp from "@/component/common/textInp";
import Btn from "@/component/common/btn";
import Header from "@/component/layout/header";

import { wnTokenAXIOS } from "@/util/axios";
import { LOGINURL } from "@/util/url";

function Login() {
    
    const router = useRouter();
    // 로그인데이터
    const [loginData, setLoginData] = useState({'userId':'','userPw':''});
    // 에러상태 및 에러텍스트
    const [errData, setErrData] = useState({'text':'','isErr':false});

    // input 값 변경시
    const onChangeHandler = (e) => {
        setErrData({'text':'','isErr':false});
        setLoginData({...loginData, [e.target.name]:e.target.value});
    };

    // 회원가입
    const fn_Join = () => {
        router.push(`/goJoin/join`);
    };

    // 로그인
    const fn_Login = async () => {
        
        if(validation()) {

            const response = await wnTokenAXIOS(LOGINURL,loginData);

            if(response.data.userId) {
                sessionStorage.setItem('userId',response.data.userId)
                router.push(`/goMain/main`);
            } else {
                setErrData({'text':'계정정보를 확인해주세요.','isErr':true});
            }
        }        
    };

    // 로그인유효성
    const validation = () => {
        
        if(!loginData.userId.trim()) {
            setErrData({'text':'아이디를 입력해주세요.','isErr':true});
        } else if(!loginData.userPw.trim()) {
            setErrData({'text':'비밀번호를 입력해주세요.','isErr':true});
        } else {
            return true;
        }

        return false;
    };

    return (
        <>
            <Header />
            <div style={{textAlign:'center', marginTop:200}}>
                <h1>디자인 포기한 블로그</h1>
                <h4>기능에만 집중한, 내 눈에만 예쁜, 포기하면 편한</h4>
                <h3 style={{marginTop:30}}>로그인</h3>
                <div style={{marginTop:15}}>
                    <TextInp
                        placeholder='아이디'
                        type='text'
                        name='userId'
                        onChangeHandler={onChangeHandler}
                    />
                </div>
                <div style={{marginTop:15}}>
                    <TextInp
                        placeholder='비밀번호'
                        type='password'
                        name='userPw'
                        onChangeHandler={onChangeHandler}
                    />
                </div>
                <ErrText
                    isErr={errData.isErr}
                    text={errData.text}
                />
                <div style={{marginTop:15}}>
                    <Btn
                        text='회원가입'
                        onClickHandler={fn_Join}
                    />
                    <Btn
                        text='로그인'
                        onClickHandler={fn_Login}
                    />
                </div>
            </div>
        </>
    );
}

export default Login;