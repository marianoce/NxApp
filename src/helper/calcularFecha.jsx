import moment from 'moment';

const calcularFecha = (fecha) => {

    const momentStart = moment(fecha);
    const momentEnd = moment(new Date());
    const dias = momentEnd.diff(momentStart, 'days');
    const horas = momentEnd.diff(momentStart, 'hours');
    const minutos = momentEnd.diff(momentStart, 'minutes');
    let formato = '';
    let tiempo = 0;

    if (dias > 0) {
        formato = 'Dias';
        tiempo = dias;
    }
    else if (horas > 0) {
        formato = 'Horas';
        tiempo = horas;
    }
    else {
        formato = 'Minutos';
        tiempo = minutos;
    }
    
    return { tiempo, formato };
}


export {
    calcularFecha
}