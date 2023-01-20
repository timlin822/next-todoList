import Head from 'next/head'

import TodoList from '@/components/todoList/TodoList'

const HomePage=()=>{
  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className="section-padding bg-height bg-color">
        <div className="container container-padding">
          <TodoList />
        </div>
      </div>
    </>
  )
}

export default HomePage