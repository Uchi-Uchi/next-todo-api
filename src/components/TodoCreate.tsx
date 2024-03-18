import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent, useState } from 'react'

import styles from './TodoCreate.module.css';

const TodoCreate = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('未着手');
  const [details, setDetails] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8080/todos", {
        title: title,
        status: status,
        details: details
      });
      router.push(`/todos/${response.data}`)
    } catch(err) {
      alert("新規作成に失敗しました")
    }
  };

  return (
    <div className={styles.all}>
      <h1 className={styles.center}>Create Todo</h1>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
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
            <button type="submit" className={styles.createButton}>作成</button>
            <Link href="/">
              <button className={styles.backButton}>戻る</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoCreate;