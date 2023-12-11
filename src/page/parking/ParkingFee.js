import { all } from 'axios';
import React, { useEffect, useState } from 'react'

const ParkingFee = () => {
  const [allData, setAllData]= useState();

  const selData = () => {
    fetch("http://10.125.121.217:8080/parking/list")
      .then(resp => resp.json())
      .then(data => {
        setAllData(data)
        console.log("all", data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    selData();
  }, [])

  console.log("prkStyle",allData.prkStyle)


  return (
    <div>ParkingFee</div>
  )
}

export default ParkingFee;