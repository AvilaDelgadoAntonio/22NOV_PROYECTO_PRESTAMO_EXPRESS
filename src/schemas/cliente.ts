import {Schema, model } from 'mongoose'
const clienteSchema = new Schema({
    _numIdentidad: {
        type: String,
        unique: true  //índice único
    },
    _tipoCliente: {
        type: String  //Valores "PER", "EMP"...
    },
    _nombre: {
        type: String
    },
    _pagoPrestamo: {
        type: Number
    },
    _numseriePrestado: {
        type: String
    },
    _fechaPrestado: {
        type: Date //Fecha formato ISO
    },
    _personalidadLegal: {
        type: String  
    }
})


export type iCliente = {
    _numIdentidad: string | null;
    _tipoCliente: string | null;
    _nombre: string | null;
    _pagoPrestamo: number | null;
    _numseriePrestado: string | null;
    _fechaPrestado: Date | null;

}

export type iCliente2 = {
    _numIdentidad: string;
    _tipoCliente: string;
    _nombre: string;
    _pagoPrestamo: number;
    _numseriePrestado: string;
    _fechaPrestado: Date;
    _personalidadLegal: string;
  
}
export type iClienteJuridico = {
    _numIdentidad: string | null;
    _tipoCliente: string | null;
    _nombre: string | null;
    _pagoPrestamo: number | null;
    _numseriePrestado: string | null;
    _fechaPrestado: Date | null;
    _personalidadLegal: string | null;
 
    
}
// La colección de la BD (Plural siempre)
export const Humanos = model('clientes', clienteSchema)