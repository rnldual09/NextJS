function Btn(props) {

    const { text, onClickHandler, wid } = props;

    return (
        <button
            onClick={onClickHandler}
            style={{
                width:wid ? wid : 120
                , height:40
                , margin:'0px 5px'
                , backgroundColor:'#fff'
                , border:'solid 1px black'}}
        >
            {text}
        </button>
    );
}

export default Btn;