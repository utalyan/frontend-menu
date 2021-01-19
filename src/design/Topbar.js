import React from 'react'
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import  logoDefault from "../assets/img/logo.jpg" ;
import { AuthContext } from '../context/AuthContextProvider';


export const Topbar = () => {

    const {user} = React.useContext(AuthContext);

    const {isLogged,username,firmName,logo} = user;
    let logoCurrent = logo;


    if (!logo)
    {
        logoCurrent = logoDefault;
    }
    let retValue ;


    const items = [
        {
            label: 'İşlemler',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Üye Ol',
                    icon: 'pi pi-fw pi-user-plus',
                    command: (event) => {
                        window.location.hash = "/signup";
                    }

                },
                {
                    label: 'Giriş',
                    icon: 'pi pi-fw pi-user-minus',
                    command: (event) => {
                        window.location.hash = "/login";
                    }

                }
            ]
        }
    ];

    const itemsLogged = [
        {
            label: 'İşlemler',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Öğün Tanım',
                    icon: 'pi pi-fw pi-user-plus',
                    command: (event) => {
                        window.location.hash = "/repast";
                    }

                },
                {
                    label: 'Tür Tanım',
                    icon: 'pi pi-fw pi-user-minus',
                    command: (event) => {
                        window.location.hash = "/login";
                    }

                },
                {
                    label: 'Porsiyon Tanım',
                    icon: 'pi pi-fw pi-user-minus',
                    command: (event) => {
                        window.location.hash = "/login";
                    }

                },
                {
                    label: 'İsteğe Bağlı Ek Tanım',
                    icon: 'pi pi-fw pi-user-minus',
                    command: (event) => {
                        window.location.hash = "/login";
                    }

                },
                {
                    label: 'Yemek Tanım',
                    icon: 'pi pi-fw pi-user-minus',
                    command: (event) => {
                        window.location.hash = "/login";
                    }

                },
                {
                    label: 'Menü Tanım',
                    icon: 'pi pi-fw pi-user-minus',
                    command: (event) => {
                        window.location.hash = "/login";
                    }

                }


            ]
        },
        {
            label: 'Çıkış',
            icon: 'pi pi-fw pi-power-off',
            command: (event) => {
                window.location.hash = "/signout";
            }
        }
    ];

    const start = <img alt="logo" src={logoCurrent} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="50" className="p-mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;

    return (
        <div>
            
            <div className="card">
                <Menubar model={isLogged?itemsLogged:items} start={start} end={end}   />
            </div>
        </div>

        
    );
}
