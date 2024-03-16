function TextInp(props) {
    
    const { placeholder, type, name, onChangeHandler, wid, hei } = props;

    return (
        <input
            placeholder={placeholder}
            type={type}
            name={name}
            onChange={(e) => onChangeHandler(e)}
            style={{
                width:wid ? wid : 250
                , height:hei ? hei : 30
            }}
        />
    );
}

export default TextInp;

/*
    질문1. type까지 props로 넘겼는데 맞는건지 잘 모르겠네요..
    질문2. props로 받는 변수명 규약같은게 있을까요
*/