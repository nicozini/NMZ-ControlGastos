// Función para generar un id
export const generarId = () => {
    let fecha = Date.now().toString(36);
    let random = Math.random().toString(36).substring(2)
    return fecha + random
}

// Función para formatear fechas
export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha);

    const options = {
        year: 'numeric', 
        month: 'long',
        day: '2-digit',
    }

    return fechaNueva.toLocaleDateString('es-AR', options);
}