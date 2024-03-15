function Btn(props) {

    const { text, onClickHandler } = props;

    return (
        <button
            style={{width:120, height:40, margin:'0px 5px', backgroundColor:'#fff', border:'solid 1px black'}}
            onClick={onClickHandler}
        >
            {text}
        </button>
    );
}

export default Btn;