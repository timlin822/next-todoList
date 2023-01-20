import mongoose from 'mongoose'

const todoListSchema=mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
	createAt: {
        type: String,
        required: true
    },
    updateAt: {
        type: String,
        required: true
    }
})

const TodoList=mongoose.models.todoList || mongoose.model("todoList",todoListSchema)

export default TodoList