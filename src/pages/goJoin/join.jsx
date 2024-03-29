import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import ErrText from "@/component/common/errText";
import TextInp from "@/component/common/textInp";
import Btn from "@/component/common/btn";
import Header from "@/component/layout/header";

import { wnTokenAXIOS } from "@/util/axios";
import { CHKDUPIDURL, JOINURL } from "@/util/url";

function Join() {

    const router = useRouter();
    // 로그인데이터
    const [loginData, setLoginData] = useState({'userId':'','fpw':'','spw':'','biography':''});
    // 에러상태 및 에러텍스트
    const [errData, setErrData] = useState({'text':'','isErr':false});  /* 질문. 초기값을 넣어주는게 맞는건가요? */
    // 아이디확인 여부
    const [DupIdData, setDupIdData] = useState({'isCheckDupId':false,'isDup':true});
    
    // 아이디 변경시 아이디확인 여부 초기화
    useEffect(() => {
        setDupIdData({'isCheckDupId':false,'isDup':true});
    },[loginData.userId])

    // input 값 변경시
    const onChangeHandler = (e) => {
        setErrData({'text':'','isErr':false});
        setLoginData({...loginData, [e.target.name]:e.target.value});
    };

    // 아이디 중복확인
    const checkDupId = async () => {

        if(!loginData.userId.trim()) {
            setErrData({'text':'아이디를 입력해주세요.','isErr':true});
        } else {

            const response = await wnTokenAXIOS(CHKDUPIDURL,loginData);
        
            if(response.data.cnt == 0) {
                alert('사용가능한 아이디 입니다');
                setErrData({'text':'.','isErr':false});
                setDupIdData({'isCheckDupId':true,'isDup':false});
            } else {
                setErrData({'text':'이미 가입된 아이디입니다.','isErr':true});
                setDupIdData({'isCheckDupId':true,'isDup':true});
            }
        }
    };

    // 회원가입
    const goJoin = async () => {
        
        if(validation()) {

            const data = {
                'userId':loginData.userId
                , 'userPw':loginData.fpw
                , 'biography':loginData.biography
            };

            const response = await wnTokenAXIOS(JOINURL,data);

            if(response.data.cnt > 0) {
                alert('회원가입 되었습니다.');
                router.push(`/goLogin/login`);
            } else {
                alert('회원가입 실패 관리자에게 문의하세요');
            }            
        }
    };

    // 회원가입 유효성
    const validation = () => {
        
        if(!loginData.userId.trim()) {
            setErrData({'text':'아이디를 입력해주세요.','isErr':true});
        } else if(!DupIdData.isCheckDupId) {
            setErrData({'text':'아이디 중복여부를 확인해주세요','isErr':true});
        } else if(DupIdData.isDup) {
            setErrData({'text':'중복된 아이디로 회원가입 불가합니다.','isErr':true});
        } else if(!loginData.fpw.trim()) {
            setErrData({'text':'비밀번호를 입력해주세요.','isErr':true});
        } else if(!loginData.spw.trim()) {
            setErrData({'text':'비밀번호를 한번 더 입력해주세요.','isErr':true});
        } else if(loginData.fpw.trim() != loginData.spw.trim()) {
            setErrData({'text':'비밀번호가 일치하지 않습니다.','isErr':true});
        } else if(!loginData.biography.trim()) {
            setErrData({'text':'자기소개를 입력 해주세요','isErr':true});
        } else {
            return true;
        }

        return false;
    };

    return (
        <>
            <Header />
            <div style={{textAlign:'center', marginTop:200}}>
                <h1>회원가입</h1>
                <h4>로그인화면과 비슷해 보이신다면 착각이 맞습니다.</h4>
                <h3 style={{marginTop:30}}>회원가입, 근데 이제 정규식이없는</h3>
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
                        name='fpw'
                        onChangeHandler={onChangeHandler}
                    />
                </div>
                <div style={{marginTop:15}}>
                    <TextInp
                        placeholder='비밀번호확인'
                        type='password'
                        name='spw'
                        onChangeHandler={onChangeHandler}
                    />
                </div>
                <div style={{marginTop:15}}>
                    <TextInp
                        placeholder='자기소개'
                        type='text'
                        name='biography'
                        onChangeHandler={onChangeHandler}
                    />
                </div>
                <ErrText
                    isErr={errData.isErr}
                    text={errData.text}
                />
                <div style={{marginTop:15}}>
                    <Btn
                        text='아이디확인'
                        onClickHandler={checkDupId}
                    />
                    <Btn
                        text='가입하기'
                        onClickHandler={goJoin}
                    />
                </div>
            </div>
        </>
    );
}

export default Join;