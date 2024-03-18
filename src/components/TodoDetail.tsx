import { TodoType } from '@/types/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './TodoDetail.module.css';

type Props = {
  todo: TodoType;
};

const TodoDetail: React.FC<Props> = ({ todo }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.all}>
      <h1 className={styles.title}>Detail Todo</h1>
      <div className={styles.detail}>
        <span>ID: {todo.id} ステータス: {todo.status}</span>
        <br />
        <span>詳細: {todo.details}</span>
        <br />
        <span>作成日: {todo.createdAt}</span>
        <br />
        <span>更新日: {todo.updatedAt}</span>
      </div>
      <div className={styles.buttons}>
        <Link href={`/todos/edit/${todo.id}`}>
          <button className={styles.createButton}>編集</button>
        </Link>
        <Link href="/">
          <button className={styles.backButton}>戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default TodoDetail;