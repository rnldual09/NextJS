import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UTILS from "@/util/utl";
import Btn from "../common/btn";

function Header() {

    const router = useRouter();
    // 로그인 확인용
    const [isLogin, setIsLogin] = useState(false);
    const [ssUserId, setSsUserId] = useState('');

    useEffect(() => {
        if(UTILS.getIsLogin()) {
            setIsLogin(true);
            setSsUserId(sessionStorage.getItem('userId') + '님 반갑습니다.');
        }
    },[]);

    return (
        <div style={{border:'solid 1px black', padding:25, textAlign:'right'}}>
            {isLogin ? (                
                <div>
                    <div style={{marginBottom:15}}>
                        {ssUserId}
                    </div>                    
                    <Btn
                        text='글작성'
                        onClickHandler={() => router.push(`/goMain/main`)}
                    />
                    <Btn
                        text='홈'
                        onClickHandler={() => router.push(`/goMain/main`)}
                    />
                </div>
            ) : (
                <div>
                    <Btn
                        text='홈'
                        onClickHandler={() => router.push(`/goLogin/login`)}
                    />                        
                </div>    
            )}            
        </div>
    )
}

export default Header;