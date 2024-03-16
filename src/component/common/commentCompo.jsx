function CommentCompo(props) {

    const { createAt, userId, comment } = props;

    return (
        <>
            <span style={{paddingInline:10}}>작성일자 : {createAt}</span>
            <span style={{paddingInline:10}}>작성자 : {userId}</span>
            <span style={{paddingInline:10}}>{comment}</span>
        </>
    );
}

export default CommentCompo;