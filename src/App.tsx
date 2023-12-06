import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './routes'

import { Theme } from './styles/Theme'
import { GlobalStyle } from './styles/global'
import { Normalize } from 'styled-normalize'
import { SnackProvider } from './contexts/SnackContext'
import { CartProvider } from './contexts/CartContext'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <Theme>
        
        <SnackProvider>
          <CartProvider>
            <AppRoutes />
            <ToastContainer autoClose={2000}/>
            <GlobalStyle />
            <Normalize />
          </CartProvider>
        </SnackProvider>
      </Theme>
    </BrowserRouter>
  )
}
