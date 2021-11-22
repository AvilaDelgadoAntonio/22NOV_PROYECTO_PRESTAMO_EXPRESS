import { Portatil } from './portatil';
export class Sobremesa extends Portatil {
  private _tipoRefrig: string;
  constructor(
    numSerie: string, 
    precioFabrica: number, 
    velocidadCPU: number, 
    cantidadRAM: number, 
    capacidadHDD: number,
    instaladoSO: boolean, 
    tipoRefrig: string) {
    super(numSerie, precioFabrica, velocidadCPU, cantidadRAM, capacidadHDD, instaladoSO);
    this._tipoRefrig = tipoRefrig;
  }
  get tipoRefrig() {
    return this._tipoRefrig;
  }
  // sobre escribimos los dos métodos de abajo
  precio(): number {// refrigeración líquida tiene un sobrecoste del 10%
    let precio: number;
    precio = super.precio();
    if (this._tipoRefrig == 'líquida') {
      precio += 0.1 * precio;
    }
    return precio;
  }

  completo(){
    let resultado: string
    resultado = `\n${super.completo()}, Refrigeración: ${this._tipoRefrig} `
    return resultado
  }
}
