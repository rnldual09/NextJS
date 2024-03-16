function Sel(props) {

    const { codeList, name, onChangeHandler, wid, fstOption } = props;

    return (
        <div>
            <select
                style={{width:wid ? wid : 100, height:30}}
                name={name}
                onChange={onChangeHandler}
            >
                {/* 처음으로 들어갈 옵션명 */}
                {fstOption ? (
                    <option
                        value={''}
                    >
                        {fstOption}
                    </option>
                ) : null}

                {codeList.map((item, index) => {
                    return (
                        <option
                            key={index}
                            value={item.code}
                        >
                            {item.codeNm}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default Sel;