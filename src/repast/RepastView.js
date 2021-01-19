import React from 'react'
import {repast} from '../shared/Api'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { confirmDialog } from 'primereact/confirmdialog';

export const RepastView = () => {

    const [repastList,setRepastList] = React.useState([]);
    const [selectedRepast,setSelectedRepast] = React.useState({});

    React.useEffect(() => {

        const getData  = async ()=>{
            try {
                const response = await repast();

                setRepastList(response.data)
                
            } catch (error) {
                
            }
        }
    
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

    const save = () => {
        //setProduct({...product});
        //setProductDialog(true);

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Saved', life: 3000 });
    }

    const reject = () => {
        //setProduct({...product});
        //setProductDialog(true);

        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Rejected', life: 3000 });
    }

    const confirmDelete = () => {
        //setProduct(product);
        //setDeleteProductDialog(true);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Accepted', life: 3000 });
    }

    const leftContents = (
        <React.Fragment>
            <Button icon="pi pi-save" className="p-button-success p-mr-2" onClick={save} />
            <Button icon="pi pi-trash" className="p-button-danger" onClick={confirm}/>
        </React.Fragment>
    );

    return (
        <div className = "d-grid">
            <Toast ref={toast} position="top-left"/>
            <div className=" p-col-12 p-md-4 p-md-offset-4">
                <div style={{height:'30px',backgroundColor:'ButtonFace'}}>Düzenle</div>
                <div className="p-field ">
                    {selectedRepast && <InputText style={{width:'20%'}} disabled value={selectedRepast.id } />}
                    {selectedRepast && <InputText style={{width:'80%'}} value={selectedRepast.name } />}
                </div>
                <Toolbar left={leftContents} />
                <h5>Öğün Tanım</h5>
                <DataTable value={repastList} className="p-datatable-sm" selection={selectedRepast} onSelectionChange={e => setSelectedRepast(e.value)} selectionMode="single" dataKey="id">
                    <Column field="id"  header="Kodu" style={{width:'20%'}} ></Column>
                    <Column field="name" header="Adı" ></Column>
                </DataTable>
            </div>
        </div>
    )
}
