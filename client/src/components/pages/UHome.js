import React from "react"

const UHome = (props) => {
    return props.universe ? (<h1>Welcome to universe: {props.universe.name}</h1>) : (<h1>Please select a universe in the dashboard!</h1>)
}

export default UHome; 