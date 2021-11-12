import styles from './form-element.module.css';

const FormElement = ({children}) => {

    return (
        <div className={styles['form-element']}>
            {children}
        </div>
    )
}

export default FormElement;