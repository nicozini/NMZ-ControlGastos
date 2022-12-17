// CNT: contiene la parte derecha para mostrar como esta el presupuesto
import { useState, useEffect } from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);


    // Gastado y Disponible
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;
        setDisponible(totalDisponible)
        setGastado(totalGastado)    

        // Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 300);

        return () => totalGastado;
    }, [gastos])    


    // FORMATEAR IMPORTE EN DÓLARES
    const formatearCantidad = cantidad => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }


    // ACCIÓN DEL BOTÓN DE RESET APP
    const handleResetApp = () => {
        const resultado = confirm('Al resetear la aplicación se borrarán todos los datos de Presupuesto y Gastos. \n ¿Eliminar de todas formas?');
        
        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }


    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar 
                    value={porcentaje} 
                    // maxValue={1} 
                    text={`${porcentaje}% Gastado`} 
                    styles={buildStyles({
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#F5F5F5'
                    })}
                />
            </div>

            <div className="contenido-presupuesto">
                <button 
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                    
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto