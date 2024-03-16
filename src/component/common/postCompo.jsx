function PostCompo(props) {

    const { userId, createAt, title, viewCount } = props;

    return (
        <div
            style={{border:'solid 1px black', textAlign:'left', padding:8, marginBlock:5}}
        >
            <span style={{paddingInline:10}}>작성자 : {userId}</span>
            <span style={{paddingInline:10}}>작성일자 : {createAt}</span>
            <span style={{paddingInline:10}}>조회수 : {viewCount}</span>
            <span style={{paddingInline:10}}>{title}</span>
        </div>
    );
}

export default PostCompo;