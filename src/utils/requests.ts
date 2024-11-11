import axios from "axios"
import { API } from "../config"

export const getDeliverers = async() => {
    const result = await axios.get(`${API}api/delivery`);
    return result.data;
}

export const updateDeliverer = (id: number, data: Object) =>{
    try{
        axios.patch(`${API}api/delivery/${id}`, data);
        return true
    }
    catch(err){
        console.log(err);
        return false
    }
}