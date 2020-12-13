export const Todos = `
  query TodosByMonthly($year: String!, $month: String!, $date: String) {
    todos(year: $year, month: $month, date: $date) {
      id
      date
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

export const UpdateThumbnail = `
  mutation UpdateThumbnail($url: String) {
    updateThumbnail(url: $url) {
      id
      name
    }
  }
`

export const UpdateProfileName = `
  mutation UpdateProfileName($name: String!) {
    updateProfileName(name: $name) {
      id
      name
    }
  }
`

export const UpdateTimezone = `
  mutation UpdateTimezone($timezone: String!) {
    updateTimezone(timezone: $timezone) {
      id
      name
    }
  }
`
