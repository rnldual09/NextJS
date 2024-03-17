import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/component/layout/header";
import { POSTINFOURL, COMMENTLISTURL, COMMENTEDITURL, POSTDElURL } from "@/util/url";
import { wTokenAXIOS } from "@/util/axios";
import PostDetailCompo from "@/component/post/postDetailCompo";
import TextInp from "@/component/common/textInp";
import Btn from "@/component/common/btn";
import CommentCompo from "@/component/comment/commentCompo";
import UTILS from "@/util/utl";

function PostDetail() {

    const router = useRouter();
    // 게시글 정보
    const [postInfo, setPostInfo] = useState({});
    // 댓글리스트
    const [commentList, setCommentList] = useState([]);
    // 입력한 댓글데이터
    const [commentData, setCommentData] = useState({'postId':'', 'userId':'', 'parentCommentId':null, 'comment':''});

    useEffect(() => {
        if(router.query.postId) {
            getPostInfo();
            getCommentList();
            setCommentData({...commentData, 'postId':router.query.postId, 'userId':UTILS.getSessionId()});
        }
    },[router.isReady]);

    // 게시글 정보 가져오기
    const getPostInfo = async () => {
        const response = await wTokenAXIOS(POSTINFOURL, {'postId':router.query.postId});
        setPostInfo(response.data.postInfo);
    };

    // 댓글리스트 가져오기
    const getCommentList = async () => {
        const response = await wTokenAXIOS(COMMENTLISTURL, {'postId':router.query.postId});
        setCommentList(response.data.commentList);
    };

    // 댓글 작성시
    const onChangeHandler = (e) => {
        setCommentData({...commentData, [e.target.name]:e.target.value});
    };

    // 댓글 입력
    const editComment = async () => {

        if(!commentData.comment.trim()) {
            alert('댓글을 입력 해주세요');
            return;
        }
        
        const response = await wTokenAXIOS(COMMENTEDITURL, commentData);

        if(response.data.cnt > 0 ) {
            
            if(commentData.parentCommentId) {
                alert('답글이 입력되었습니다.');
            } else {
                alert('댓글이 입력되었습니다.');
            }
            
            // 댓글 입력 후 작성내용 지우기
            setCommentData({...commentData, 'parentCommentId':null, 'comment':''});            
            const commentEle = document.getElementsByName('comment');
            commentEle[0].value = '';
            // 댓글리스트 초기화
            getCommentList();
        }
    };

    // 답글 입력 및 취소
    const editReply = (parentCommentId) => {
        setCommentData({...commentData, 'parentCommentId':parentCommentId});
    };

    // 게시글삭제
    const delPost = async () => {
        
        const response = await wTokenAXIOS(POSTDElURL, {'postId':router.query.postId});
        
        if(response.data.cnt > 0) {
            alert('게시글이 삭제되었습니다');
            router.push(`/goMain/main`);
        }
    };

    return (
        <>
            <Header />
            <div style={{textAlign:'center', marginTop:50}}>
                <h1>게시글 상세페이지</h1>
                {postInfo.userId == UTILS.getSessionId() ? (
                    <div>
                        <Btn
                            text='내 게시글이기에 가능한 삭제'
                            onClickHandler={() => delPost()}
                            wid={300}
                        />
                        <Btn
                            text='내 게시글이기에 가능한 수정'
                            onClickHandler={() => router.push({pathname:`/goPostEdit/postEdit`, query:{'postId':router.query.postId}})}
                            wid={300}
                        />
                    </div>
                ):null}
                <PostDetailCompo
                    info='작성자 / 작성일자 / 조회수'
                    text={postInfo.userId + ' / ' + postInfo.createAt + ' / ' + postInfo.viewCount + '회'}
                />
                <PostDetailCompo
                    info='카테고리'
                    text={postInfo.categoryNm}
                />
                <PostDetailCompo
                    info='제목'
                    text={postInfo.title}
                />
                <PostDetailCompo
                    info='내용'
                    text={postInfo.content}
                />                
            </div>
            <div style={{marginTop:15}}>
                <TextInp
                    placeholder='댓글작성'
                    type='text'
                    name='comment'
                    onChangeHandler={onChangeHandler}
                    wid={1000}
                />
                <Btn
                    text='댓글달기'
                    onClickHandler={editComment}
                />
            </div>
            <div style={{marginTop:15}}>
                {commentData.parentCommentId ? (
                    <div>
                        !!!!! 답글작성중입니다 !!!!!
                        <Btn
                            text='답글취소'
                            onClickHandler={() => editReply(null)}
                            wid={100}
                        />
                    </div>
                ) : (
                    <div>
                        댓글
                    </div>
                )}                
                {commentList.length != 0 ? (
                    <>
                        {commentList.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{marginBlock:5}}
                                >
                                    <Btn
                                        text='답글달기'
                                        onClickHandler={() => editReply(item.commentId)}
                                        wid={100}
                                    />
                                    <CommentCompo
                                        createAt={item.createAt}
                                        userId={item.userId}
                                        comment={item.comment}
                                    />
                                    <div>
                                        {item.childCommentList.map((item2, index2) => {
                                            return (
                                                <div
                                                    key={index2}
                                                    style={{marginBlock:5, marginLeft:50}}
                                                >
                                                    <CommentCompo
                                                        createAt={item2.createAt}
                                                        userId={item2.userId}
                                                        comment={item2.comment}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}  
                    </>
                ) : (
                    <div style={{textAlign:'center',paddingTop:100}}>
                        <h3>
                            아직 작성된 댓글이 없습니다
                        </h3>
                    </div>
                )}
            </div>
        </>
    );
}

export default PostDetail;