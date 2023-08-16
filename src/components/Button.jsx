import styles from './Button.module.css'

export const Button = ({ onClick, children, background }) => {
    return (
        <button className={styles.button} onClick={onClick} style={{ backgroundColor: background }}> {children}</button >
    )
}

export default Button