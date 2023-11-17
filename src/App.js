import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HeaderMenu from './ui/HeaderMenu';
// import MainPage from './page/MainPage';
import Login from './page/Login';
import HeaderMenu from './ui/HeaderMenu';
import Main from './page/Main';
import FooterMenu from './ui/FooterMenu';

function App() {
  return (
    <BrowserRouter>
      <main className='flex flex-col'>
        <HeaderMenu />
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
        <FooterMenu />
      </main>
    </BrowserRouter>
  )

}

export default App;
