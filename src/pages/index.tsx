import Head from 'next/head';
import  style  from  '@/styles/Home.module.scss'
import { Header } from '@/components/header';
import Link from 'next/link';
import {AiOutlineArrowRight, AiFillGithub, AiOutlinePlusCircle } from 'react-icons/ai';
import Modal from "react-modal";
import { SetupAPIClient } from '@/services/api';
import {useState, FormEvent, useEffect} from "react";
import { toast } from "react-toastify";
import {BsTrash3} from "react-icons/bs";
import { Loading } from '@/components/loading';


type ProjectProps = {
  name:string;
  description:string
  git:string;
  code:string
  id:string
}

export default function Home() {

const [project, setProject] = useState<ProjectProps[]>([]);
const [modalProject, setModalProject] = useState(false);
const [nome, setNome] = useState('');
const [gitHub, setGitHub] = useState('');
const [deploy, setDeploy] = useState('');
const [user, setUser] = useState('');
const [description, setDescription] = useState('');
const [imageUrl, setImageUrl] = useState('');
const [modalDelete, setModalDelete] = useState(false);
const [idProject, setIdProject] = useState('');
const [userDelete, setUserDelete] = useState('');
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function getServer() {
    const setupApi = SetupAPIClient();
    const response = await setupApi.get("/project");
    const listProject = response.data;
    setProject(listProject);
    setIsLoading(false);
  }

  getServer();
}, []);


if (isLoading){
  return <Loading/>
}

function refresh(){
  setTimeout(()=>{
    window.location.reload()
  },2000)
}

function openModalProject(){
  setModalProject(true)
}

function closeModalProject(){
  setModalProject(false)
}
async function handleProject(e:FormEvent) {

    e.preventDefault()
    if (nome === "" || description === "" || gitHub === "" || deploy === ""|| user === ""){
      toast.warning('Digite todos os campos!');
      return;
    }
    if (!isValidGitHubLink(gitHub)) {
      toast.error("Link do GitHub inválido!");
      return; 
    }
    if (isNotLink(deploy)) {
      toast.error("Link do projeto inválido!");
      return;
    }
    const setupApi = SetupAPIClient();
    try{
      await setupApi.post("/project",{
          name:nome,
          description:description,
          git:gitHub,
          code:deploy,
          user_id:user
      });
      toast.success('Projeto criado com sucesso!');
      refresh();
      closeModalProject()
    }catch(err){
      console.log('ERROR');
      toast.error('Erro ao criar seu projeto, verifique seu código!')
    }
}

function isValidGitHubLink(link: string) {
  const githubRegex = /^https?:\/\/github\.com/;
  return githubRegex.test(link);
}

function isNotLink(value: string) {
  const linkRegex = /^(http|https):\/\//;
  return !linkRegex.test(value);
}


function openModalDelete(e:string){
    setModalDelete(true)
    setIdProject(e);
}

function closeModalDelete(){
  setModalDelete(false)
}

async function handleProjectDelete(e:FormEvent){
    e.preventDefault();
      const setupApi = SetupAPIClient();
      try{
        await setupApi.delete("/project",{
          data:{
            id:idProject,
            user:userDelete
          }
        })
        toast.success('Projeto deletado com sucesso!');
        refresh();
      }catch(err){
        console.log
        toast.warning('Código de criador errado!');
      }
      setIdProject('');

}



  return (
    <>
      <Head>
        <title>ForDEVS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header/>

          <div className={style.container}>
            <div className={style.more}>
              <button>
                < AiOutlinePlusCircle size={30} onClick={openModalProject}/>
              </button>
              
            </div>
            <Modal style={{overlay:{
              backgroundColor: 'rgba(0, 0 ,0, 0.2)'
                 }}}isOpen={modalProject}onRequestClose={closeModalProject} className={style.modalProject} >
                <form onSubmit={handleProject} className={style.form}>
                  <h2>Mostre seu projeto</h2>
                  <input type="password" placeholder="Digite o seu código"  value={user} onChange={(e)=>setUser(e.target.value)}/>
                  <input type="text" placeholder="Digite o nome do seu projeto:" value={nome} onChange={(e)=>setNome(e.target.value)}/>
                  <input type="text" placeholder="Link do projeto no gitHub:"  value={gitHub} onChange={(e)=>setGitHub(e.target.value)}/>
                  <input type="text" placeholder="Link do projeto/deploy:"  value={deploy} onChange={(e)=>setDeploy(e.target.value)}/>
                  <textarea placeholder="Faça uma descrição dele..." maxLength={200}  value={description} onChange={(e)=>setDescription(e.target.value)}/>
                  <div className={style.buttons}>
                    <button type="submit" onClick={handleProject}>Criar projeto</button>
                    <button onClick={closeModalProject}>Cancelar</button>
                   
                  </div>
                </form>
                
  
            </Modal>
            <main>
            <div className={style.cards}> 
            {project.map((item)=>{
              return(
              
                <div className={style.card}key={item.id} >
                <div className={style.imgArea}>
                  <iframe src={item.code}/>
               </div>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                  <div className={style.arrow}>
                      <Link href={item.git} target='_blank'>
                      <AiFillGithub/>
                      </Link>
                      <Link href={item.code} target='_blank'>
                        <AiOutlineArrowRight/>
                      </Link>
                      <button className={style.button} onClick={()=>openModalDelete(item.id)} ><BsTrash3/></button>
                      <Modal isOpen={modalDelete} onRequestClose={closeModalDelete}  style={{overlay:{
                backgroundColor: 'rgba(0, 0 ,0, 0.2)'
                 }}} className={style.modalProject}>
                    <form className={style.form}>
                        <h2>Digite o seu código:</h2>
                        <input type='password' value={userDelete} onChange={(e)=>setUserDelete(e.target.value)}/>
                        <div className={style.buttons}>
                        <button onClick={handleProjectDelete}>Deletar</button>
                          <button onClick={closeModalDelete}>Cancelar</button>
                          
                          </div>
                      </form>
                      </Modal>
                    </div>
                </div>
              )
            })}
        </div> 
        </main>
        </div>
            
     
    </>
    
  )
}
