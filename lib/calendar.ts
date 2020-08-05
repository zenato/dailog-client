import dayjs from 'dayjs'

export interface Item {
  date: Date
  isCurrentMonth: boolean
}

export function getDays (param: Date) {
  const date = dayjs(param).startOf('month')
  const lastValue = date.endOf('month').valueOf()
  let current = dayjs(date).add(-date.weekday(), 'day')

  const items: Array<Item[]> = []
  while (true) {
    const row: Item[] = []
    for (let i = 0; i < 7; i++) {
      row.push({
        date: current.toDate(),
        isCurrentMonth: current.get('month') === date.get('month'),
      })
      current = current.add(1, 'day')
    }
    items.push(row)
    if (lastValue <= current.valueOf()) break
  }
  return items
}

export function groupByDay<T extends { date: Date }>(todos: [T]) {
  return todos.reduce((acc, curr) => {
    const key = dayjs(curr.date).format('YYYYMMDD')
    return {
      ...acc,
      [key]: (acc[key] || []).concat([curr]) as [T],
    }
  }, {} as { [key: string]: [T] })
}
