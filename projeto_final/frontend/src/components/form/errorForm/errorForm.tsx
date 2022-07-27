
import styles from './errorForm.module.scss';
import * as icon from '../../icons/index'

interface propsErrorForm{
    message: string;
}

const ErrorForm = (props: propsErrorForm) =>{
    return(
        <div className={styles.ContentMessage}>
           <i>{icon.alert}</i> 
           <div className={styles.Message}>{props.message}</div> 
        </div>
    )
}

export default ErrorForm;