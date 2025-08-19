import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from '../components/DiaryList'
import { DiaryStateContext } from '../App'

const Home = () => {
  const data = useContext(DiaryStateContext)

  const [pivoteDate, setPivotDate] = useState(new Date())

  const getMonthlyData = (pivoteDate, data) => {
    const beginTime = new Date(
      pivoteDate.getFullYear(),
      pivoteDate.getMonth(),
      1,
      0, 0, 0
    ).getTime()

    const endTime = new Date(
      pivoteDate.getFullYear(),
      pivoteDate.getMonth(),
      1,
      23, 59, 59
    ).getTime()

    return data.filter(
      (item)=>beginTime <=item.createdDate && item.createdDate<=endTime
    )
  }

  const monthlyData = getMonthlyData(pivoteDate,data)

  const onIncreamentMonth = () => {
    setPivotDate(
      new Date(pivoteDate.getFullYear(), pivoteDate.getMonth() + 1)
    )
  }

  const onDecreamentMonth = () => {
    setPivotDate(
      new Date(pivoteDate.getFullYear(), pivoteDate.getMonth() - 1)
    )
  }


  return (
    <div>
      <Header
        leftChild={<Button text={"<"} onClick={onDecreamentMonth} />}
        title={`${pivoteDate.getFullYear()}년   ${pivoteDate.getMonth() + 1}월`}
        rightChild={<Button text={">"} onClick={onIncreamentMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  )
}

export default Home