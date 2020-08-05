import { FC } from 'react'
import { Header, Protected } from '@components/core'
import cn from 'classnames'
import s from './Layout.module.css'

const Layout: FC = ({ children }) => (
  <Protected>
    <div className={cn(s.root)}>
      <Header />
      <div className={cn(s.content)}>{children}</div>
    </div>
  </Protected>
)

export default Layout
