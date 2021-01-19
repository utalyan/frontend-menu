import React from 'react'
import { login } from '../shared/Api';
import { AuthContext } from '../context/AuthContextProvider';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';

export const Login = (props) => {

    const init = {username:null,password:null};
    const [creds,setCreds] = React.useState(init);
    const [error,setError] = React.useState();
    const {dispatchUser} = React.useContext(AuthContext);
    const [status,setStatus] = React.useState(false)


    const onChangeForm = e =>{
        setError(null);

        const {name,value} = e.target;

        setCreds({...creds,[name]:value});
    }


    const onClickLogin = async (e) =>{
        e.preventDefault()

        setStatus(true);

        try {

            const response = await login(creds);
            const {token,userVM} = response.data;
            const {username,surname,telephone,firmName,logo} = userVM;

            dispatchUser({type:'LOGIN_UPDATE',payload:{isLogged:true,token,username,surname,telephone,firmName,logo}})

            props.history.push("/")

            
        } catch (error) {
            const {status,message} = error.response.data;

            setError(status + " " + message);            
        }

        setStatus(false);

    }
    const {username,password} = creds;

    const disabled = username && password;

    return (
        <div>
            <div className="p-fluid p-grid">
                <div className="p-col-10 p-offset-1 p-md-4 p-md-offset-4 p-shadow-1 p-my-3">
                    <div className="p-formgrid p-grid ">
                        <div className="p-md-4 p-md-offset-4 p-py-0" >
                            <span style={{fontSize:"22px"}}>Kullanıcı Giriş</span>
                        </div>
                        <div className="p-field p-col-12 ">
                            <label htmlFor="firmname" >Adı</label>
                            <InputText id="firmname"  type="text" name = "username" value={username}  onChange={onChangeForm} className="p-inputtext-sm"/>
                        </div>
                        <div className="p-field p-col-12 p-md-12">
                            <label htmlFor="email">Şifre</label>
                            <InputText id="email" type="password" name = "password" value={password} onChange={onChangeForm} className="p-inputtext-sm"/>
                        </div>
                        <div className="p-col-12 p-md-3">
                            <Button label="Kaydet" className="p-button-primary p-button-sm" disabled={!disabled} onClick={onClickLogin} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
