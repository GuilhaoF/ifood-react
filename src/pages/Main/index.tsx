import { Container } from './styles'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'
import LogoImg from '../../assets/logo.svg'
import { MyOrder } from '../../components/MyOrder'

export default function Main() {
  return (
    <Container>
      <Sidebar />
     <section>
      <img src={LogoImg} />
      <Outlet/>
     </section>
     <MyOrder/>
    </Container>
  )
}
