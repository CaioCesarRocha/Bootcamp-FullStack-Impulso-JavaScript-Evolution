
import styles from './buttonForm.module.scss'

interface propsButtonForm{
    message: string
    onClick?: () => void,
}

const ButtonForm = (props: propsButtonForm) =>{
    return (
        <button 
            className={styles.Button} 
            type='submit' 
            onClick={props.onClick}
        >
            {props.message}
        </button>  
    )
}

export default ButtonForm;