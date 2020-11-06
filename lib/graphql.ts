export interface Todo {
  id: number
  title: string
  date: Date
  isDone: boolean
}

export const TodosByMonthly = `
  query TodosByMonthly($date: Date!) {
    todosByMonthly(date: $date) {
      id
      date
      title
      isDone
    }
  }
`

export const TodosByDate = `
  query TodosByDate($date: Date!) {
    todosByDate(date: $date) {
      id
      title
      isDone
    }
  }
`

export const AddTodo = `
  mutation AddTodo($input: TodoInput!) {
    addTodo(input: $input) {
      id
      title
      isDone
    }
  }
`

export const UpdateTodo = `
  mutation AddTodo($id: ID!, $isDone: Boolean!) {
    updateTodo(id: $id, isDone: $isDone) {
      id
      title
      isDone
    }
  }
`

export const DeleteTodo = `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`
