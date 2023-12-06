import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HeaderMenu from './ui/HeaderMenu';
// import MainPage from './page/MainPage';
import Login from './page/login/Login';
import HeaderMenu from './comm/HeaderMenu';
// import Main from './page/Maincopy';
import Main from './page/Main';
import FooterMenu from './comm/FooterMenu';
import Board from './page/board/Board';
import BoardInsert from './page/board/BoardInsert';
import BoardDetail from './page/board/BoardDetail';
import Parking from './page/parking/Parking';
import SignUp from './page/login/SignUp';
import ParkingDetail from './page/parking/ParkingDetail';
import ParkingFee from './page/parking/ParkingFee';
import InfoMain from './realtimeinfo/InfoMain';
import { RecoilRoot } from 'recoil';

function App() {
  // <div className="h-auto min-h-full pb-2">
  return (
    <div className="flex flex-col h-screen">
      <RecoilRoot>
        <BrowserRouter>
          <HeaderMenu />

          <Routes>
            <Route path='/' element={<Main />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/board' element={<Board />}></Route>
            <Route path='/board/insert' element={<BoardInsert />}></Route>
            <Route path='/board/detail/:boardId' element={<BoardDetail />}></Route>
            <Route path='/parking' element={<Parking />}></Route>
            <Route path='/parking/detail/:parkingName' element={<ParkingDetail />}></Route>
            <Route path='/parkingfee' element={<ParkingFee />}></Route>
            <Route path='/infomain' element={<InfoMain />}></Route>
          </Routes>
          
          {/* <FooterMenu /> */}
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )

}

export default App;
