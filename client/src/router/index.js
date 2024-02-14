import React from "react"
import { Navigate } from "react-router-dom"

const Home = React.lazy(() => import("../views/home/index"))
const Websocket = React.lazy(() => import("../views/websocket/index"))
const Rabbitmq = React.lazy(() => import("../views/rabbitmq/index"))

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
        path: "/websocket",
        element:<Websocket/>
    },
    {
        path: "/rabbitmq",
        element:<Rabbitmq/>
    }
]

export default routes