import styles from './text-field.module.css'

const TextField = ({width, height, ...props}) => {
    return <input style={{width, height}} className={styles['input-field']} {...props} />
}

export default TextField;