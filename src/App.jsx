/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import BoardReadForm from './board/read/BoardReadForm';
import BoardEditForm from './board/edit/BoardEditForm';
import BoardWriteForm from './board/write/BoardWriteForm';
import LoginForm from './login/LoginForm';
import UnSearch from './boards/un-search/UnSearch';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoneUserBoardReadForm from './board/read/NoneUserBoardReadForm';
import Alarm from './alarm/Alarm';
import FindId from './find/FindId';
import ChangePassword from './change/ChangePassword';
import Join from './join/Join';
import Search from './boards/search/Search';
/*
npx create-react-app 파일 이름 cd 파일 이름으로 접속 하고
npm start로 접속하면 됨 

*/
function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Routes>
          <Route path="/" element={<UnSearch/>}></Route>
          <Route path="/board/search" element={<Search/>}></Route>
          <Route path="/join" element={<Join/>}></Route>
          <Route path="/find/id" element={<FindId/>}></Route>
          <Route path="/change/password" element={<ChangePassword/>}></Route>
          <Route path="/alarm/*" element={<Alarm/>}></Route>
          <Route path="/boards/edit/*" element={<BoardEditForm/>}></Route>
          <Route path="/boards/*" element={<BoardReadForm/>}></Route>
				  <Route path="/write" element={<BoardWriteForm/>}></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
				</Routes>
			</BrowserRouter>
        
    </div>
  );
}

export default App;
