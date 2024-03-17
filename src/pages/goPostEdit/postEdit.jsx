import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { CATE } from "@/util/code";
import UTILS from "@/util/utl";
import Header from "@/component/layout/header";
import Btn from "@/component/common/btn";
import TextInp from "@/component/common/textInp";
import Sel from "@/component/common/sel";
import { wTokenAXIOS } from "@/util/axios";
import { POSTEDITURL, POSTLISTURL } from "@/util/url";

function PostEdit() {
    
    const router = useRouter();
    // 게시글데이터
    const [postData, setPostData] = useState({'title':'','content':'','category':'','postId':''});
    // 코드리스트(카테고리)
    const [codeList, setCodeList] = useState([]);

    useEffect(() => {
        if(router.query.postId) {
            setPostData({...postData, 'postId':router.query.postId});
            getPost();
        }
    },[router.isReady]);

    /* 질문 : useEffect에는 async안되는거같아서 아래 함수로 따로 빼서 처리했는데 맞는건가요? */
    useEffect(() => {
        getCodeList();
    },[]);

    // 카테고리 코드리스트 가져오기
    const getCodeList = async () => {
        const tempCodeList = await UTILS.getCodeList(CATE);        
        setCodeList(tempCodeList);
    };

    // input / selectbox 값 변경시
    const onChangeHandler = (e) => {
        setPostData({...postData, [e.target.name]:e.target.value});
    };

    // 게시글 등록 혹은 수정
    const editPost = async () => {
        
        if(validation()) {
            
            const data = {...postData, 'userId':UTILS.getSessionId()};
            const response = await wTokenAXIOS(POSTEDITURL, data);

            if(response.data.cnt > 0) {
                
                if(postData.postId) {
                    alert('게시글이 수정 되었습니다.');
                } else {
                    alert('게시글이 등록 되었습니다.');
                }
                
                router.push(`/goMain/main`);
            }
        }
    };

    const getPost = async () => {
        const response = await wTokenAXIOS(POSTLISTURL, {'postId':router.query.postId});
        const tempPostData = response.data.postList[0];
        
        if(tempPostData.userId == UTILS.getSessionId()) {
            document.getElementsByName('title')[0].value = tempPostData.title;
            document.getElementsByName('content')[0].value = tempPostData.content;
        } else {
            alert('다른사람의 글은 수정할 수 없습니다.');
            router.push(`/goMain/main`);
        }
    };

    const validation = () => {

        if(!postData.title.trim()) {
            alert('게시글 제목을 입력해주세요.');
        } else if(!postData.content.trim()) {
            alert('게시글 내용을 입력해주세요.');
        } else if(!postData.category) {
            alert('게시글 카테고리를 선택해주세요.');
        } else {
            return true;
        }

        return false;
    };

    return (
        <>
            <Header />
            <div style={{textAlign:'center', marginTop:100}}>
                <h1>게시글 {postData.postId ? '수정' : '작성'}</h1>
                <div style={{marginTop:50}}>
                    <TextInp
                        placeholder='게시글제목'
                        type='text'
                        name='title'
                        onChangeHandler={onChangeHandler}
                        wid={500}
                    />
                </div>
                <div style={{marginTop:15}}>
                    <TextInp
                        placeholder='게시글내용'
                        type='text'
                        name='content'
                        onChangeHandler={onChangeHandler}
                        wid={500}
                        hei={200}
                    />
                </div>
                <div style={{marginTop:15}}>
                    <Sel
                        codeList={codeList}
                        name='category'
                        onChangeHandler={onChangeHandler}
                        wid={510}
                        fstOption='-- 카테고리 선택 --'
                    />
                </div>
                <div style={{marginTop:15}}>
                    <Btn
                        text={postData.postId ? '수정' : '작성'}
                        onClickHandler={editPost}
                        wid={510}
                    />
                </div>
            </div>
        </>
    );
}

export default PostEdit;