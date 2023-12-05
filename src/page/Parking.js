import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

const Parking = () => {

  const [parkData, setParkData] = useState([]);

  //페이징
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // const pageRange = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayData = parkData.slice(startIndex, endIndex);

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

  // const handlePageChange = (pageNum) => {
  //   if (pageNum > currentPage && pageNum % pageRange === 1) {
  //     setCurrentPage(currentPage + pageRange);
  //   } else {
  //     setCurrentPage(pageNum);
  //   }
  // }
  const handlePageChange = (pageNum) => {
      setCurrentPage(pageNum);
    
  }

  return (
    <div>
      <div>전체 주차장 들고오기 - 상세페이지랑 연결</div>
      <div>
        <table>
          <thead>
            <tr>
              <th className='px-6 py-3'>No.</th>
              <th className='px-6 py-3'>주차장명</th>
              <th className='px-6 py-3'>주소</th>
              <th className='px-6 py-3'>전화번호</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((items) => (
              <tr key={items.id}>
                <td>{items.id}</td>
                <td className='hover:underline'><Link to={`detail/${items.prkPlaceNm}`}>{items.prkPlaceNm}</Link></td>
                <td>{items.address}</td>
                <td>{items.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {parkData.length > 0 && (
          <Pagination activePage={currentPage} itemsCountPerPage={itemsPerPage} totalItemsCount={parkData.length} pageRangeDisplayed={5} onChange={handlePageChange} />
        )}
      </div>
    </div>

  )
}

export default Parking;