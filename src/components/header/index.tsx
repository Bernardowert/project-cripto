
import { HeaderWrapper } from "./style";
import logoImg from "../../assets/logo.svg"
import { Link } from "react-router";
export function Header(){
    return(
        <HeaderWrapper>
           <Link to="/"><img src={logoImg} alt="logo" /></Link>
        </HeaderWrapper>
    )
}