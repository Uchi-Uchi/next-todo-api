import TodoEdit from '@/components/TodoEdit';
import { TodoType } from '@/types/types';
import React from 'react'

type Props = {
  todo: TodoType
}

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;

  const res = await fetch(`http://localhost:8080/todos/${id}`);
  const todo = await res.json();

  return {
    props: {
      todo,
    }
  }
}

const EditTodoPage = ({todo}: Props) => {

  return (
    <TodoEdit todo={todo} />
  )
}

export default EditTodoPage;