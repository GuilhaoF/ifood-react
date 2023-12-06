import { Title } from "./styles";
import { ReactNode } from 'react'


interface SnackTitleProps {
    children: ReactNode;
  }

export function SnackTitle({ children }: SnackTitleProps){
    return <Title>{children}</Title>
}