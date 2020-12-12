interface User {
  id: string
  name: string
  email: string
  timezone: string
  thumbnail?: string
}

interface Todo {
  id: string
  title: string
  date: Date
  isDone: boolean
}
