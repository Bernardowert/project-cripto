import { Link, useNavigate } from "react-router";
import { Main } from "./style";
import { BsSearch } from "react-icons/bs";
import { useEffect, useState, type FormEvent } from "react";


interface CoinProps{
    id:string;
    name:string;
    symbol:string;
    priceUsd:string;
    vwap24Hr:string;
    changePercent24Hr:string;
    rank:string;
    supply:string;
    maxSupply:string;
    marketCapUsd:string;
    volumeUsd24Hr:string;
    explorer:string;
    formatedPrice?:string;
    formatedMarket?:string;
    formatedVolume?:string;
}


interface DataProp{
    data: CoinProps[];
}

export function Home() {
  const[input,setInput] = useState("");
  const[coins, setCoins] = useState<CoinProps[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
       getData();
  },[])


  async function getData(){
      fetch("https://rest.coincap.io/v3/assets?limit=10&offset=0&apiKey=406c75bc5a972308a8783b61c9c6637ceb9c4a1d04708389a883160aacb9f0fc")
      .then(response => response.json())
      .then((data:DataProp) =>{
          const coinsData = data.data;
              
          const price = Intl.NumberFormat("en-US",{
            style:"currency",
            currency: "USD"
          })
          const priceCompact = Intl.NumberFormat("en-US",{
            style:"currency",
            currency: "USD",
            notation: "compact"
          })
          const formatedResult = coinsData.map((item) =>{
               const formated = {
                  ...item,
                  formatedPrice: price.format(Number(item.priceUsd)),
                  formatedMarket: priceCompact.format(Number(item.priceUsd)),
                  formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
                }

               return formated;
          })


          setCoins(formatedResult);
      })
  }

   function handleSubmit(e:FormEvent){
       e.preventDefault();

       if(input === "") return;

        navigate(`/detail/${input}`);
   }


   function handleGetMore(){
      console.log("teste");
   }


  return (
     <Main>
        <form onSubmit={handleSubmit}>
             <input 
             type="text" 
             placeholder="Digite da moeda... EX:Bitcoin"
             value={input}
             onChange={({target}) => setInput(target.value)}
             />
        
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
               {
                  coins.length > 0 && coins.map((item) =>(
                       <tr key={item.id}>

                    <td data-label="Moeda">
                        <div>
                            <img src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} alt="Logo" />
                             <Link to={`/detail/${item.id}`}>
                             <span>{item.name}</span> | {item.symbol}
                            </Link>
                        </div>
                    </td>

                    <td data-label="Valor Mercado">
                         {item.formatedMarket}
                    </td>

                      <td data-label="Preço">
                         {item.formatedPrice}
                    </td>

                      <td data-label="Volume">
                         {item.formatedVolume}
                    </td>

                     <td className={Number(item.changePercent24Hr) > 0 ? "tdProfit" : "tdLoss"} data-label="Mudanca 24h">
                         <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                    </td>

                </tr>
                  ))
               }
            </tbody>
        </table>
        <button onClick={handleGetMore}>Load More</button>
     </Main>
  )
}

