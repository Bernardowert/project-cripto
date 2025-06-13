import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { CoinProps } from "../home";


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
              })
          }catch(err){
            console.log(err);
            navigate("/");
          }
       }


       getCoin();
    }, [cripto])

  return (
     <div>
         <h1>{cripto}</h1>
     </div>
  )
}

