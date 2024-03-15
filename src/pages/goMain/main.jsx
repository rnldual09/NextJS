import Header from "@/component/layout/header";

function Main() {
    
    return (
        <>
            <Header />
            <div style={{textAlign:'center', marginTop:30}}>
                <div style={{padding:10, marginBlock:10, textAlign:'left'}}>
                    하이라이트 게시글
                    <div
                        style={{border:'solid 1px black', textAlign:'left', padding:8, marginBlock:5}}
                    >
                        <span>작성자 : rnldual09</span>
                        <span> | 작성일자 : 2024.03.15</span>
                        <span style={{marginLeft:20}}>제목dddddd</span>
                    </div>
                </div>                
                <div style={{padding:10, marginBlock:15, textAlign:'left'}}>
                    전체 게시글                    
                    <select
                        style={{width:200, height:30, marginLeft:10}}
                    >
                        <option>dd</option>
                    </select>                
                    <div style={{border:'solid 1px black', textAlign:'left', padding:8, marginBlock:5}}>제목</div>
                    <div style={{border:'solid 1px black', textAlign:'left', padding:8, marginBlock:5}}>제목</div>
                    <div style={{border:'solid 1px black', textAlign:'left', padding:8, marginBlock:5}}>제목</div>
                    <div style={{border:'solid 1px black', textAlign:'left', padding:8, marginBlock:5}}>제목</div>
                </div>
            </div>
        </>        
    );
}

export default Main;