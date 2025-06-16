import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { CoinProps } from "../home";
import styles from "./detail.module.css"


interface ResponseData {
    data:CoinProps;
}


interface ErrorData{
    error:string;
}

type DataProps = ResponseData | ErrorData;

export function Detail() {

    const {cripto} = useParams();
    const navigate = useNavigate();
    const[coin,setCoin] = useState<CoinProps>();
    const[loading,setLoading] = useState(true);
    useEffect(() => {
       async function getCoin(){
          try{
              fetch(`https://rest.coincap.io/v3/assets/${cripto}?apiKey=406c75bc5a972308a8783b61c9c6637ceb9c4a1d04708389a883160aacb9f0fc`)
              .then(response => response.json())
              .then((data:DataProps) => {
                  if("error" in data){
                     navigate("/");
                     return;
                  }
                        const price = Intl.NumberFormat("en-US",{
                    style:"currency",
                    currency: "USD"
                })
                const priceCompact = Intl.NumberFormat("en-US",{
                    style:"currency",
                    currency: "USD",
                    notation: "compact"
                })

                const resultData = {
                    ...data.data,
                    formatedPrice: price.format(Number(data.data.priceUsd)),
                  formatedMarket: priceCompact.format(Number(data.data.priceUsd)),
                  formatedVolume: priceCompact.format(Number(data.data.volumeUsd24Hr))
                }

                setCoin(resultData);
                setLoading(false);
              })
          }catch(err){
            console.log(err);
            navigate("/");
          }
       }


       getCoin();
    }, [cripto])


    if(loading || !coin){
        return(
            <div className={styles.container}>
                <h4 className={styles.center}>carregando detalhes</h4>
            </div>
        )
    }

  return (
     <div className={styles.container}>
        <h2 className={styles.center}>{coin?.name}</h2>
        <h2 className={styles.center}>{coin?.symbol}</h2>

        <section className={styles.content}>
          <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLowerCase()}@2x.png`} 
          alt={coin?.name}
          className={styles.logo}
           />
           <h2>{coin?.name} | {coin?.symbol}</h2>

           <p><strong>Preço: </strong>{coin?.formatedPrice}</p>
        
           <a >
              <strong>Mercado: </strong> {coin?.formatedMarket}
           </a>
             <a >
              <strong>Volume: </strong> {coin?.formatedVolume}
           </a>
           <a >
              <strong>Mudanca 24h: </strong> <span className={Number(coin?.changePercent24Hr) > 0 ? styles.profit : styles.loss}>{Number(coin?.changePercent24Hr).toFixed(3)}</span>
           </a>
        </section>
     </div>
  )
}

