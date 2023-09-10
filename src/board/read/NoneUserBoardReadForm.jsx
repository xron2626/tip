

import styles from "./NoneUserBoardReadForm.module.css"
import React, { useRef,useEffect, useState } from 'react';

function NoneUserBoardReadForm({sessionId,setSessionId,boardWriterName,likeCount,setLikeCount,disLikeCount,setDisLikeCount,boardContent,stompClient,commentList}) {
    

    
    const [text, setText] = useState('이름'); // 텍스트 상태 설정
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const commentContentRef = useRef(null);
    

    
    let boardId;
    


    
    
    // let domainUri = "http://27.96.131.120:8080";
    let domainUri = process.env.REACT_APP_API_URL;
    // let domainUri = "https://port-0-java-springboot-17xqnr2algm9dni8.sel3.cloudtype.app";
    
    

    const handleTextChange = (e) => {
      setText(e.target.value); // 텍스트 변경 시 상태 업데이트
    };
    function getBoardId() {
        boardId = window.location.href.split("/boards/")[1];
        return boardId;
    }
    function isUser(commentWriter) {
        alert("isJustUser "+boardWriterName.includes("_"));
        if(boardWriterName.includes("_")) {
            return true;
        }
        alert("it is not Just User");
        return isAdmin(commentWriter);
    }
    function isAdmin(userId) {
        
        let data= {
            method: "GET",
            credentials: "include"
        };
        fetch(domainUri+"/check/admin/"+userId,data).then(function (res) {
            alert("??");
            return res.text();
        }).then(function(res){
            alert("isAdmin: "+res);
            if(res==true) {
                return true;
            }
            return false;
        })
    }
    function setAlarmData(boardId,summaryCommentContent,commentWriter) {

        if (isUser(commentWriter)) {
            return setCommentUserAlarmData(boardId,summaryCommentContent,commentWriter);
        }
        else {
            return setCommentNoneUserAlarmData(boardId,summaryCommentContent,commentWriter);
        }
    
    }   

    // 게시글 작성자가 비유저인 경우
    function setCommentNoneUserAlarmData(boardId,summaryCommentContent,commentWriter) {
        let alarmData = {
            method: "POST",
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "boardId": boardId,
                "summaryCommentContent": summaryCommentContent,
                "userName" : commentWriter,
                "boardWriterId":sessionId,
                "isVisited" : false,
            }),
            credentials: "include"
        }
        return fetch(domainUri+"/alarm/none-user",alarmData).then(function(response) {
            return response.text();
        })
    }
    // 게시글 작성자가 유저인 경우
    function setCommentUserAlarmData(boardId,summaryCommentContent,commentWriter) {
        let alarmData = {
            method: "POST",
            headers: {
                Accept: "application/json",
                // "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "boardId": boardId,
                "boardWriterName" : boardWriterName,
                "summaryCommentContent": summaryCommentContent,
                "commentWriter" : commentWriter,
                "isVisited" : false
            }),
            credentials: "include"
        }
        return fetch(domainUri+"/alarm/user",alarmData).then(function(response) {
            return response.text();
        })
    }

    function sendMessage(boardId,summaryCommentContent,commentWriter) {

        let data = {
            message:"update"
        }
        alert("stomp send sessionId = "+sessionId);
        stompClient.send("/app/send-message-to-user", {"sessionId":sessionId},JSON.stringify(data));

        return setAlarmData(boardId,summaryCommentContent,commentWriter)
        .then(function (response) {
            window.location.href = window.location.href
        })

    }
    const commentSubmit = () => {
        boardId = getBoardId();
        let url = domainUri+"/comment/"+boardId;
        let data = {
            method: "POST",
            headers: {
                  // Accept: "application/json",
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({
            "userId":usernameRef.current.textContent,
            "password":passwordRef.current.value,
            "content":commentContentRef.current.value
        }),
        credentials: "include"

    }

    fetch(url,data) .then(function(response) {
        if (!response.ok) {
          console.log("Network response was not ok");
        }
        return response.text();
      }).then(function(data) {
        //"http://localhost:8080/boards"+boardId;
        // 알림 서비스 추가
        
    }).then(function() {
        return sendMessage(boardId,commentContentRef.current.value,usernameRef.current.textContent);
    });
    // console.log(isAddCommentClick);
    // return isAddCommentClick;
    };

    
    function resize() {
        commentContentRef.current.style.height = "1px";
        commentContentRef.current.style.height = (12+commentContentRef.current.scrollHeight)+"px";
    }
  



function updateLikeCount() {
    let url = domainUri+"/board/like";
    boardId = getBoardId();
    let data ={
        method: "PUT",
        headers: {
            // Accept: "application/json",
            // "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "joinStatusId": boardId,
        }),
        credentials: "include"
    }
    fetch(url,data).then(function(response) {
        return response.text();
    }).then(function(response) {
        setLikeCount(response)
    })
}

function updateDisLikeCount() {
    boardId = getBoardId();
    let url = domainUri+"/board/dislike";

    let data ={
        method: "PUT",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "joinStatusId": boardId
        })
        ,credentials: "include"
    }
    fetch(url,data).then(function(response) {
        return response.text();
    }).then(function(response) {
        setDisLikeCount(response)
    })
}

function editBoard() {
    let param = window.location.href.split("boards/")[1];
    window.location.href="/boards/edit/"+param;
}
function deleteBoard() {
    let boardId = window.location.href.split("boards/")[1];
    window.location.href=domainUri+"/board/none-user/delete/"+boardId;
}

    return (
        <div>
          
            <div id={styles.background}>
                <div style={{display: "flex",justifyContent: "space-around"}}>
                    <div id={styles.top}>
                        <div id={styles.childTitle}>제목</div>
                    </div>
                </div>
            

                <div style={{display: "flex" , justifyContent: "space-evenly"}}>
                    <section style={{width: "90%"}} id={styles.section} >
                        <div id={styles.author}>글쓴이</div>
                        <div dangerouslySetInnerHTML={{__html:boardContent}}></div>
                    </section>
                </div>
                <div id={styles.boardTool}>
                    <div id={styles.feedback}>
                        <div id={styles.up} onClick={updateLikeCount}>
                            <div>좋아요</div>
                            <div id={styles.likeCount}>{likeCount}</div>
                        </div>
                        <div id={styles.down} onClick={updateDisLikeCount}>
                            <div>싫어요</div>
                            <div id={styles.disLikeCount}>{disLikeCount}</div>
                        </div>
                    </div>
                    <div id={styles.manage}>
                        <div id={styles.edit} onClick={editBoard}>수정</div>
                        <div id={styles.delete} onClick={deleteBoard}>삭제</div>
                    </div>
                </div>
            </div>
            <div id={styles.comment}>댓글</div>
            <hr className={styles.x}/>
            <div id={styles.commentGroup}>
            {commentList.map((item, index) => (
                <div key = {index} id={"comment"+{index}}>
                    <div className={styles.parentReadCommentArea}>
                        <div className={styles.parentReadCommentName}>{item.username}</div>
                    </div>
                    <div className={styles.parentWriteComment} >{item.content}</div>
                </div>
            ))}
            </div>
            <div id={styles.flex}>
                <div id={styles.commentWriteNameArea1}>
                    <div contentEditable="true" onInput={handleTextChange} suppressContentEditableWarning className={styles.commentWrite1} 
                    id={styles.commentWriteName1} ref={usernameRef}>{text}</div>
                </div>
                <div id={styles.commentWritePasswordArea}>
                    <input type="password" className={styles.commentWrite1} defaultValue="비밀번호" id={styles.commentWritePassword1} 
                    ref={passwordRef} />
                </div>
            </div>
            <textarea className={styles.parentWriteComment}  id={styles.parentWriteComment1} style={{height: "335px"}}
            ref={commentContentRef} onKeyUp={resize} onKeyDown={resize} ></textarea>
            <div className={styles.parentCommentSubmitArea} id={styles.parentWriteCommentSubmit1}>
                <div className={styles.parentCommentSubmit} onClick={commentSubmit} >전송</div>
            </div>
            <div id={styles.white}></div>  
        </div>
    )
}
export default NoneUserBoardReadForm;