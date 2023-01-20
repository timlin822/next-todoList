import db from '@/config/db'
import TodoList from '@/models/todoListModel'
import dateTime from '@/utils/dateTime'

db()

export default async(req,res)=>{
    switch(req.method){
        case "GET":
            await getTodoLists(req,res)
            break
        case "POST":
            await createTodoList(req,res)
            break
    }
}

// 全部查詢
const getTodoLists=async(req,res)=>{
    try{
        const todoLists=await TodoList.find().sort({updateAt: -1}).select("-__v")
        
        res.status(200).json({
            message: "全部查詢成功",
            todoLists
        })
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
}

// 新增
const createTodoList=async(req,res)=>{
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
                message: "代辦事項已存在"
            })
        }

        // 新增
        await TodoList.create({
            title,
            createAt: dateTime(),
            updateAt: dateTime()
        })

        res.status(200).json({
            message: "新增成功"
        })
    }
    catch(err){
        res.status(500).json({
            message: err
        })
    }
}