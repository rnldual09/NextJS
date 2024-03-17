import PostCompo from "./postCompo";

function MainPostList(props) {
    
    const { list, text, onClickHandler } = props;

    return (
        <div style={{padding:10, marginBlock:15, textAlign:'left'}}>
            {text}
            {list.length != 0 ? (
                <>
                    {list.map((item, index) => {
                        return (
                            <div key={index}>
                                <PostCompo
                                    postId={item.postId}
                                    userId={item.userId}
                                    createAt={item.createAt}
                                    title={item.title}
                                    viewCount={item.viewCount}
                                    commentCnt={item.commentCnt}
                                    categoryNm={item.categoryNm}
                                    onClickHandler={onClickHandler}
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
    )
}

export default MainPostList;