// CNT: form para ingresar un monto para el nuevo presupuesto

import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

    // ¿Dónde requiero el State?. Solo en este unmountComponentAtNode, entonces defino un state local
    const [mensaje, setMensaje] = useState('');
    
    // Función para administrar el presupuesto
    const handlePresupuesto = (e) => {
        e.preventDefault();

        // Validar que el input del presupuesto sea number y no string
        if (!presupuesto || presupuesto < 0 ) {
            setMensaje('No es un presupuesto válido');
            return
        }

        // Como paso la validacion: Reseteo el error
        setMensaje('')
        // Como paso la validacion: cambio a true isValidPresupuesto para mostrar el componente gasto
        setIsValidPresupuesto(true)      
    }


    return (
        <div className='contenedor-presupuesto contenedor sombra'>
            
            <form onSubmit={handlePresupuesto} className='formulario'>
                <div className="campo">
                    <label>Definir Presupuesto</label>
                    <input
                        className='nuevo-presupuesto'
                        type="number"
                        placeholder='Añadir presupuesto'
                        value={presupuesto}
                        // Lo que el usuario vaya escribiendo se va agregando en prop presupuesto
                        onChange={ e => setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            </form>

        </div>
    )
}

export default NuevoPresupuesto