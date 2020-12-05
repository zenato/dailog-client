import { FC } from 'react'
import { Navbar, Protected } from '@components/common'
import cn from 'classnames'
import s from './Layout.module.css'

const Layout: FC = ({ children }) => (
  <Protected>
    <div className={cn(s.root)}>
      <Navbar />
      <div className={cn(s.content)}>{children}</div>
    </div>
  </Protected>
)

export default Layout
