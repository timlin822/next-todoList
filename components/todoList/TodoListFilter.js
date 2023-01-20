const TodoListFilter=({todoListStatus,changeHandler})=>{
    return (
        <select className="select-input" name="status" value={todoListStatus} onChange={changeHandler}>
            <option value="全部">全部</option>
            <option value="完成">完成</option>
            <option value="未完成">未完成</option>
        </select>
    )
}

export default TodoListFilter