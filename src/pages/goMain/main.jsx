import { useEffect, useState } from "react";

import { wTokenAXIOS } from "@/util/axios";
import { POSTLISTURL, VIEWCOUNTUPURL, HIGHPOSTLISTURL } from "@/util/url";
import { useRouter } from "next/router";
import { ORDR, CATE } from "@/util/code";
import Header from "@/component/layout/header";
import Btn from "@/component/common/btn";
import MainPostList from "@/component/post/mainPostList";
import Sel from "@/component/common/sel";
import UTILS from "@/util/utl";

function Main() {
    
    const router = useRouter();
    // 게시글 리스트
    const [postList, setPostList] = useState([]);
    // 하이라이트 게시글 리스트 - 댓글
    const [highCommentPostList, setHighCommentPostList] = useState([]);
    // 하이라이트 게시글 리스트 - 조회수
    const [highViewCountPostList, setHighViewCountPostList] = useState([]);
    // 코드 리스트(정렬)
    const [ordrList, setOrdrList] = useState([]);
    // 정렬타입
    const [orderType, setOrderType] = useState('');
    // 코드 리스트(카테고리)
    const [cateList, setCateList] = useState([]);
    // 카테고리
    const [category, setCategory] = useState('');

    useEffect(() => {
        getCodeList();
        getHighPostList();
    },[]);

    // 정렬 바뀔때마다 리스트 호출
    useEffect(() => {
        if(orderType) {
            getPostList();
        }
    },[orderType, category]);

    // 코드 리스트 가져오기
    const getCodeList = async () => {
        const tempOrdrList = await UTILS.getCodeList(ORDR);
        setOrderType(tempOrdrList[0].code);
        setOrdrList(tempOrdrList);

        const tempCateList = await UTILS.getCodeList(CATE);
        setCateList(tempCateList);
    };

    // 게시글 리스트
    const getPostList = async () => {
        const response = await wTokenAXIOS(POSTLISTURL, {'orderType':orderType,'category':category});
        setPostList(response.data.postList);
    };

    // 하이라이트 게시글 리스트
    const getHighPostList = async () => {
        const response = await wTokenAXIOS(HIGHPOSTLISTURL,{});
        setHighCommentPostList(response.data.highCommentPostList)
        setHighViewCountPostList(response.data.highViewCountPostList)
    };

    // selectbox 변경 시
    const selOrdrOnChangeHandler = (e) => {
        setOrderType(e.target.value);
    };

    const selCateOnChangeHandler = (e) => {
        setCategory(e.target.value);
    };

    // 해당게시글 조회수 +1 및 게시글 상세페이지 이동
    const goPostDetail = async (postId) => {
        
        const response = await wTokenAXIOS(VIEWCOUNTUPURL, {'postId':postId});

        if(response.data.cnt > 0) {
            router.push({pathname:`/goPostDetail/postDetail`,query:{'postId':postId}});
        }
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
                <MainPostList
                    list={highCommentPostList}
                    text='댓글많은 게시글'
                    onClickHandler={goPostDetail}
                />
                <MainPostList
                    list={highViewCountPostList}
                    text='조회수많은 게시글'
                    onClickHandler={goPostDetail}
                />
                <div>
                    <h4>정렬</h4>
                    <Sel
                        codeList={ordrList}
                        onChangeHandler={selOrdrOnChangeHandler}
                        wid={300}
                    />
                    <h4>카테고리</h4>
                    <Sel
                        codeList={cateList}
                        onChangeHandler={selCateOnChangeHandler}
                        wid={300}
                        fstOption={'---    전체    ---'}
                    />                    
                </div>
                <MainPostList
                    list={postList}
                    text='전체게시글'
                    onClickHandler={goPostDetail}
                />
            </div>
        </>        
    );
}

export default Main;