import { useEffect, useState } from "react";

import { wTokenAXIOS } from "@/util/axios";
import { POSTLISTURL } from "@/util/url";
import { useRouter } from "next/router";
import { ORDR } from "@/util/code";
import Header from "@/component/layout/header";
import Btn from "@/component/common/btn";
import PostCompo from "@/component/common/postCompo";
import Sel from "@/component/common/sel";
import UTILS from "@/util/utl";

function Main() {
    
    const router = useRouter();
    // 게시글 리스트
    const [postList, setPostList] = useState([]);
    // 코드 리스트(정렬)
    const [codeList, setCodeList] = useState([]);
    // 정렬타입
    const [orderType, setOrderType] = useState('');

    useEffect(() => {
        getCodeList();
    },[]);

    // 정렬 바뀔때마다 리스트 호출
    useEffect(() => {
        if(orderType) {
            getPostList();
        }
    },[orderType]);

    // 정렬 코드 리스트 가져오기
    const getCodeList = async () => {
        const tempCodeList = await UTILS.getCodeList(ORDR);
        setOrderType(tempCodeList[0].code);
        setCodeList(tempCodeList);
    };

    const getPostList = async () => {
        const response = await wTokenAXIOS(POSTLISTURL,{'orderType':orderType});
        setPostList(response.data.postList);
    };

    // selectbox 변경 시
    const selOnChangeHandler = (e) => {
        setOrderType(e.target.value);
    };

    return (
        <>
            <Header />
            <div style={{textAlign:'center', marginTop:30}}>
                <div style={{textAlign:'right'}}>
                    <Btn
                        text='글작성'
                        onClickHandler={() => router.push({pathname:`/goPostEdit/postEdit`})}
                    />
                </div>
                <div style={{padding:10, marginBlock:10, textAlign:'left'}}>
                    하이라이트 게시글
                    <div
                        style={{border:'solid 1px black', textAlign:'left', padding:8, marginBlock:5}}
                    >
                        <span>작성자 : rnldual09</span>
                        <span> | 작성일자 : 2024.03.15</span>
                        <span style={{marginLeft:20}}>제목dddddd</span>
                    </div>
                </div>                
                <div style={{padding:10, marginBlock:15, textAlign:'left'}}>
                    전체 게시글                    
                    <Sel
                        codeList={codeList}
                        onChangeHandler={selOnChangeHandler}
                        wid={300}
                    />
                    {postList.length != 0 ? (
                        <>
                            {postList.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <PostCompo
                                            userId={item.userId}
                                            createAt={item.createAt}
                                            title={item.title}
                                            viewCount={item.viewCount}
                                        />
                                    </div>
                                );                                
                            })}
                        </>
                    ) : (
                        <div style={{marginTop:20}}>
                            <h3>등록된 게시글이 없습니다</h3>
                        </div>
                    )}
                    
                </div>
            </div>
        </>        
    );
}

export default Main;