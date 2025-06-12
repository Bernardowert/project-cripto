import type { ReactNode } from "react"
import { ContainerWrapper } from "./style"


interface IContainerProps{
    children: ReactNode
}


export function ContainerGRID({children}:IContainerProps){
    return(
       <ContainerWrapper className="ContainerGRID">
         {children}
       </ContainerWrapper>
    )
}