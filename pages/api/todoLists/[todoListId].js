import db from '@/config/db'
import TodoList from '@/models/todoListModel'
import dateTime from '@/utils/dateTime'

db()

export default async(req,res)=>{
    switch(req.method){
        case "GET":
            await getTodoList(req,res)
            break
        case "PUT":
            await updateTodoList(req,res)
            break
        case "PATCH":
            await updateCompletedTodoList(req,res)
            break
        case "DELETE":
            await deleteTodoList(req,res)
            break
    }
}

// 部份查詢
const getTodoList=async(req,res)=>{
    try{
        const todoList=await TodoList.findById(req.query.todoListId).select("-createAt -updateAt -__v")
        
        res.status(200).json({
            message: "查詢成功",
            todoList
        })
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
}

// 更新
const updateTodoList=async(req,res)=>{
    try{
        const {title}=req.body
        
        // 檢查全部欄位是否填寫
        if(!title){
            return res.status(400).json({
                message: "請填寫完整"
            })
        }

        // 檢查代辦事項是否存在
        const existTodoList=await TodoList.findOne({title})
        if(existTodoList){
            return res.status(400).json({
                message: "請更新代辦事項"
            })
        }

        // 更新
        const updateTodoList={
            title,
            updateAt: dateTime()
        }
        await TodoList.findByIdAndUpdate(req.query.todoListId,updateTodoList,{new: true})
        
        res.status(200).json({
            message: "更新成功"
        })
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
}

// 更新是否完成
const updateCompletedTodoList=async(req,res)=>{
    try{
        const {completed}=req.body
        
        // 更新是否完成
        const updateTodoList={
            completed,
            updateAt: dateTime()
        }
        await TodoList.findByIdAndUpdate(req.query.todoListId,updateTodoList,{new: true})
        
        res.status(200).json({
            message: "更新成功"
        })
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
}

// 刪除
const deleteTodoList=async(req,res)=>{
    try{
        await TodoList.findByIdAndDelete(req.query.todoListId)
        
        res.status(201).json({
            message: "刪除成功"
        })
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
}