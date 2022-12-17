// CNT: componente para mostrar un mensaje

const Mensaje = ({children, tipo}) => {
    return (
        <div className={`alerta ${tipo}`}>{children}</div>
    )
}

export default Mensaje