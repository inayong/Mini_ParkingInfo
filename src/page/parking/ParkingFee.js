import React, { useEffect, useState } from 'react'

const ParkingFee = () => {
  // const [allData, setAllData]= useState();

  // const selData = () => {
  //   fetch("http://10.125.121.217:8080/parking/list")
  //     .then(resp => resp.json())
  //     .then(data => {
  //       setAllData(data)
  //       console.log("all", data)
  //     })
  //     .catch(err => console.log(err))
  // }
  // useEffect(() => {
  //   selData();
  // }, [])

  // console.log("prkStyle",allData.prkStyle)

{/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/0J1dXKm/work-in-progress.png" alt="work-in-progress" border="0"></a> */}
{/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/pZHXJNC/work-in-progress-1.png" alt="work-in-progress-1" border="0"></a> */}
{/* <a href="https://imgbb.com/"><img src="https://i.ibb.co/Db76QJX/coming-soon.png" alt="coming-soon" border="0"></a> */}
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src="https://i.ibb.co/Db76QJX/coming-soon.png"
        alt="work-in-progres"
        className="w-100 h-80"
      />
    </div>
  )
}

export default ParkingFee;