import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import s from './Logo.module.css'

const Logo: FC = () => (
  <div className={cn(s.root)}>
    <Link href="/todo">
      <a>Dailog</a>
    </Link>
  </div>
)

export default Logo
