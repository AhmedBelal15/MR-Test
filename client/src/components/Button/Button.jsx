import styles from './button.module.css'

const Button = ({width, height, background,children, ...props}) => {
    return <button style={{width, height, background}} className={styles['button']} {...props}>{children}</button>
}

export default Button;