import React from 'react'
import {AuthContext} from '../context/AuthContextProvider'

export const Homepage = () => {

    const {user} = React.useContext(AuthContext);

    const {logo,firmName} = user;

    return (
        <div className="p-grid">
            <div className="p-col-4 p-md-4 p-offset-4 ">
                <div className="p-col-12 " style={{textAlign: 'center'}}>
                    <h1>{firmName} Hoşgeldiniz </h1>
                    <img src={logo} alt="firmlogo" width="200px" />
                </div>
            </div>
        </div>
    )
}
