import { useRef,useState,useEffect } from "react";
import NoneUserBoardWriteForm  from "./NoneUserBoardWriteForm";
import UserBoardWriteForm from "./UserBoardWriteForm";

function BoardWriteForm() {
    const [isUserAccount, setIsUserAccount] = useState(null);
    let domainUri = "http://localhost:8080"
    useEffect(() => {
        getUserAccount();
    },[])
    function getUserAccount() {
        let params = {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include' // 이 옵션을 설정해야 쿠키가 요청에 포함됨

        }
        const url = domainUri+"/role";
        return fetch(url, params)
            .then(function (response) {
                if(response.status===500) {
                    throw new Error("데이터 없음");
                }
                if(response.status===404) {
                    throw new Error("클라이언트 데이터에 문제가 있을 수도 있습니다");
                }
                if(response.status===401) {
                    throw new Error("클라이언트 데이터에 자격이 없습니다");
                }
                return response.json();
            })
            .then(function (data) {
                alert(data.role);
                setIsUserAccount(data.role);
                return;
            })
            .catch(function (e) {
        
                console.log(e);
            });
    }
    return(
        <div>
        {isUserAccount === null ? (<div>Loading...</div>) : isUserAccount === "비회원" ? (<NoneUserBoardWriteForm />) :
         (  <UserBoardWriteForm/>)}
      </div>
    )
}
export default BoardWriteForm;