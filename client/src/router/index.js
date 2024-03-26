import React from "react"
import { Navigate } from "react-router-dom"

const Home = React.lazy(() => import("../views/home/index"))
const Websockets = React.lazy(() => import("../views/websockets/index"))
const Rabbitmq = React.lazy(() => import("../views/rabbitmq/index"))
const Rediscache = React.lazy(() => import("../views/rediscache/index"))
const Qps = React.lazy(() => import("../views/qps/index"))

const routes = [
    {
        path: "/",
        element: <Navigate to="/home"/>
    },
    {
        path: "/home",
        element:<Home/>
    },
    {
        path: "/websockets",
        element:<Websockets/>
    },
    {
        path: "/rabbitmq",
        element:<Rabbitmq/>
    },
    {
        path: "/rediscache",
        element:<Rediscache/>
    },
    {
        path: "/qps",
        element:<Qps/>
    }
]

export default routes