import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HeaderMenu from './ui/HeaderMenu';
// import MainPage from './page/MainPage';
import Login from './page/Login';
import HeaderMenu from './ui/HeaderMenu';
import Main from './page/Main';
import FooterMenu from './ui/FooterMenu';
import Board from './page/Board';
import BoardInsert from './page/BoardInsert';
import BoardDetail from './page/BoardDetail';
import Parking from './page/Parking';
import SignUp from './page/SignUp';
import ParkingInfo from './Info/ParkingInfo';
import ParkingFee from './page/ParkingFee';
import InfoMain from './realtimeinfo/InfoMain';

function App() {
  return (
    <div className="flex flex-col h-screen">
    <BrowserRouter> 
        <HeaderMenu />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/board' element={<Board />}></Route>
          <Route path='/board/boardinsert' element={<BoardInsert />}></Route>
          <Route path='/board/boarddetail' element={<BoardDetail />}></Route>
          <Route path='/parking' element={<Parking />}></Route>
          <Route path='/parkinginfo' element={<ParkingInfo />}></Route>
          <Route path='/parkingfee' element={<ParkingFee />}></Route>
          <Route path='/infomain' element={<InfoMain />}></Route>
        </Routes>
        <FooterMenu /> 
    </BrowserRouter>
    </div>
  )

}

export default App;
