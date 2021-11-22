import { Cliente } from './cliente';
export class Clientejuridico extends Cliente {
  private _personalidadLegal: string;
  constructor(
    numIdentidad: string, 
    nombre: string, 
    pagoPrestamo: number, 
    numseriePrestado: string,         
    fechaPrestado: any,
    personalidadLegal: string) {
    super(numIdentidad, nombre, pagoPrestamo, numseriePrestado, fechaPrestado);
    this._personalidadLegal = personalidadLegal;
  }
  get personalidadLegal() {
    return this._personalidadLegal;
  }
  todo() {
    let resultado: string
    resultado = `${super.todo()}, Personalidad Jurídica: ${this._personalidadLegal} `
    return resultado
}
}