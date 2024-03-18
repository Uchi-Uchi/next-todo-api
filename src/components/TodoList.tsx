import { TodoType } from '@/types/types'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router';
import styles from './TodoList.module.css';

type Props = {
  todos: TodoType[]
}

const TodoList:React.FC<Props> = ({todos}) => {
  const router = useRouter();
  const handleDelete = async (todoId: number) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${todoId}`);
      router.push("/");
    } catch(err) {
      alert("削除に失敗しました")
    }
  }

  return (
    <div className={styles.all}>
      <h1 className={styles.title}>Todo List</h1>
      <div className={styles.todoList}>
        {todos.map((todo) => (
          <div key={todo.id} className={styles.todoItem}>
            <span>ID: {todo.id}</span>
            <span>タイトル: {todo.title}</span>
            <span>ステータス: {todo.status}</span>
            <div className={styles.actions}>
              <Link href={`/todos/${todo.id}`}>
                <button className={styles.detailButton}>詳細</button>
              </Link>
              <button className={styles.deleteButton} onClick={() => handleDelete(todo.id)}>削除</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Link href="/todos/create">
          <button className={styles.addButton}>タスクを追加</button>
        </Link>
      </div>
    </div>
  )
}

export default TodoList