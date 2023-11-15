import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

const Menu = () => {
  return (
    <h1>
      <header className='flex justify-between'>
        <h1 className='text-xl font-bold'>공영주차장 실시간 현황</h1>
        <nav>
          <ul className='flex justify-between items-center'>
            <li className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">주차서비스</li>
            <li className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">주차장</li>
            <li className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">주차요금</li>
          </ul>
        </nav>
        <article className='flex justify-between'>
          <div>로그인</div>
          <button><FiSearch /></button>
          <button><GiHamburgerMenu /></button>
        </article>
      </header>
    </h1>
  )
}

export default Menu;