import { useParams } from "react-router-dom"
import { Container, Inner, SubTitle, Title } from "./styled"
import { Head } from "../../../components/Head"
import { useEffect, useState } from "react"
import api from "../../../services/api"


export default function OrderSuccessPage() {
  const { orderId } = useParams()

  const [name, setName] = useState('');

  useEffect(() => {
    api.get(`/orders/${orderId}`).then(response => {
      const dataResponse = response.data
      setName(dataResponse.customer.fullName);
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <Container>
      <Head title='Compra Realizada com Sucesso!' />

      <Inner>
        <Title>Compra Realizada com Sucesso</Title>

        <p>
          Número de Pedido <code>#{orderId}</code>
        </p>
        <p>Mome do Cliente : <strong>{name}</strong></p>

        <SubTitle>Dados de Contato da Loja</SubTitle>

        <ul>
          <li>Endereço: Av Central, 123</li>
          <li>Tel: 11 98412-4578</li>
        </ul>

        <br />
        <a href='/'>Voltar para a página inicial</a>
      </Inner>
    </Container>
  )
}
