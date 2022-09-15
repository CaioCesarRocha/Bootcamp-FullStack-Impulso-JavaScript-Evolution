import styles from './inputForm.module.scss';

interface propsInputForm {
    placeholder?: string,
    value?: string | number,
    info: string,
    name: string,
    required?: boolean,
    type: 'text' | 'number' | 'password' | 'email',
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputForm = (props: propsInputForm) =>{
    return(
        <div className={styles.Content}>
            <p >{props.info}</p>
            <input         
                name={props.name}
                placeholder={props.placeholder}
                type={props.type}
                value={props.value}
                required={props.required} 
                onChange={props.onChange}
            />
        </div>  
    )
}

export default InputForm;