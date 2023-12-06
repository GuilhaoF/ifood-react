/* eslint-disable no-irregular-whitespace */
import { createContext, ReactNode, useState } from 'react'
import { SnackData } from '../interfaces/SnackData'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { CustomerData } from '../interfaces/CustomerData'
import { processCheckout } from '../services/api'

interface Snack extends SnackData {
  quantity: number
  subtotal: number
}

interface CartContextProps {
  cart: Snack[]
  addSnackIntoCart: (snack: SnackData) => void
  removeSnackFromCart: (snack: Snack) => void
  snackCartIncrement: (snack: Snack) => void
  snackCartDecrement: (snack: Snack) => void
  confirmOrder: () => void
  payOrder: (customer: CustomerData) => void
}
interface CartProviderProps {
  children: ReactNode
}
export const CartContext = createContext({} as CartContextProps)

const localStorageKey = '@FoodCommerce:cart'

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Snack[]>(() => {
    const value = localStorage.getItem(localStorageKey)
    if (value) {
      //verifica se existe valor
      return JSON.parse(value)
    }
    return []
  })
  const navigate = useNavigate()

  function saveCart(items: Snack[]) {
    setCart(items)
    localStorage.setItem(localStorageKey, JSON.stringify(items))
  }

  function clearCart() {
    localStorage.removeItem(localStorageKey)
  }

  function addSnackIntoCart(snack: SnackData): void {
    //verifica se existe snack igual no carrinho
    const snackExistenInCart = cart.find(
      (item) => item.snack === snack.snack && item.id === snack.id,
    )

    if (snackExistenInCart) {
      const newCart = cart.map((item) => {
        if (item.id === snack.id) {
          const quantity = item.quantity + 1
          const subtotal = item.price * quantity

          return { ...item, quantity, subtotal }
        }
        return item
      })
      toast.success(`Outro(a) ${snack.snack} ${snack.name} adicionado ao carrinho !`)
      saveCart(newCart)
      return
    }

    const newSnack = { ...snack, quantity: 1, subtotal: snack.price }
    const newCart = [...cart, newSnack]
    toast.success(`${snack.snack} ${snack.name} adicionado aos pedidos`)
    saveCart(newCart)
  }
  function removeSnackFromCart(snack: Snack) {
    const newCart = cart.filter((item) => !(item.id === snack.id && item.snack === snack.snack))
    saveCart(newCart)
  }

  function updateSnackQuantity(snack: Snack, newQuantity: number) {
    if (newQuantity <= 0) return

    const snackExistentInCart = cart.find(
      (item) => item.id === snack.id && item.snack === snack.snack,
    )

    if (!snackExistentInCart) return

    const newCart = cart.map((item) => {
      if (item.id === snackExistentInCart.id && item.snack === snackExistentInCart.snack) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.price * newQuantity,
        }
      }

      return item
    })

    saveCart(newCart)
  }

  function snackCartIncrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity + 1)
  }
  function snackCartDecrement(snack: Snack) {
    updateSnackQuantity(snack, snack.quantity - 1)
  }

  function confirmOrder() {
    navigate('/payment')
  }

  async function payOrder(customer: CustomerData) {
    try {
      const response = await processCheckout(cart, customer)

      if (response.data.status !== 'PAID') {
        console.log(response.data.status)
        toast.error('erro ao realizar o pagamento')
        return
      }
      clearCart()
      navigate(`/order/success/${response.data.id}`)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao realizar o pagamento')
      return
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addSnackIntoCart,
        removeSnackFromCart,
        snackCartIncrement,
        payOrder,
        snackCartDecrement,
        confirmOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
