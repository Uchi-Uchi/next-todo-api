import { TodoType } from '@/types/types';
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react'

import styles from './TodoEdit.module.css';

type Props = {
  todo: TodoType
}


const TodoEdit = ({todo}: Props) => {

  const [title, setTitle] = useState(todo.title);
  const [status, setStatus] = useState(todo.status);
  const [details, setDetails] = useState(todo.details);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:8080/todos/${todo.id}`, {
        title: title,
        status: status,
        details: details
      });
      router.push(`/todos/${todo.id}`)
    } catch(err) {
      alert("編集に失敗しました")
    }

  };
  return (
    <>
      <div className={styles.all}>
        <h1 className={styles.center}>Update Todo</h1>
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapperUp}>
              <label className={styles.titleLabel}>タイトル:</label>
              <input type="text" className={styles.input} value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
            </div>
            <div className={styles.row}>
              <label className={styles.titleLabel}>ステータス:</label>
              <select className={styles.select} value={status} onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}>
                <option value="未着手">未着手</option>
                <option value="着手中">着手中</option>
                <option value="完了">完了</option>
              </select>
            </div>
            <div className={styles.inputWrapperDown}>
              <label className={styles.titleLabel}>詳細:</label>
              <textarea className={styles.textarea} value={details} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDetails(e.target.value)} />
            </div>
            <div className={styles.buttonWrapper}>
              <button type="submit" className={styles.updateButton}>更新</button>
              <Link href={`/todos/${todo.id}`}>
                <button className={styles.backButton}>戻る</button>
              </Link>
            </div>
          </form> 
        </div>
      </div>
    </>
  )
}

export default TodoEdit