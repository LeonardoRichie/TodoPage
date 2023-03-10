const AlertMessage = ({alertState, newName, btnClicked}) => {
    console.log(`alertState: ${alertState}`)
    if(newName === '') {
        return(
            <p></p>
        )
    }
    else if(alertState === 1) {
        btnClicked = false
        return(
            <p>{newName} activity already exist.</p>
        )
    }
    else {
        return(
            <p></p>
        )
    }
}

export default AlertMessage