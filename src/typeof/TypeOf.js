import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { typeOfGetList,typeOfDelete,typeOfUpdate } from '../shared/Api';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

export const TypeOf = () => {

    const [typeOfList,setTypeOfList] = React.useState([]);
    const [selectedTypeOf,setSelectedTypeOf] = React.useState({});
    const initTypeOf = {id:"",name:""}
    const [editTypeOf,setEditTypeOf] = React.useState({});
    const [editMode,setEditMode] = React.useState(false);


    const getData  = async ()=>{
        try {
            const response = await typeOfGetList();

            setTypeOfList(response.data)
            
        } catch (error) {
            
        }
    }

    React.useEffect(() => {

    
        getData();
    
    
    }, [])


    const save = async () =>{

        try {
            const response =await typeOfUpdate(editTypeOf);

            let newList
            if (editTypeOf.id !== ""){
                            newList = typeOfList.map(repast => {
                                if (repast.id === editTypeOf.id){
                                    repast.name = editTypeOf.name;
                                }
                                return repast;
                                })
                                setTypeOfList(newList);
                            }else{
                                setTypeOfList([...typeOfList,response.data])
                            }
            

            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Saved', life: 3000 });

            setEditMode(false);
            setEditTypeOf(initTypeOf)

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

        if (!editTypeOf.id) {return }
        try {
           await typeOfDelete(editTypeOf.id)

            const newList = typeOfList.filter(repast => repast.id !== selectedTypeOf.id)

            setTypeOfList(newList);

            let typeOfNull = {id:undefined,name:undefined} 

            setSelectedTypeOf(typeOfNull);

            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Deleted', life: 3000 });

            setEditMode(false)
            setEditTypeOf(initTypeOf)

        } catch (error) {
            let retError = error.response.data.message;
            toast.current.show({ severity: 'danger', summary: 'UnSuccessful', detail: {retError}, life: 3000 });
        }
    }

    const toast = React.useRef(null);

    const newRepast = () =>{
        setEditMode(true);
        setEditTypeOf({id:"",name:""});
    }

    const onClickEditRepast = () =>{
        const {id,name} = selectedTypeOf;

        setEditTypeOf({id,name});
        setEditMode(true);
    }

    const {id,name} = editTypeOf;

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

        setEditTypeOf({...editTypeOf,[name]:value});

    }

    return (
        <div className="d-grid">
            <Toast ref={toast} position="top-left"/>
            <div className="p-col-12 p-md-4 p-md-offset-4">
                <div style={{height:'30px',backgroundColor:'ButtonFace'}}>Düzenle</div>
                <div>
                    <InputText style={{width:'20%'}} disabled value={id} />
                    <InputText style={{width:'79%', marginLeft:'3px'}} name="name" value={name } disabled={!editMode} onChange={onChange} />
                </div>
                <Toolbar left={leftContents} right={rightContents} />
                <h5>Yemek Türü</h5>
                <DataTable value={typeOfList} className="p-datatable-sm" selection={selectedTypeOf} onSelectionChange={e => setSelectedTypeOf(e.value)} selectionMode="single" dataKey="id">
                    <Column field="id"  header="Kodu" style={{width:'20%'}} ></Column>
                    <Column field="name" header="Adı" ></Column>
                </DataTable>

            </div>
        </div>
    )
}
