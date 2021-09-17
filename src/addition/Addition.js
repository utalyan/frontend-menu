import React from 'react'
import {InputText} from 'primereact/inputtext'
import {Toolbar} from 'primereact/toolbar'
import {Dropdown} from 'primereact/dropdown'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import { additionDelete, additionGetList, additionSave, typeOfGetList } from '../shared/Api'
import {Button} from 'primereact/button'
import {InputNumber} from "primereact/inputnumber"

export const Addition = () => {
    const [typeOfList,setTypeOfList] = React.useState([]);
    const [typeofSelected,setTypeofSelected] = React.useState({});
    const [additionList,setAdditionList] = React.useState([]);
    const [editMode,setEditMode] = React.useState(false);
    const [editAddition,setEditAddition] = React.useState({});
    const [selectedAdditon,setSelectedAddition] = React.useState({});

    const initialAddition = {id:"",name:"",amount:""}


    React.useEffect(() => {

        const getTypeOf = async () =>{
            try {
                const response = await typeOfGetList()

                setTypeOfList(response.data);

            } catch (error) {
                
            }
                
        }

        getTypeOf();
    }, [])


    React.useEffect(() => {

        const getAddition = async () =>{
        
            try {
                    const response = await additionGetList(typeofSelected.id);

                    setAdditionList(response.data);
            } catch (error) {
                
            }
        }

        getAddition();

    }, [typeofSelected])
    const onHandlerTypeOfSelect = (e) =>{
        //alert("onHandlerTypeOfSelect")
        const {id,name} = e.target.value;

        setTypeofSelected({id:id,name:name})
        setEditAddition((prev)=>(
            {...editAddition,typeOfId:id,typeOfName:name}
        ))

    }

    const onHandlerSave = async () =>{
        //alert("onHandlerSave")
        try {
            const response = await additionSave(editAddition)
            if (editAddition.id){
                const newList = additionList.map((item)=>{
                    if (item.id === editAddition.id){
                        return editAddition;
                    }else{
                        return item;
                    }
                })

                setAdditionList(newList);

            }else{
                setAdditionList((prev)=>(
                    [...prev,response.data]
                ))    
        }

        } catch (error) {
            
        }

        setEditMode(false)
    }

    const onHandlerDelete = async () =>{
        if (!editAddition.id){
            return
        }

        try {
            await additionDelete(editAddition.id)

            const newList = additionList.filter(item=>item.id !== editAddition.id)

            setAdditionList(newList);
        } catch (error) {
            
        }
        setEditMode(false)
    }
    let leftContents
    if (editMode){
        leftContents = (
            <React.Fragment>
                <Button icon="pi pi-save" className="p-button-success "  onClick ={onHandlerSave}  />
                <Button icon="pi pi-trash" className="p-button-danger p-ml-2"  onClick = {onHandlerDelete} />
            </React.Fragment>)

    }else{
        leftContents = (
            <React.Fragment>
                <Button icon="pi pi-save" className="p-button-success " disabled  />
                <Button icon="pi pi-trash" className="p-button-danger p-ml-2" disabled />
            </React.Fragment>)

    }
        
    const onHandlerEdit = () =>{
        //alert("onHandlerEdit")
        if (!typeofSelected.id){
            return
        }
        setEditAddition(selectedAdditon)
        setEditMode(true)
    }

    const onHandlerNew = () =>{
        //alert("onHandlerNew")
        if (!typeofSelected.id){
            return
        }

        setEditAddition((prev)=>(
            {...initialAddition,typeOfId:typeofSelected.id,typeOfName:typeofSelected.name}
        ))
        
        setEditMode(true)
    }

    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-pencil" className="p-button-danger p-ml-2" onClick={onHandlerEdit} />
            <Button icon="pi pi-plus" className="p-button-danger p-ml-2" onClick ={onHandlerNew} />
        </React.Fragment>
    );


    return (
        <div className="p-fluid p-grid">
            <div className="p-col-12 p-md-4 p-md-offset-4">
                    <div style={{backgroundColor:'ButtonFace',height:'30px',display:'flex',alignItems: "center"}}>Düzenle</div>
                    <div>
                        <InputText style={{width:'10%',float:'left'}} disabled value={editAddition.id}/>
                        <Dropdown style={{width:'35%',float:'left'}} disabled  options={typeOfList} optionLabel="name" value={typeofSelected} />
                        <InputText style={{width:'35%'}} disabled={!editMode} value={editAddition.name} name="name" onChange={(e)=>setEditAddition({...editAddition,"name":e.target.value})}/>
                        <InputNumber style={{width:'20%'}} disabled={!editMode} value = {editAddition.amount} onChange={(e)=>setEditAddition({...editAddition,"amount":e.value})} mode="decimal" minFractionDigits="2" maxFractionDigits="2"/>
                    </div>
                    <Toolbar left = {leftContents} right={rightContents}/>
                    <div style={{backgroundColor:'ButtonFace',textAlign:'justify',height:'30px',marginTop:'10px'}}>Ek Ürünler</div>
                    <Dropdown style={{width:'100%'}} id="typeof" options={typeOfList} optionLabel="name" value={typeofSelected} onChange={onHandlerTypeOfSelect} />
                    <DataTable value={additionList} selection={selectedAdditon} onSelectionChange = {(e) => setSelectedAddition(e.value)} selectionMode="single">
                        <Column header="Kodu" field="id" style={{width:"10%",textAlign:'center'}}/>
                        <Column header= "Tipi" field="typeOfName" style={{width:"35%",textAlign:'center'}}/>
                        <Column header="Adı" field="name" style={{width:"35%",textAlign:'center'}}/>
                        <Column header="Fiyatı" field="amount" style={{width:"20%",textAlign:'center'}}/>
                    </DataTable>
            </div>
        </div>
    )
}
