import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from '../components/Editor'
import Header from '../components/Header'
import Button from '../components/Button'
import { DiaryDispatchContext, DiaryStateContext } from '../App'

const Edit = () => {
    const nav = useNavigate()
    const { id } = useParams()

    const { onDelete, onUpdate } = useContext(DiaryDispatchContext)
    const data = useContext(DiaryStateContext) 

    const [curDiaryItem, setCurDiaryItem] = useState(null)

    useEffect(() => {
        const currentDiaryItem = data.find(
            (item) => String(item.id) === String(id)
        )

        if (!currentDiaryItem) {
            window.alert('존재하지 않는 일기')
            nav('/', { replace: true }) 
            return
        }

        setCurDiaryItem(currentDiaryItem) 

    }, [id, data, nav])

    const onSubmit=(input)=>{
        if(window.confirm('일기를 정말 수정할까요?')){
            onUpdate(
                id, 
                input.createdDeleted.getTime(),
                input.emptionId,
                input.content
            )
        }
    }

    return (
        <div>
            <Header
                leftChild={<Button text={"< 뒤로가기"} onClick={() => nav(-1)} />}
                rightChild={
                    <Button
                        text={"삭제하기"}
                        type={'NEGATIVE'}
                        onClick={() => {
                            if (window.confirm('정말 삭제할까요?')) {
                                onDelete(id)
                                nav('/', { replace: true })
                            }
                        }}
                    />
                }
                title={"일기 수정하기"}
            />
            <Editor initData={curDiaryItem} onSubmit={onUpdate} />
        </div>
    )
}

export default Edit
