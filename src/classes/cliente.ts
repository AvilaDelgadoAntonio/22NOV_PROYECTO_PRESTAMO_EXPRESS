export class Cliente {
    private _numIdentidad: string;
    private _nombre: string;
    private _pagoPrestamo: number;
    private _numseriePrestado: string;     
    private _fechaPrestado: Date; 
    
    constructor(
        numIdentidad: string, 
        nombre: string, 
        pagoPrestamo: number, 
        numseriePrestado: string,         
        fechaPrestado: any
        ) {
        this._numIdentidad = numIdentidad;
        this._nombre = nombre;
        this._pagoPrestamo = pagoPrestamo;
        this._numseriePrestado = numseriePrestado;
        this._fechaPrestado = fechaPrestado;
    }

    get numIdentidad() {
        return this._numIdentidad;
    }
    get nombre() {
        return this._nombre;
    }
    get pagoPrestamo() {
        return this._pagoPrestamo;
    }
    get numseriePrestado() {
        return this._numseriePrestado;
    }
    get fechaPrestado() {
        return this._fechaPrestado;
    }

    set pagoPrestamo(_pagoPrestamo: number){
        /*
            Si se intenta poner un coste cero o negativo al pago del préstamo
            salta una excepción con "throw" y su mensaje
                    */
        if (this._pagoPrestamo <= 0){
            throw "\nCantidad NO admitida, los prestamos de ordenadores tienen un coste superior a 0"
        }
        this._pagoPrestamo = _pagoPrestamo
    }
    calcularGanancia(): number {
        return this._pagoPrestamo; 
    }   
    todo() {
        return `\nDNI/CIF: ${this._numIdentidad}, 
        Nombre: ${this._nombre}, 
        Euros pagados: ${this._pagoPrestamo}, 
        Ordenador prestado: ${this._numseriePrestado}, 
        Fecha préstamo: ${this._fechaPrestado}`
    }
}