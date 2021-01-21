import React from 'react'
import {repast} from '../shared/Api'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { confirmDialog } from 'primereact/confirmdialog';
import {repastUpdate,repastDelete} from '../shared/Api'

export const RepastView = () => {

    const [repastList,setRepastList] = React.useState([]);
    const [selectedRepast,setSelectedRepast] = React.useState({});
    const initRepast = {id:"",name:""}
    const [editRepast,setEditRepast] = React.useState({});
    const [editMode,setEditMode] = React.useState(false);
    
    const getData  = async ()=>{
        try {
            const response = await repast();

            setRepastList(response.data)
            
        } catch (error) {
            
        }
    }

    React.useEffect(() => {

    
        getData();
    
    
    }, [])
    
    const confirm = () => {
        confirmDialog({
            message: 'Kaydı silmek istiyor musun?',
            header: 'Dikkat',
            icon: 'pi pi-exclamation-triangle',
            accept: confirmDelete,
            reject: reject
        });
    }

    const toast = React.useRef(null);

    const save = async () => {

        try {
            const response =await repastUpdate(editRepast);

            let newList
            if (editRepast.id !== ""){
                            newList = repastList.map(repast => {
                                if (repast.id === editRepast.id){
                                    repast.name = editRepast.name;
                                }
                                return repast;
                                })
                                setRepastList(newList);
                            }else{
                                setRepastList([...repastList,response.data])
                            }
            

            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Saved', life: 3000 });

            setEditMode(false);
            setEditRepast(initRepast)

        } catch (error) {
            let retError = error.response.data.message;
            toast.current.show({ severity: 'danger', summary: 'UnSuccessful', detail: {retError}, life: 3000 });
        }
    }

    const reject = () => {

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rejected', life: 3000 });
    }

    const confirmDelete = async () => {
        //setProduct(product);
        //setDeleteProductDialog(true);

        if (!editRepast.id) {return }
        try {
           await repastDelete(editRepast.id)

            const newList = repastList.filter(repast => repast.id !== selectedRepast.id)

            setRepastList(newList);

            let repastNull = {id:undefined,name:undefined} 

            setSelectedRepast(repastNull);

            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });

            setEditMode(false)
            setEditRepast(initRepast)

        } catch (error) {
            let retError = error.response.data.message;
            toast.current.show({ severity: 'danger', summary: 'UnSuccessful', detail: {retError}, life: 3000 });
        }
    }

    const newRepast = () =>{
        setEditMode(true);
        setEditRepast({id:"",name:""});
    }

    const onClickEditRepast = () =>{
        const {id,name} = selectedRepast;

        setEditRepast({id,name});
        setEditMode(true);
    }

    const {id,name} = editRepast;

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

        setEditRepast({...editRepast,[name]:value});

    }

    console.log(name);

    return (
        <div className = "d-grid">
            <Toast ref={toast} position="top-left"/>
            <div className=" p-col-12 p-md-4 p-md-offset-4">
                <div style={{height:'30px',backgroundColor:'ButtonFace'}}>Düzenle</div>
                 <div className="p-field ">
                    <InputText style={{width:'20%'}} disabled value={id } />
                    <InputText style={{width:'80%'}} name="name" value={name } disabled={!editMode} onChange={onChange} />
                </div>
                <Toolbar left={leftContents} right={rightContents} />
                <h5>Öğün Tanım</h5>
                <DataTable value={repastList} className="p-datatable-sm" selection={selectedRepast} onSelectionChange={e => setSelectedRepast(e.value)} selectionMode="single" dataKey="id">
                    <Column field="id"  header="Kodu" style={{width:'20%'}} ></Column>
                    <Column field="name" header="Adı" ></Column>
                </DataTable>
            </div>
        </div>
    )
}
