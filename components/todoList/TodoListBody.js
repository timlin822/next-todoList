import TodoListEmpty from './TodoListEmpty'
import TodoListItem from './TodoListItem'

const TodoListBody=({todoListsFilter,todoListStatus,updateTodoListCompletedHandler,editTodoListHandler,deleteTodoListHandler})=>{
    return (
        <>
            {todoListsFilter.length>0 ? todoListsFilter.map(todoList=>(
                <TodoListItem key={todoList._id} todoList={todoList} updateTodoListCompletedHandler={updateTodoListCompletedHandler} editTodoListHandler={editTodoListHandler} deleteTodoListHandler={deleteTodoListHandler} />
            )) : <TodoListEmpty todoListStatus={todoListStatus} />}
        </>
    )
}

export default TodoListBody