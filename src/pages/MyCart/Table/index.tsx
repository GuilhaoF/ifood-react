import { useEffect, useState } from "react"
import { useCart } from "../../../hooks/useCart"
import { TableDesktop } from "./TableDesktop"
import { Emptycart } from "../../../components/EmptyCart"
import { TableMobile } from "./TableMobile"


export function Table(){
    const { cart } = useCart()
    const [windowsWidth,setWindowsWidth] = useState(document.documentElement.clientWidth)//pegando largura atual da janela

    useEffect(() => { //esta ouvindo o evento de redimensionamento da janela 
        function updateTableComponentBasedInWindowWidth(){
          const currentWidth = document.documentElement.clientWidth //armazenando a largura atual do dimensionamento 
          setWindowsWidth(currentWidth)// aytualizando o windowWidth
        }
        window.addEventListener('resize',updateTableComponentBasedInWindowWidth) // ouvinte de evento
        
        //funcao de limpeza , remover o ouvinte de evento , quando component desmonta 
        return () => {
          window.removeEventListener('resize',updateTableComponentBasedInWindowWidth)
        }
    },[])

     
    if (cart.length === 0) return <Emptycart title="Ops! Parece que você não tem pedidos, peça já!" /> 

    return windowsWidth > 768 ? <TableDesktop/> :  <TableMobile />

}