import {FaEdit,FaTrash} from 'react-icons/fa'

const TodoListItem=({todoList,updateTodoListCompletedHandler,editTodoListHandler,deleteTodoListHandler})=>{
    return (
        <div className="todoList-item">
            <div className="btn-icon"><input type="checkbox" className="cursor" checked={todoList.completed} onChange={()=>updateTodoListCompletedHandler(todoList)} /></div>
            <h1 className={todoList.completed?"todoList-content completed":"todoList-content"}>{todoList.title}</h1>
            <div className={todoList.completed?"btn-icon disabled":"btn-icon"}><FaEdit className="cursor edit-icon" onClick={()=>editTodoListHandler(todoList)} /></div>
            <div className="btn-icon"><FaTrash className="cursor remove-icon" onClick={()=>deleteTodoListHandler(todoList._id)} /></div>
        </div>
    )
}

export default TodoListItem