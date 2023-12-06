import { useCart } from "../../hooks/useCart"
import { Container } from "./styles"

import { ReactComponent as CartIcon } from '../../assets/shopping-cart.svg'

export function MyOrder(){
    const { cart } = useCart()
    return (
        <Container to={'cart'}>
            <span>Meu Pedido</span>
            <CartIcon/>
            {cart.length !== 0 && <span>{cart.length}</span>}
        </Container>
    )
}