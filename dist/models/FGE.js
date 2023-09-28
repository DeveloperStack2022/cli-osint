export class FGE {
    numero_cedula;
    constructor(numero_cedula) {
        this.numero_cedula = numero_cedula;
    }
    async makeQuery() {
        const data = await fetch(`https://www.gestiondefiscalias.gob.ec/siaf/comunes/noticiasdelito/info_mod.php?businfo=a:1:{i:0;s:10:%22${this.numero_cedula}%22;}`, {
            method: 'POST',
            headers: {
                "Accept": "*/*",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.134 Safari/537.36"
            }
        });
        const response = await data.text();
        return response;
    }
}
