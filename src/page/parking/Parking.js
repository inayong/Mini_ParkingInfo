import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

const Parking = () => {

  const [parkData, setParkData] = useState([]);

  //페이징
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // const pageRange = 5;
  const startIndex = (currentPage - 1) * itemsPerPage; //시작 인덱스 현재페이지=1 => 0, p=2 => 10
  const endIndex = startIndex + itemsPerPage; //
  const displayData = parkData.slice(startIndex, endIndex); //현재페이지에서 보여줄

  useEffect(() => {
    const getData = () => {

      fetch("http://10.125.121.217:8080/parking/refer")
        .then(resp => resp.json())
        .then(data => {
          setParkData(data)
          // console.log(data)
        })
        .catch(err => console.log(err))
    }

    getData();
  }, []);

  // console.log(parkData)

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);

  }

  return (
    <main>
      <div className='h-screen'>
        <div className='h-1/6 '>
          <div className='flex justify-center items-center pt-20 font-bold text-3xl font-NanumSquareNeoVariable'>주차장 전체 목록</div>
        </div>
        <div className='h-4/6'>
          
          <div className='flex justify-center rounded-2xl'>
            <table className='w-3/5 text-center bg-white font-GmarketSansMedium'>
              <thead className='border-b border-black bg-blue-100 '>
                <tr className=''>
                  <th className='px-6 py-5'>No.</th>
                  <th className='px-6 py-5'>주차장명</th>
                  <th className='px-6 py-5'>주소</th>
                  <th className='px-6 py-5'>전화번호</th>
                </tr>
              </thead>
              <tbody className=''>
                {displayData.map((items) => (
                  <tr key={items.id} className='border-b hover:bg-blue-50'>
                    <td className='py-4 '>{items.id}</td>
                    <td className='hover:underline py-4'><Link to={`detail/${items.prkPlaceNm}`}>{items.prkPlaceNm}</Link></td>
                    <td className='py-4'>{items.address}</td>
                    <td className='py-4'>{items.phoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='pt-5'>
            {parkData.length > 0 && (
              <Pagination activePage={currentPage} itemsCountPerPage={itemsPerPage} totalItemsCount={parkData.length} pageRangeDisplayed={5} onChange={handlePageChange} />
            )}
          </div>
        </div>
        <div className='h-1/6'></div>
      </div>
    </main>
  )
}

export default Parking;