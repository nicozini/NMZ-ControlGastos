// CNT: contiene toda mi app

// ORDEN RECOMENDADO DE IMPORTS
// Todo lo relacionado a react: hooks, componentes, etc conforme se van mostrando en pantalla
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'

// Funciónes
import { generarId } from './helpers' // No requiere el nombre del archivo porque se llama index.js

// Hojas de estilos, imagenes, etc
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  // ABRIR MODAL  
  useEffect(() => {
    const devolver = () => {    
      if (Object.keys(gastoEditar).length > 0) {
        setModal(true)
    
        setTimeout(() => {
          setAnimarModal(true)
        }, 250);
      }
    }
      
    return () => devolver();

    // return () => {
    //   if (Object.keys(gastoEditar).length > 0) {
    //     setModal(true)
    
    //     setTimeout(() => {
    //       setAnimarModal(true)
    //     }, 250);
    //   }
    // }
  }, [gastoEditar])


  // FILTROS DE CATEGORIAS DE GASTOS
  useEffect(() => {
    if (filtro) {      
      // Filtrar gastos por categría
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])


  // LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])



  const handleNuevoGasto = () => {
    setModal(true)

    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 250);
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }



    // Ocultar modal: En este caso no me puedo traer la funcion desde el componente hijo, por eso traigo el codigo
    setTimeout(() => {
        setModal(false)
    }, 350);
    setAnimarModal(false)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gastoState => gastoState.id !== id)
    setGastos(gastosActualizados)
  }



  return (      
      <div className={modal ? 'fijar' : ''}>
        <Header
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />

        {/* Puedo hacer un ternario colocando : null o bien con el && me evito tener que poner algo para el false */}
        {isValidPresupuesto && (
          <>

            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />

              <ListadoGastos 
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />

            </main>

            <div className="nuevo-gasto">
              <img 
                src={IconoNuevoGasto}
                alt="Icono Nuevo Gasto"
                onClick={handleNuevoGasto}
              />
            </div>

          </>

        )}

        {modal && <Modal 
                    setModal={setModal}
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                  />}


      </div>
  )
}

export default App
