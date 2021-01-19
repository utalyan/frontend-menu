import React, { useEffect } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

export const Logout = () => {

    const {dispatchUser} = React.useContext(AuthContext)

    useEffect(() => {

        dispatchUser({type:'LOGIN_UPDATE',payload:{isLogged:false,token:null,username:null,surname:null,telephone:null,firmName:null,logo:null}})
    
    }, [])
    
    return (
        <div>
            <div style={{position:'absolute',left:'50%',right:'50%'}}>
                <h3>Yine bekleriz...</h3>
            </div>
            
        </div>
    )
}
