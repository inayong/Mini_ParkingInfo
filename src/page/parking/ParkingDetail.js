import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DetailMap from '../../comm/DetailMap';


const ParkingDetail = () => {

  const { parkingName } = useParams();


  const [parkDetail, setParkDetail] = useState();

  // console.log("params", parkingName)

  useEffect(() => {
    const fetchParkDetail = () => {
      fetch(`http://10.125.121.217:8080/parking/detail/${parkingName}`)
        .then(resp => resp.json())
        .then(data => {
          setParkDetail(data)
        })
        .catch(err => console.log(err))
    };

    fetchParkDetail();
  }, [parkingName])

  // console.log("detail", parkDetail)

  // 보류 : 급지구분

  

  return (
    <main>
      { parkDetail && <div className='pt-5 h-screen'>
        <div className='pt-10 pl-96 pr-96 text-3xl font-bold font-HakgyoansimWoojuR'>
          {parkDetail.prkPlaceNm}
          <div className='border-b-2 border-black pt-3'></div>
        </div>
        <div className='flex justify-center pb-8'>
          <DetailMap addr={parkDetail.address} name={parkDetail.prkPlaceNm}/>
        </div>
        <div className='flex pt-8 grow relative justify-center'>
          <table className='table-auto w-3/5 text-center font-GmarketSansMedium shadow-md border-separate rounded-[20px] overflow-hidden'>
            <thead className='bg-[#6eb17d83] '>
              <tr>
                <th className='px-6 py-3'>주차장명</th>
                <th>주차장 주소</th>
                <th>구분</th>
                <th>구획수</th>
                <th>전화번호</th>
              </tr>
            </thead>
             <tbody>
              <tr>
                <td className='px-6 py-3'>{parkDetail.prkPlaceNm}</td>
                <td>{parkDetail.address}</td>
                <td>{parkDetail.prkStyle}</td>
                <td>{parkDetail.prkChargeInfo}</td>
                <td>{parkDetail.phoneNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex pt-20 grow relative justify-center'>
          <table className='table-auto w-3/5 text-center font-GmarketSansMedium shadow-md border-separate rounded-[20px] overflow-hidden'>
            <thead className='bg-[#f5f399bd] '>
              <tr>
                <th className='px-6 py-3'>운영요일</th>
                <th>평일 오픈</th>
                <th>평일 종료</th>
                <th>토요일 오픈</th>
                <th>토요일 종료</th>
                <th>공휴일 오픈</th>
                <th>공휴일 종료</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-6 py-3'>{parkDetail.openDays}</td>
                <td>{parkDetail.weekdayOpenHhmm}</td>
                <td>{parkDetail.weekdayColseHhmm}</td>
                <td>{parkDetail.satOperOpenHhmm}</td>
                <td>{parkDetail.satCloseHhmm}</td>
                <td>{parkDetail.holidayOpenHhmm}</td>
                <td>{parkDetail.holidayCloseHhmm}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex pt-20 grow relative justify-center'>
          <table className='table-auto w-3/5 text-center font-GmarketSansMedium shadow-md border-separate rounded-[20px] overflow-hidden'>
            <thead className='bg-[#f5f399bd]'>
              <tr>
                <th className='px-6 py-3'>요금정보</th>
                <th>기본시간</th>
                <th>기본요금</th>
                <th>추가 단위 시간</th>
                <th>추가 단위 요금</th>
                <th>결제 방법</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-6 py-3'>{parkDetail.fee}</td>
                <td>{parkDetail.basicTime}</td>
                <td>{parkDetail.basicFee}</td>
                <td>{parkDetail.additionalTime}</td>
                <td>{parkDetail.additionalFee}</td>
                <td>{parkDetail.paymentMethod}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex pt-20 grow relative justify-center'>
          <table className='table-auto w-3/5 text-center font-GmarketSansMedium shadow-md border-separate rounded-[20px] overflow-hidden mb-44'>
            <thead className="bg-[#6eb17d83]">
              <tr>
                <th className='px-6 py-3'>1일 주차권 요금</th>
                <th>1일 주차권 적용 시간</th>
                <th>월 정기권 요금</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-6 py-3'>{parkDetail.dailyTicketFee}</td>
                <td>{parkDetail.dailyTicketApplicableTime}</td>
                <td>{parkDetail.monthlyPassFee}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
}
    </main>
  )
}

export default ParkingDetail;