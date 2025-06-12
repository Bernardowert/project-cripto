import { Link } from "react-router";
import { Main } from "./style";
import { BsSearch } from "react-icons/bs";
export function Home() {


  return (
     <Main>
        <form>
             <input 
             type="text" 
             placeholder="Digite da moeda... EX:Bitcoin" />
        
          <button>
            <BsSearch size={30} color="#fff"/>
          </button>
        </form>

        <table>
            <thead>
                <tr>
                    <th scope="col">Moeda</th>
                    <th scope="col">Valor Mercado</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Volume</th>
                    <th scope="col">Mudanca 24h</th>
                </tr>
            </thead>
            <tbody>
                <tr>

                    <td data-label="Moeda">
                        <div>
                             <Link to={"/detail/bitcoin"}>
                             <span>Bitcoin</span> | BTC
                            </Link>
                        </div>
                    </td>

                    <td data-label="Valor Mercado">
                         1T
                    </td>

                      <td data-label="Preço">
                         8.000
                    </td>

                      <td data-label="Volume">
                         2B
                    </td>

                     <td className="tdProfit" data-label="Mudanca 24h">
                         <span>1.20</span>
                    </td>

                </tr>
            </tbody>
        </table>
     </Main>
  )
}

