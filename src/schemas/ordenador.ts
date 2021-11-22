import {Schema, model } from 'mongoose'
import { Cliente } from '../classes/cliente'


// Definimos el Schema
const ordenadorSchema = new Schema({
    _numSerie: {
        type: String,
        unique: true  //índice único
    },
    _tipoOrdenador: {
        type: String  //Valores "PORT, "PC"...
    },
    _precioFabrica: {
        type: Number
    },
    _velocidadCPU: {
        type: Number
    },
    _cantidadRAM: {
        type: Number
    },
    _capacidadHDD: {
        type: Number
    },
    _instaladoSO: {
        type: Boolean //Valores "true", "false"...
    },
    _tipoRefrig: {
        type: String
    }

})


export type iPort = {
    _numSerie: string | null,
    _tipoOrdenador: string | null,
    _precioFabrica: number | null,
    _velocidadCPU: number | null,    
    _cantidadRAM: number | null,
    _capacidadHDD: number | null,
    _instaladoSO: boolean | null
    _cliente: Cliente[] | null,
    
  }

  export type iPC = {
    _numSerie: string | null,
    _tipoOrdenador: string | null,
    _precioFabrica: number | null,
    _velocidadCPU: number | null,    
    _cantidadRAM: number | null,
    _capacidadHDD: number | null,
    _instaladoSO: boolean | null,
    _tipoRefrig: string | null,
    _cliente: Cliente[] | null,

  }
  export type tPort = {     //it may not be needed. It is not imported. It came from ANJ
    _numSerie: string,
    _tipoOrdenador: string,
    _precioFabrica: number,
    _velocidadCPU: number,    
    _cantidadRAM: number,
    _capacidadHDD: number,
    _instaladoSO: boolean,
    _tipoRefrig: string,
}
export type tPort2 = {     //esta es para la sacada de los datos from ANJ
    _numSerie: string,
    _tipoOrdenador: string,
    _precioFabrica: number,
    _velocidadCPU: number,    
    _cantidadRAM: number,
    _capacidadHDD: number,
    _instaladoSO: boolean,
    _tipoRefrig: string,
    _cliente: Cliente[],
   
}
  export type iSubir = { 
    _numSerie: string,
    _tipoOrdenador: string,
    _precioFabrica: number,
    _velocidadCPU: number,    
    _cantidadRAM: number,
    _capacidadHDD: number,
    _instaladoSO: boolean,
    _tipoRefrig: string,
    _cliente: Cliente[],
}

// La colección de la BD (Plural siempre)
export const Maquinas = model('ordenadores', ordenadorSchema)