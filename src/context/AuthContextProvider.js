import React from 'react'
import { setAuthorizationHeader } from '../shared/Api';
import { AuthReducer } from './AuthReducer';

export const AuthContext = React.createContext();

export const AuthContextProvider = (props) => {

    const initialState = {
        isLogged:false,
        token:null,
        username:null,
        surname:null,
        telephone:null,
        firmName:null,
        logo:null
    }

    const [user, dispatchUser] = React.useReducer(AuthReducer,{},()=>{return (initialState)});

    setAuthorizationHeader(user);
    
    return (
        <AuthContext.Provider value={{user,dispatchUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}
