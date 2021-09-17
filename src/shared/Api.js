import Axios from 'axios'

export const getCity = () =>
{
    return Axios.get("/api/1.0/city");
}

export const getCounty = (cityId) =>
{
    return Axios.get(`/api/1.0/countys/${cityId}`);
}

export  const firmCreate = (firm) =>
{
    return Axios.post("/api/1.0/firms",firm)

}

export const userCreate = (user) =>{
    return Axios.post("/api/1.0/users",user);
}

export const login = creds =>{
    return Axios.post("/api/1.0/auth",creds);
}

export const repast = () =>{
    return Axios.get("/api/1.0/repasts");
}

export const repastUpdate =(repast) =>{
    return Axios.post("/api/1.0/repasts",repast);
}

export const repastDelete = (id) =>{
    return Axios.delete(`/api/1.0/repasts/${id}`)
} 

export const typeOfGetList = () =>{
    return Axios.get("/api/1.0/typeof")
}

export const typeOfUpdate = (typeOfUpdate) =>{
    return Axios.post("/api/1.0/typeof",typeOfUpdate)
}

export const typeOfDelete = (id) =>{
    return Axios.delete(`/api/1.0/typeof/${id}`)
}

export const servingGetList = () =>{
    return Axios.get("/api/1.0/serving");
}

export const servingUpdate = (servingUpdate) =>{
    return Axios.post("/api/1.0/serving",servingUpdate);
}

export const servingDelete = (id) =>{
    return Axios.delete(`/api/1.0/serving/${id}`)
}

export const additionGetList = (id) =>{
    return Axios.get(`/api/1.0/additions/${id}`)
}

export const additionSave=(addition) =>{
    return Axios.post("/api/1.0/additions",addition)
}

export const additionDelete = (id)=>{
    return Axios.delete(`/api/1.0/additions/${id}`)
}

export const foodGetList = (typeOfId) =>{
    return Axios.get(`/api/1.0/foods/${typeOfId}`)
}

export const foodSave = (food) =>{
    return Axios.post("/api/1.0/foods/",food)
}

export const foodDelete = (id) =>{
    return Axios.delete(`/api/1.0/foods/${id}`)
}
export const setAuthorizationHeader = ({token,isLogged}) => {

    if (isLogged)
    {
        const authorizationHeaderValue = `Bearer ${token}`;
        Axios.defaults.headers['Authorization'] = authorizationHeaderValue   ; 
    }else
    {
        delete Axios.defaults.headers['Authorization'];
    }
}