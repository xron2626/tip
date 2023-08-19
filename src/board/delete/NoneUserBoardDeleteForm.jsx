import React, { useRef,useEffect, useState } from 'react';

function NoneUserBoardDeleteForm() {
    const [password, setPassword] = useState('비밀번호');
    let domainUri = "http://localhost:8080"
    // let domainUri = "https://port-0-changeproject-19k5ygi525lcw5y5kb.gksl2.cloudtype.app";

    function addDeleteLogic() {
        deleteBoard().then(function(response) {
            return response.text();
        }).then(function(response) {
            if(response==="password가 틀렸습니다") {
                alert("password가 다릅니다");
                return;
            }
            getView();
        })
    }
    function deleteBoard() {
        let boardId = window.location.href.split("delete/")[1];
        let requestData = {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "password": password,
                "boardId": boardId
            }),
            
        }
        return fetch(domainUri+"/board/none-user",requestData);
    }
    function getView() {
        location.href = domainUri+"?pageQuantity=1&boardQuantity=20";
    }
    return (
        <div>
            <input type="text" defaultValue={password} id="password"/>
            <input type="button" value="삭제" id="deleteButton"/>
        </div>
    )
}
export default NoneUserBoardDeleteForm;