import axios from 'axios';

export const requestLogin = async (user) => {
    try{
        return await axios.post("https://mis-libros-bck.herokuapp.com/login", user);
    }catch(e){
        console.log(e);
    }
}