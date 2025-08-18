import './App.css'
import { useReducer, useRef } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Home from './pages/Home'
import New from './pages/New'
import Notfound from './pages/Notfound'
import { getEmotionImage } from './util/getEmotionImage'
import Header from './components/Header'
import Button from './components/Button'

const mockData = [
  {
    id: 1,
    createDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용"
  }
]

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state]

    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ?
          action.data
          : item
      )

    case "DELETE":
      return state.filter(
        (item) => String(item.id) !== String(action.id)
      )
    default:
      return state
  }
}

function App() {

  const [data, dispatch] = useReducer(reducer, mockData)
  const idRef = useRef(3)

  const onCreate = (createDate, emotionId, content) => {

    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content
      }
    })
  }

  const onUpdate = (id, createDate, emotionId, content) => {
  dispatch({
    type: "UPDATE",
    data: {
      id,
      createDate,
      emotionId,
      content,
    }
  })
}

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    })
  }

  return (
    <div>
      <Header
        leftChild={<Button text="left" type="POSITIVE" />}
        title="header title"
        rightChild={<Button text="right" type="NEGATIVE" />}
      />

      <button onClick={() => onCreate(
        new Date().getTime(), 1, "hello"
      )}>일기 추가하기</button>

      <button onClick={() => onUpdate(
        6, new Date().getTime(), 3, "수정 된 내용"
      )}>일기 수정하기</button>

      <button onClick={() => onDelete(5)}>일기 삭제하기</button>




      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/diary/:id' element={<Diary />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
