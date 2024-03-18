import TodoList from "@/components/TodoList";
import { TodoType } from "@/types/types";
import React from "react";

type Props = {
  todos: TodoType[]
}

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:8080/todos");
  const todos = await res.json();

  console.log(todos);

  return {
    props: {
      todos,
    },
    revalidate: 5,
  }
}

const indexPage:React.FC<Props> = ({todos}) =>  {
  return (
    <div>
      <TodoList todos={todos} />
    </div>
  );
}
export default indexPage;
