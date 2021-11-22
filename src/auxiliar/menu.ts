import { leerTeclado } from './lecturaTeclado'

export const menu_AAD = async () => {
    let n: number
    console.log('\n')
    console.log('0.- Establecer conexión a BD (ATLAS en nube vs LOCAL)')
    console.log('1.- CREAR un nuevo ORDENADOR')
    console.log('2.- CREAR un nuevo CLIENTE')
    console.log('3.- GUARDAR lo creado en BD')
    console.log('4.- RECUPERAR (a memoria) documentos de la BD')
    console.log('5.- ASIGNACIÓN DE UN ORDENADOR A CLIENTE(S)')
    console.log('6.- Calcular los COSTES FINALES del la flota (inventario) de ordenadores')
    console.log('7.- LISTA DE TODOS LOS CLIENTES')
    console.log('8.- BORRAR de la BD')
    console.log('9.- CALCULAR SUMA DE TODAS LAS GANANCIAS ASOCIADAS A CADA ORDENADOR ')
    console.log('10.- Calcular la GANANCIA TOTAL de la flota de ordenadores (desde fecha dada)')    
    console.log('100.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

