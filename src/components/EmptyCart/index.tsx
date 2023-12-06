

import manAndBurgerImg from '../../assets/man-and-burger.svg'
import { Button, Container } from './styles'

interface EmptyCartProps {
  title: string
}


export function Emptycart({ title } : EmptyCartProps) {
    return (
        <Container>
            <h2>{title}</h2>
            <Button to='/'>Checar Cardapio </Button>
             <img src={manAndBurgerImg} alt='Homem com hamburguer' />
        </Container>
    )
}