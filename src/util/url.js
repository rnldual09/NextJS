/*************************************************************************************
 * base url
 *************************************************************************************/
export const BASEURL = 'http://localhost:8080/';

/*************************************************************************************
 * 회원
 *************************************************************************************/
export const CHKDUPIDURL = 'login/getDupCnt.do'; // 아이디중복체크
export const JOINURL = 'login/joinUser.do';      // 회원가입
export const LOGINURL = 'login/getUserId.do';    // 로그인

/*************************************************************************************
 * 게시글
 *************************************************************************************/
export const POSTLISTURL = 'post/getPostList.do';           // 게시글리스트
export const HIGHPOSTLISTURL = 'post/getHighPostList.do';   // 하이라이트 게시글리스트
export const POSTEDITURL = 'post/editPost.do';              // 게시글 등록 및 수정
export const VIEWCOUNTUPURL = 'post/viewCountUp.do';        // 게시글 조회수 업
export const POSTINFOURL = 'post/getPostInfo.do';           // 게시글 정보
export const POSTDElURL = 'post/delPost.do';                // 게시글 삭제

/*************************************************************************************
 * 댓글
 *************************************************************************************/
export const COMMENTLISTURL = 'comment/getCommentList.do';  // 댓글리스트
export const COMMENTEDITURL = 'comment/editComment.do';     // 댓글 입력

/*************************************************************************************
 * 코드
 *************************************************************************************/
export const CODELISTURL = 'code/getCodeList.do'; // 코드리스트