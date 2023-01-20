const TodoListEmpty=({todoListStatus})=>{
    return (
        <h1 className="todoList-empty">{todoListStatus==="全部"?"目前無代辦事項":todoListStatus==="完成"?"目前無完成事項":"目前無未完成事項"}</h1>
    )
}

export default TodoListEmpty