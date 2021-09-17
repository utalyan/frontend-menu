import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { foodDelete, foodGetList, foodSave, typeOfGetList } from '../shared/Api';
import {Dropdown} from 'primereact/dropdown'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/inputtext'
import {InputNumber} from 'primereact/inputnumber'
import {InputTextarea} from 'primereact/inputtextarea'
import empty from "../assets/img/empty.jpg"


function Food() {
    const [typeOfList,setTypeOfList] = React.useState([]);
    const [typeofSelected,setTypeofSelected] = React.useState({});
    const [foodList,setFoodList] = React.useState([]);
    const [selectedFood,setSelectedFood] = React.useState({});
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [editFood,setEditFood] = React.useState({});
    const [editMode,setEditMode] = React.useState(false);
    const [selectedImage,setSelectedImage] = React.useState();

    const initialFood = {id:"",name:"",servingGram:0,price:0,description:"",image:""};

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
        const {id} = typeofSelected;

        const getFoodList = async () => {
            try {
                const response = await foodGetList(id);

                setFoodList(response.data);
                
            } catch (error) {
                
            }
        }

        getFoodList();


    }, [typeofSelected])

    const onHandlerTypeOfSelect = (e) =>{
        //alert("onHandlerTypeOfSelect")
        const {id,name} = e.target.value;

        setTypeofSelected({id:id,name:name})
        
        setEditFood((prev)=>(
            {...editFood,typeOfId:id,typeOfName:name}
            
        ))

    }

    const onHandlerNew = () =>{

        if(!typeofSelected.id) {return}

        setEditFood(()=>({...initialFood,typeOfId:typeofSelected.id,typeOfName:typeofSelected.name}));
        setSelectedImage(null);
        setEditMode(true)
        setActiveIndex(1)
    }

    const onHandlerEdit = ()=>{

        setEditFood(selectedFood);
        setSelectedImage(selectedFood.image)
        setEditMode(true)
        setActiveIndex(1)

    }

    const onHandlerSave = async ()=>{
        try {
            
            const result = await foodSave(editFood)

            if (editFood.id){
                let newList = foodList.map((food)=>{
                    if (food.id === editFood.id){
                        return editFood;
                    }
                    return food;
                })

                setFoodList(newList);

            }else{
                setFoodList([...foodList,result.data])
            }
        } catch (error) {
            
        }
    }

    const onHandlerDelete = () =>{

        if (editFood.id){
            try {
                
                const response = foodDelete(editFood.id)
                
            } catch (error) {
                
            }
        }

    }

    const onChangeForm = (e)=>{
        const {name,value} = e.target

        setEditFood({...editFood,[name]:value})

    }

    const onHandlerCancel = () =>{
        setEditMode(false)
        setActiveIndex(0)
    }

    const onHandlerSelectImage = (e) =>{

        if (e.target.files[0]) {
            const reader =new FileReader();
            reader.onload = () =>{
                setSelectedImage(reader.result)
                const image = reader.result.split(",")[1]

                setEditFood({...editFood,image})
    
            }
    
            reader.readAsDataURL(e.target.files[0])
                
        }else {
            setSelectedImage(null)
        }
        
    }

    return (
        <div className="p-fluid p-grid p-mt-1">
            <div className="p-col-12 p-md-4 p-md-offset-4">
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel header="Ara" leftIcon="pi pi-search-plus" disabled={editMode} >
                            <div style={{display:'flex',justifyContent:'flex-end'}}>
                                <Button icon="pi pi-pencil" className="p-button-danger p-ml-2" onClick={onHandlerEdit} />
                                <Button icon="pi pi-plus" className="p-button-danger p-ml-2" onClick ={onHandlerNew} />
                            </div>
                            <Dropdown style={{width:'100%',marginTop:'15px'}} id="typeof" options={typeOfList} optionLabel="name" value={typeofSelected} onChange={onHandlerTypeOfSelect} />
                            <div style={{backgroundColor:'ButtonFace',textAlign:'justify',height:'30px',marginTop:'10px'}}>Yemekler</div>
                            <DataTable value={foodList} selection={selectedFood} onSelectionChange = {(e) => setSelectedFood(e.value)} selectionMode="single">
                                <Column header="Kodu" field="id" style={{width:"10%",textAlign:'center'}}/>
                                <Column header="Adı" field="name" style={{width:"35%",textAlign:'center'}}/>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Detay" leftIcon='pi pi-folder-open' disabled={!editMode}>
                            <div style={{display:'flex'}} >
                                <div style={{flex:'50%'}}>
                                    <Button icon="pi pi-save"  className="p-button-success "  onClick ={onHandlerSave}  />
                                    <Button icon="pi pi-trash"  className="p-button-danger p-ml-2"  onClick = {onHandlerDelete} />
                                </div>
                                <div style={{flex:'50%',textAlign:'end'}}>
                                    <Button icon="pi pi-arrow-circle-up" className="p-button-success "  onClick ={onHandlerCancel}  />
                                </div>

                            </div>

                            <div style={{display:'flex',alignItems:'center', backgroundColor:'ButtonFace',height:'30px',marginTop:'5px'}}>Detay Bilgileri</div>
                            <div className="p-formgrid p-grid ">
                                <div className="p-field p-col-12 ">
                                    <label htmlFor="typeOfName" >Yemek Türü</label>
                                    <InputText id="typeOfName"  type="text" name = "typeOfName" value={typeofSelected.name} disabled className="p-inputtext-sm"/>
                                </div>

                                <div className="p-field p-col-12 ">
                                    <label htmlFor="name" >Adı</label>
                                    <InputText id="name"  type="text" name = "name" value={editFood.name} onChange={onChangeForm} className="p-inputtext-sm"/>
                                </div>
                                <div className="p-field p-col-12 p-md-6  " >
                                    <label htmlFor="servingGram">Gram</label>
                                    <InputNumber className="p-inputtext-sm" name="servingGram" value={editFood.servingGram}  onValueChange={onChangeForm} mode="decimal" minFractionDigits={2} step={0.10} min={0} max={500} />
                                </div>
                                <div className="p-field p-col-12 p-md-6">
                                    <label htmlFor="price">Fiyat</label>
                                    <InputNumber className="p-inputtext-sm" name="price" value={editFood.price}  onValueChange={onChangeForm} mode="decimal" minFractionDigits={2} step={0.10} min={0} max={500} />
                                </div>
                                <div className="p-field p-col-12 ">
                                    <label htmlFor="description" >Açıklama</label>
                                    <InputTextarea rows={5} cols={30} name="description" value={editFood.description} onChange={onChangeForm} autoResize/>
                                </div>

                                <div className="p-col-12 p-md-6">
                                    <input type="file" onChange={onHandlerSelectImage}/>
                                </div>

                                <div className="p-col-12 p-md-2 p-md-offset-2" style={{}}>
                                    <img alt="eat" src={selectedImage || empty} height="100px" />
                                </div>

                            </div>
                        </TabPanel>
                    </TabView>
            </div>
            
        </div>
    )
}

export default Food
