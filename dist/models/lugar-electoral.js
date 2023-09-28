export class LugarElectoral {
    id;
    numero_cedula;
    fecha_nacimiento;
    constructor(id, numero_cedula, fecha_nacimiento) {
        this.id = id;
        this.numero_cedula = numero_cedula;
        this.fecha_nacimiento = fecha_nacimiento;
    }
    printDetails() {
        console.log(`${this.id}\t${this.numero_cedula}\t${this.fecha_nacimiento}`);
    }
    async makeQuery() {
        const data = await fetch('https://lugarvotacion.cne.gob.ec/CneApiWs/api/ConsultaVotacionDomicilioElectoral2021', {
            body: JSON.stringify({
                "cedula": this.numero_cedula,
                "nombre": this.fecha_nacimiento
            }),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        });
        const response = await data.json();
        return response.Data;
    }
}
