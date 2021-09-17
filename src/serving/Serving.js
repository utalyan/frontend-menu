import React from 'react'
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { servingGetList,servingDelete,servingUpdate,typeOfGetList } from '../shared/Api';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import {Dropdown} from 'primereact/dropdown';

export const Serving = () => {
    const [servingList,setServingList] = React.useState([]);
    const [selectedServing,setSelectedServing] = React.useState({});
    const initServing = {id:"",typeOfId:"",name:"",nameTypeOf:"",factor:""}
    const [editServing,setEditServing] = React.useState({});
    const [editMode,setEditMode] = React.useState(false);
    const [selectedTypeOfId,setSelectedTypeOfId] = React.useState(null);
    const [typeOfList,setTypeOfList] = React.useState([])


    const getData  = async ()=>{
        try {
            const response = await servingGetList();

            setServingList(response.data)

            const response2 = await typeOfGetList();

            setTypeOfList(response2.data);
            
        } catch (error) {
            
        }
    }

    React.useEffect(() => {

    
        getData();
    
    
    }, [])


    const save = async () =>{

        try {
            const response =await servingUpdate(editServing);

            let newList
            if (editServing.id !== ""){
                            newList = servingList.map(serving => {
                                if (serving.id === editServing.id){
                                    serving.nameTypeOf = editServing.nameTypeOf;
                                    serving.typeOfId = editServing.typeOfId;
                                    serving.name = editServing.name;
                                    serving.factor = editServing.factor;
                                }
                                return serving;
                                })
                                setServingList(newList);
                            }else{
                                setServingList([...servingList,response.data])
                            }
            

            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Saved', life: 3000 });

            setEditMode(false);
            setEditServing(initServing)

        } catch (error) {
            let retError = error.response.data.message;
            toast.current.show({ severity: 'danger', summary: 'UnSuccessful', detail: {retError}, life: 3000 });
        }


    }

    const confirm = () => {
        confirmDialog({
            message: 'Kaydı silmek istiyor musun?',
            header: 'Dikkat',
            icon: 'pi pi-exclamation-triangle',
            accept: confirmDelete,
            reject: reject
        });
    }

    const reject = () => {

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rejected', life: 3000 });
    }

    const confirmDelete = async () => {
        //setProduct(product);
        //setDeleteProductDialog(true);

        if (!editServing.id) {return }
        try {
           await servingDelete(editServing.id)

            const newList = servingList.filter(serving => serving.id !== selectedServing.id)

            setServingList(newList);

            let servingNull = {initServing} 

            setSelectedServing(servingNull);

            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });

            setEditMode(false)
            setEditServing(initServing)

        } catch (error) {
            let retError = error.response.data.message;
            toast.current.show({ severity: 'danger', summary: 'UnSuccessful', detail: {retError}, life: 3000 });
        }
    }

    const toast = React.useRef(null);

    const newRepast = () =>{
        setEditMode(true);
        setEditServing({id:"",name:""});
    }

    const onClickEditRepast = () =>{
        const {id,name,typeOfId,factor,nameTypeOf} = selectedServing;

        setEditServing({id,name,typeOfId,factor,nameTypeOf});
        setSelectedTypeOfId({id:typeOfId,name:nameTypeOf})
        setEditMode(true);
    }

    const {id,name,typeOfId,factor} = editServing;

    let leftContents
    if (editMode){
        leftContents = (
        <React.Fragment>
            <Button icon="pi pi-save" className="p-button-success "  onClick={save} />
            <Button icon="pi pi-trash" className="p-button-danger p-ml-2"  onClick={confirm}/>
        </React.Fragment>
        );
    }else{
        leftContents = (
            <React.Fragment>
                <Button icon="pi pi-save" className="p-button-success " disabled onClick={save} />
                <Button icon="pi pi-trash" className="p-button-danger p-ml-2" disabled onClick={confirm}/>
            </React.Fragment>
            );
    
    }
            
 
    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-pencil" className="p-button-danger p-ml-2" onClick={onClickEditRepast}/>
            <Button icon="pi pi-plus" className="p-button-danger p-ml-2" onClick={newRepast}/>
        </React.Fragment>
    );

    const onChange = (e) => {
        const {name,value} = e.target;

        setEditServing({...editServing,[name]:value});

    }

    const onChangeSelectedTypeOf = (e) =>{

        const {id,value} = e.target;

        setEditServing({...editServing,typeOfId:value.id,nameTypeOf:value.name})
        setSelectedTypeOfId(e.value);

        console.log(e.value)
    }
    return (
        <div className="p-fluid p-grid">
            <Toast ref={toast} position="top-left"/>
            <div className="p-col-12 p-md-4 p-md-offset-4">
                <div style={{backgroundColor:'ButtonFace'}}>Düzenle</div>
                <div >
                    <InputText style={{width:'10%',float:'left'}} value={id} className="p-inputtext-sm" disabled  />
                    <Dropdown style={{width:'37%', marginLeft:'3px',float:'left'}} inputId="typeof" value={selectedTypeOfId} options={typeOfList} disabled={!editMode} onChange={onChangeSelectedTypeOf} placeholder="Select" optionLabel="name" className="p-inputtext-sm"/>
                    <InputText style={{width:'37%', marginLeft:'3px'}} className="p-inputtext-sm" name="name"  value={name } disabled={!editMode} onChange={onChange}/>
                    <InputNumber style={{width:'13%', marginLeft:'3px'}} className="p-inputtext-sm" name="factor" value={factor} disabled={!editMode} onValueChange={onChange} mode="decimal" minFractionDigits={1} step={0.5} min={0} max={3} />
                </div>
                <Toolbar left={leftContents} right={rightContents} />
                <h5>Porsiyon</h5>
                <DataTable value={servingList} className="p-datatable-sm" selection={selectedServing} onSelectionChange={e => setSelectedServing(e.value)} selectionMode="single" dataKey="id">
                    <Column field="id"  header="Kodu" style={{width:'10%'}} ></Column>
                    <Column field="nameTypeOf" header="Yemek Tipi" style={{width:'37%'}}></Column>
                    <Column field="name" header="Adı" style={{width:'37%'}}></Column>
                    <Column field="factor" header="Çarpan" style={{width:'13%'}}></Column>
                </DataTable>

            </div> 
        </div>
    )
}
