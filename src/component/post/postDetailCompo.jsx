function PostDetailCompo(props) {

    const { info, text } = props;

    return (
        <div style={{marginTop:5, textAlign:'left', padding:10, borderBottom:'solid 1px black'}}>
            <div>
                * {info}
            </div>
            {text}
        </div>
    );
}

export default PostDetailCompo;