import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast} from 'react-toastify';
import styles from './perfil.module.scss'
import UserLogin from '../../services/interfaces/userFirebase.interface';
import * as icon from '../../components/icons';
import useAuth from "../../data/hooks/useAuth";
import * as UsersService from '../../services/user.services';
import Dropzone from "../../components/dropzone/dropzone";
import Layout from "../../components/layout/layout";
import Alert from "../../components/alerts/alert";

const Perfil = () =>{
    const { userLogged, user, updateUser, logout} = useAuth()
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File>();
    const okStatusResponse = 200;

    useEffect(() =>{
        if(userLogged === false) navigate('/authentication')
    },[userLogged, navigate])

    useEffect(() =>{
        if(user?.name) setUsername(user?.name)
      }, [user?.name])
  
    const handleSendNewUser = async() =>{
        if(user && user?.uid){
            const newUser: UserLogin ={
                email: user?.email,
                name: username,
                token: user?.token,
                isAdmin: user?.isAdmin,
                imgUrl: ''
            }   
            const response = await UsersService.updateDataUser(user?.uid, newUser, selectedFile)
            if(response === okStatusResponse){
                await updateUser?.(newUser)
                toast.success('Perfil Alterado com Sucesso');
            }
        }      
    }

    function renderContent(){
        return(<>
            <div className={styles.DisplayColumn}>
                <h2>Imagem do perfil</h2>        
                <Dropzone
                    onFileUploaded={setSelectedFile}
                    message='Escolha seu Avatar'
                    valueInitial={user?.imgUrl} 
                    altImage='Avatar do usuário' 
                />         
            </div> 
            <div className={styles.DisplayColumn}>
                <h2>Dados do perfil</h2>
                <div className={styles.ContainerUserInfo}>            
                    <h4> Usuário: </h4>
                    <input value={user?.email} type='text' readOnly={true} />
                </div>
                <div className={styles.ContainerUserInfo}>            
                    <h4> Username: </h4>
                    <input 
                        onChange={e => setUsername(e.target.value)}
                        value={username} type='text' 
                    />                           
                </div> 
                <button className={styles.ButtonSend} onClick={() => handleSendNewUser()}>
                    Enviar
                    <i>{icon.send}</i>
                </button>                 
            </div>   
        </>)
    }

    return(
        <Layout>
            <div className={styles.Container}>
                <Alert theme='colored'/>
                <div className={styles.ContentButton}>
                    <button className={styles.ButtonLogout} onClick={logout}>
                        <i>{icon.logout}</i>
                        <a href="#/"> Sair </a>
                    </button>
                </div>
                <div className={styles.ContainerContent}>
                    {renderContent()}
                </div>
            </div>           
        </Layout>  
    )
}

export default Perfil;