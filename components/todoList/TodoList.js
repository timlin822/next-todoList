import {useState,useEffect} from 'react'
import axios from 'axios'

import TodoListInput from './TodoListInput'
import TodoListFilter from './TodoListFilter'
import TodoListBody from './TodoListBody'

const TodoList=()=>{
    const [todoLists,setTodoLists]=useState([])
    const [todoListsFilter,setTodoListsFilter]=useState([])
    const [todoListInput,setTodoListInput]=useState("")
    const [todoListStatus,setTodoListStatus]=useState("全部")
    const [todoListId,setTodoListId]=useState("")
    const [success,setSuccess]=useState("")

    const getTodoLists=async()=>{
		try{
			const res=await axios.get("/api/todoLists")
			setTodoLists(res.data.todoLists)
		}
		catch(err){
			console.log(err)
		}
    }

    const filterTodoListHandler=()=>{
        switch(todoListStatus){
            case "全部":
                setTodoListsFilter(todoLists)
                break
            case "完成":
                setTodoListsFilter(todoLists.filter(todoList=>todoList.completed===true))
                break
            case "未完成":
                setTodoListsFilter(todoLists.filter(todoList=>todoList.completed===false))
                break
            default:
                setTodoListsFilter(todoLists)
                break
        }
    }

    useEffect(()=>{
        setSuccess("")
        getTodoLists()
    },[])
    useEffect(()=>{
        filterTodoListHandler()
    },[todoLists,todoListStatus])
    useEffect(()=>{
        if(success==="新增成功" || success==="更新成功" || success==="刪除成功"){
            getTodoLists()
            setTodoListInput("")
            setTodoListId("")
            setSuccess("")
        }
    },[success])
    
    const changeHandler=(e)=>{
        if(e.target.name==="input"){
            setTodoListInput(e.target.value)
        }
        else if(e.target.name==="status"){
            setTodoListStatus(e.target.value)
        }
    }

    const addTodoListHandler=async(e)=>{
        e.preventDefault()
        if(!todoListInput) return

        try{
            if(!todoListId){
                // 新增
                await axios.post("/api/todoLists",{title: todoListInput})
                setSuccess("新增成功")
            }
            else{
                // 更新
                await axios.put(`/api/todoLists/${todoListId}`,{title: todoListInput})
                setSuccess("更新成功")
            }
        }
        catch(err){
            alert(err.response.data.message)
        }
    }

    const updateTodoListCompletedHandler=async(todoList)=>{
        try{
            await axios.patch(`/api/todoLists/${todoList._id}`,{completed: !todoList.completed})
            setSuccess("更新成功")
        }
        catch(err){
            console.log(err)
        }
    }

    const editTodoListHandler=async(todoList)=>{
        setTodoListInput(todoList.title)
        setTodoListId(todoList._id)
    }

    const deleteTodoListHandler=async(todoListId)=>{
        try{
            if(window.confirm("是否刪除?")){
                await axios.delete(`/api/todoLists/${todoListId}`)
                setSuccess("刪除成功")
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className="todoList-board">
            <TodoListInput todoListId={todoListId} todoListInput={todoListInput} changeHandler={changeHandler} addTodoListHandler={addTodoListHandler} />
            <TodoListFilter todoListStatus={todoListStatus} changeHandler={changeHandler} />
            <TodoListBody todoListsFilter={todoListsFilter} todoListStatus={todoListStatus} updateTodoListCompletedHandler={updateTodoListCompletedHandler} editTodoListHandler={editTodoListHandler} deleteTodoListHandler={deleteTodoListHandler} />
        </div>
    )
}

export default TodoList