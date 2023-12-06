import { currencyFormat } from "../../../helpers/currencyFormat";
import { useCart } from "../../../hooks/useCart";
import { Container } from "../styles";
import { useNavigate } from 'react-router-dom'

export function ConfirmOrder(){

    const { cart } = useCart();
    const navigate = useNavigate()
    
    const totalAmount = cart.reduce((acc,item) => (acc += Number(item.subtotal)),0) //calculando o total 

    return (
        <Container>
            <button type="button" onClick={() => navigate('/payment')}> Finalizar Pedido</button>
            <span>
                Total <strong>{currencyFormat(totalAmount)}</strong>
            </span>
        </Container>
    )
}