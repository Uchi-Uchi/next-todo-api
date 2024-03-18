import TodoDetail from '@/components/TodoDetail';
import { TodoType } from '@/types/types';
import React from 'react'

type Props = {
  todo: TodoType
}

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:8080/todos");
  const todos: TodoType[] = await res.json();

  const paths = todos.map((todo) => ({
    params: {id: todo.id.toString()},
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async ({params}: {params: {id: string}}) => {
  const res = await fetch(`http://localhost:8080/todos/${params.id}`);
  const todo = await res.json();

  console.log(todo);

  return {
    props: {
      todo,
    },
    revalidate: 60,
  }
}

const TodoDetailPage: React.FC<Props> = ({ todo }) => {

  return (
    <TodoDetail todo={todo} />
  )
}

export default TodoDetailPage;