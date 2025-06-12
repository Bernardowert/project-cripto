import styled from "styled-components";



const Main = styled.main `
    margin: 0 14px;

    form{
        width: 100%;
        display: flex;
        align-items: center;
        gap: 24px;
        input{
            width: 100%;
            height: 44px;
            border: 0;
            padding-inline: 8px;
            border-radius: 4px;
        }

        button{
            background-color: transparent;
        }
    }


    table{
         border-spacing: 0 14px;
         margin: 0;
         padding: 0;
         width: 100%;
         table-layout: fixed;

         caption{
            font-size: 16px;
            margin: 0.5em 0 .75em;
         }
         
         thead{
                    th{
                    color: #fff;
                }
         }

        tbody{
             tr{
               background-color: #1d1c20;
                td{
                    font-weight: bold;
                    font-size: 18px;
                    color: #fff;
                }
             }
        }

        .tdProfit{
            color:#12f98a;
            font-weight: bold;
        }

        .tdLoss{
          color: #f91257;
          font-weight: bold;
        }

        td:first-child,
        th:first-child{
            border-radius: 8px 0 0 8px;
        }

        td:last-child,
        th:last-child{
            border-radius: 0 8px 8px 0;
        }

        th,td{
            padding: 14px;
            text-align: center;
        }
    }

    @media(max-width:600px){
       table{
          border: 0;
          thead{
             border: none;
             clip: rect(0 0 0 0);
             height: 1px;
             margin: -1px;
             overflow: hidden;
             position: absolute;
             width: 1px;
             padding: 0;
          }
          tr{
             border-bottom: 1px solid #DDD;
             display: block;
             margin-bottom: 14px;
          }
          td{
             display: block;
             border-bottom: 1px solid rgba(221,221,221,0.170);
             text-align: right;
             font-size: 14px;
          }
          td::before{
            content: attr(data-label);
            float: left;
            font-weight: bold;
            text-transform: uppercase;
          }
           td:first-child,
        th:first-child{
            border-radius: 0;
        }

        td:last-child,
        th:last-child{
            border-radius: 0;
        }
       }
    }
`

export {Main};