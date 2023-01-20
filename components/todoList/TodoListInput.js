const TodoListInput=({todoListId,todoListInput,changeHandler,addTodoListHandler})=>{
    return (
        <form className="input-group" onSubmit={addTodoListHandler}>
            <input type="text" className="text input" name="input" value={todoListInput} placeholder="請輸入代辦事項" autoComplete="off" autoFocus onChange={changeHandler} />
            <button type="submit" className="text btn-submit">{!todoListId?"新增":"更新"}</button>
        </form>
    )
}

export default TodoListInput