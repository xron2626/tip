
import styles from "./Search.module.css";

function Search() {
    function moveTistory() {
        window.location.href="https://hellocoding.tistory.com/";
    }    
    function moveAlarm() {
        window.location.href="/alarm";
    }
 return(
        <div>
            <div className={styles.area21}>
                <input type="button" value="로그인" id={styles.loginBox} className={styles.box} style={{cursor:"pointer"}}
                    onClick={() =>window.location.href ='/login'}/>
                <input type="button" value="회원가입" id={styles.joinBox} className={`${styles.container} ${styles.box}`}  
                    style={{cursor:"pointer"}}
                    onClick={() =>window.location.href ='/join'}/>
                <img src="/image/homeicone8.png" width="80px" height="40px"alt="My github" id={styles.home}
                    className={styles.container} style={{cursor:"pointer"}} />
                <input type="button" value="글쓰기" id={styles.writeBox} className={styles.box} style={{cursor:"pointer"}}
                    onClick={() =>window.location.href ='/write'}/>
                <input type="button" value="글 조회" id={styles.readBox} className={styles.box} style={{cursor:"pointer"}}
                    onClick={() =>window.location.href ='/?pageQuantity=1&boardQuantity=20'} />
            </div>
            <div className={styles.marginBox}>
                <a href="https://github.com/xron2929">
                    <img src="/image/github2.png" width="30px" alt="My github" id={styles.github} className={styles.container} />
                </a>
                <a href="https://hellocoding.tistory.com/">
                    <img src="/image/tistory2.png" width="40px" height="40px"alt="My github" id={styles.tistory} className={styles.container}  onClick={moveTistory} />
                </a>
                <a>
                    <img src="/image/email2.png" width="30px" height="35px"alt="My github" id={styles.email} className={styles.container} 
                    style={{cursor:"pointer"}} onClick={moveAlarm}/>
                </a>
            </div>
        <section id={styles.section}>
            <div className={styles.bodyHeader}>
                <form action="/board/search" accept-charset="utf-8" method="get" id={styles.inline} >
                    <input type="text" name="pageQuantity" value="1" hidden />
                    <input type="text" name="boardQuantity" value="20" hidden />
                    <input type="text" name="keyword" value="검색" id={styles.textarea} maxlength="255" onClick={searchScript} />
                    <input type="submit" id={styles.searchButton} value="검색" style={{cursor:"pointer"}} />
                </form>
                <form action="http://localhost:8080/edit" accept-charset="utf-8" method="get" id={styles.inline}>
                    <input type="submit" id={styles.writeButton} value="글쓰기" style={{cursor:"pointer"}} />
                </form>
            </div>
        </section>
        <aside id={styles.aside}>
            <img id={styles.advertisement} src="/image/inflearn.png" />
            <img id={styles.exit} src="/image/endend.png" style={{cursor:hand}} onclick={eraseAdvertisement} />
        </aside>
        <footer id={styles.footer}>
            <h2 id={styles.footerText}>간단한 게시판 만들기 - 정재광</h2>
        </footer>
    </div>
    )
}
export default Search;