import Gasto from './Gasto'

const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados}) => {
  return (
    <div className='listado-gastos contenedor'>

        {/* NOTA IMPORTANTE: si pongo llaves debo agregar un return, si pongo parentesis no hace falta return */}
        {
          filtro ? (
            <> 
              <h2>{gastosFiltrados.length ? `Gastos de ${filtro}` : `No hay gastos cargados para ${filtro}`}</h2>

              {gastosFiltrados.map(gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
              ))}    
            </>
          ) : (
            <>
              <h2>{gastos.length ? `Todos tus Gastos:` : `No hay gastos cargados aún`}</h2>
              
              {gastos.map(gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                />
              ))}
            </>

          )
        }

    </div>
  )
}

export default ListadoGastos