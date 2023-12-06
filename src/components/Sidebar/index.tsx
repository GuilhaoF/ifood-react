import { Container } from './styles'

import { ReactComponent as BurguerIcon } from '../../assets/burger.svg'
import { ReactComponent as PizzaIcon } from '../../assets/pizza.svg'
import { ReactComponent as SodaIcon } from '../../assets/soda.svg'
import { ReactComponent as IceCreamIcon } from '../../assets/ice-cream.svg'
import menuImg from '../../assets/menu.svg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false)

  function handleToggleMenu() {
    setMenuOpen(!menuOpen)
  }


  return (
    <Container isOpenMenu={menuOpen} >
      <button onClick={handleToggleMenu}>
        <img src={menuImg} alt='Abrir e fechar menu' />
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to='/' >
              <BurguerIcon />
              <span>Hamburgueres</span>
            </NavLink>
          </li>

          <li>
            <NavLink to='pizzas'>
              <PizzaIcon />
              <span>Pizzas</span>
            </NavLink>
          </li>

          <li>
            <NavLink to='drinks'>
              <SodaIcon />
              <span>Bebidas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='icecreams'>
              <IceCreamIcon />
              <span>Sorvetes</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </Container>
  )
}
