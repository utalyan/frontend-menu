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