import styles from "./styles.module.scss";
import { SetupAPIClient } from "@/services/api";
import {useState, FormEvent, use} from 'react'
import { toast } from "react-toastify";


export function register(){
const [user, setUser] = useState ('');

function refreshPage(){
    setTimeout(()=>{
        window.location.reload();
    },2000)
}
async function handleRegiser(e: FormEvent){
    e.preventDefault();
    const setupApi = SetupAPIClient();
    if (user.length <7){
        toast.warning('Mínimo 7 caracteres');
        return;
    }
    try{
        await setupApi.post('/create',{
            Userid:user
        })
    toast.success('Cadastrado com sucesso!')
    refreshPage();
}catch(err){
        toast.error('User já existe!')
        console.log('Error');
    }
}


    return(
        <div className={styles.container}>
            <p>Crie um códgio</p>
            <form onSubmit={handleRegiser}>
                <input type="password" placeholder="min-7 caracteres" value={user} onChange={(e)=>setUser(e.target.value)}/>
                <button type="submit">Cadastrar</button>
            </form>  
         
        </div>
    )
}