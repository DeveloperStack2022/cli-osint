export class RealizadoConsulta {
    dato_consultar;
    constructor(dato_consultar) {
        this.dato_consultar = dato_consultar;
        this.makeQuery();
    }
    async makeQuery() {
        const data = await fetch('https://lugarvotacion.cne.gob.ec/CneApiWs/api/ConsultaVotacionDomicilioElectoral2021', {
            body: JSON.stringify({
                "cedula": this.dato_consultar.numero_cedula,
                "nombre": this.dato_consultar.fecha_nacimiento
            }),
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        });
        const response = await data.json();
        return response;
    }
}
