import { ToastContainer, toast, Theme} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './succesAlert.module.scss';

interface propsSuccesAlert{
    message: string;
    textButton: string;
}

const SuccessAlert = (props: propsSuccesAlert) =>{
    
    const renderToast = () =>{
        toast.success(props.message)
    }
    return(
        <div>   
            <button onClick={() => renderToast()} className={styles.ButtonAlert}> 
                {props.textButton}
            </button>
            <ToastContainer autoClose={3500} theme={'dark'}/>

        </div>      
    )
}

export default SuccessAlert;