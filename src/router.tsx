import { createBrowserRouter } from "react-router";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";
import { NotFound } from "./pages/notfound";

const router = createBrowserRouter([
    {
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/detail/:cripto",
                element:<Detail/>
            },
            {
                path:"*",
                element:<NotFound/>
            }
        ]
    }
])


export {router}