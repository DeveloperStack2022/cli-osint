export class LugarElectoral {

    public constructor(
        public id:number,
        public numero_cedula:string,
        public fecha_nacimiento:string,
    ) {}

    public printDetails(){
        console.log(`${this.id}\t${this.numero_cedula}\t${this.fecha_nacimiento}`)
    }

    async makeQuery() {
        const data = await fetch('https://lugarvotacion.cne.gob.ec/CneApiWs/api/ConsultaVotacionDomicilioElectoral2021',{
            body: JSON.stringify({
                "cedula": this.numero_cedula,
                "nombre": this.fecha_nacimiento
              }),
            method: 'POST',
            headers:{
                'content-type':'application/json'
            }
        })
        const response = await data.json()
        return response.Data
    }
}