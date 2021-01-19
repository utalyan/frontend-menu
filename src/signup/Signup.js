import { InputText } from 'primereact/inputtext'
import React from 'react'
import { firmCreate, getCity, getCounty } from '../shared/Api'
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';

export const Signup = (props) => {
    const [city,setCity]  = React.useState([])
    const [county,setCounty] = React.useState([])
    const [status,setStatus] = React.useState(false)
    const initialize = {name:null,email:null,password:null,responsibleName:null,telephone:null,address:null,cityId:null,countyId:null}
    const [firm,setFirm] = React.useState(initialize);
    const [error,setError] = React.useState({})
    const [errorFound,seterrorFound] = React.useState(false)
    const [selectedFile,setSelectedFile] = React.useState(null);
    const [selectedCityId,setSelectedCityId] = React.useState(null);
    const [selectedCountyId,setSelectedCountyId] = React.useState(null);

    React.useEffect(() => {

        const getCityFromApi= async ()=>
        {
            setStatus(true);
            try {
                const response =await getCity();
                
                setCity(response.data);
    
            } catch (error) {
               
            }
            setStatus(false);
        }
        getCityFromApi();

    }, [])

    const getCountyByCityId = async (cityId) => {
        setStatus(true);
        try {
            
            const response = await getCounty(cityId);

            setCounty(response.data);

        } catch (error) {
            
        }
        setStatus(false);
    }
    const onChangeSelectedCity = (e) => {

        const {id:cityId,name} = e.target.value;

        delete error[name]

        let dd = Object.keys(error).length === 0 && error.constructor === Object
        if (dd) seterrorFound(false)


        /*setError((prevError) => ({...prevError,[e.target.name]:undefined}))*/
        setFirm((prevFirm) => ({...prevFirm,cityId:e.target.value.id}))
        setFirm((prevFirm) => ({...prevFirm,countyId:0}))

        setSelectedCityId(e.value)
        getCountyByCityId(cityId);

    }

    const onChangeSelectedCounty = (e) =>{
        const {id:countyId,name} = e.target.value;
        setFirm({...firm,countyId});
        setSelectedCountyId(e.value)
    }
    const onChangeForm = e => {
        const {name,value} = e.target;
        delete error[e.target.name]

        let dd = Object.keys(error).length === 0 && error.constructor === Object
        if (dd) seterrorFound(false)

        setFirm({...firm,[name]:value})
    }

    const onHandleSubmit = async (e) =>{

        setStatus(true);
        try {

            if (selectedFile)
            {
                const logo = selectedFile.split(",")[1]
                setFirm({...firm,logo})

            }

            await firmCreate(firm)

            props.history.push({pathname:"/login",username:firm.email})

        } catch (error) {

            setError(error.response.data.validationErrors)
            seterrorFound(true);
            
        }
        setStatus(false);
    }

    const onFileChange = (e) =>{
        const selectedFile = e.target.files[0]

        if (selectedFile)
        {
            const fileReader = new FileReader();

            fileReader.onloadend = () =>{
                setSelectedFile(fileReader.result);
            }

            fileReader.readAsDataURL(selectedFile);
        } else {
            setSelectedFile(null);
        }
        
    }
    const {name,email,password,telephone,responsibleName, address} = firm;
    const {name:error_name,email:error_email,cityId,countyId,address:error_address,telephone:error_telephone,responsibleName:error_responsibleName,password:error_password} = error;

    return (
        <div>
            <div className="p-fluid p-grid">
                <div className="p-col-10 p-offset-1 p-md-6 p-md-offset-3 p-shadow-1 p-my-3">
                    <div className="p-formgrid p-grid ">
                        <div className="p-md-2 p-md-offset-5 p-py-0" >
                            <span style={{fontSize:"22px"}}>Firma Tanım</span>
                        </div>
                        <div className="p-field p-col-12 ">
                            <label htmlFor="firmname" >Adı</label>
                            <InputText id="firmname"  type="text" name = "name" value={name} onChange={onChangeForm} className={error_name?"p-inputtext-sm p-invalid":"p-inputtext-sm"}/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="email">E-mail</label>
                            <InputText id="email" type="text" name = "email" value={email} onChange={onChangeForm} className={error_email?"p-inputtext-sm p-invalid":"p-inputtext-sm"}/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="password">Şifre</label>
                            <Password id="password" type="text" name = "password" value={password} onChange={onChangeForm} className={error_password?"p-inputtext-sm p-invalid":"p-inputtext-sm"}/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="yetkili">Yetkili</label>
                            <InputText id="yetkili" type="text" name = "responsibleName" value={responsibleName} onChange={onChangeForm} className={error_responsibleName?"p-inputtext-sm p-invalid":"p-inputtext-sm"}/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="telefon">Telefon</label>
                            <InputMask id="telefon" type="text" mask="(999) 999-9999" name = "telephone" value={telephone} onChange={onChangeForm} className={error_telephone?"p-inputtext-sm p-invalid":"p-inputtext-sm"}/>
                        </div>
                        <div className="p-field p-col-12">
                            <label htmlFor="address">Adres</label>
                            <InputTextarea id="address" type="text" rows="2" name = "address" value={address} onChange={onChangeForm} className={error_address?"p-inputtext-sm p-invalid":"p-inputtext-sm"}/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="city">City</label>
                            <Dropdown inputId="city" value={selectedCityId} options={city} onChange={onChangeSelectedCity} placeholder="Select" optionLabel="name" className={cityId?"p-inputtext-sm p-invalid":"p-inputtext-sm"}/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="county">İlçe</label>
                            <Dropdown inputId="county" value={selectedCountyId} options={county} onChange={onChangeSelectedCounty} placeholder="Select" optionLabel="name" className={countyId?"p-inputtext-sm p-invalid":"p-inputtext-sm"}/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <input type="file" className ="ml-3" onChange={onFileChange}/>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <img src={selectedFile} alt="logo" height="50px"/>
                        </div>
                        <div className="p-col-12 p-md-3">
                            <Button label="Kaydet" className="p-button-primary p-button-sm" onClick={onHandleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
