function PostCompo(props) {

    const { postId, userId, createAt, title, viewCount, categoryNm, commentCnt, onClickHandler } = props;

    return (
        <div
            style={{border:'solid 1px black', textAlign:'left', padding:8, marginBlock:5}}
            onClick={() => onClickHandler(postId)}
        >
            <span style={{paddingInline:10}}>작성자 : {userId}</span>
            <span style={{paddingInline:10}}>작성일자 : {createAt}</span>
            <span style={{paddingInline:10}}>조회수 : {viewCount}</span>
            <span style={{paddingInline:10}}>카테고리명 : {categoryNm}</span>
            <span style={{paddingInline:10}}>댓글수 : {commentCnt}</span>            
            <span style={{paddingInline:10}}>{title}</span>
        </div>
    );
}

export default PostCompo;