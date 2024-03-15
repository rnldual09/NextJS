function ErrText(props) {

    const { isErr, text } = props;

    return (
        <>
            {isErr ? (
                <h5 style={{marginTop:20}}>
                    {text}
                </h5>
            ) : null}
        </>
    );
}

export default ErrText;