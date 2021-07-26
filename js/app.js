//Variables de campos del formulario
const mascotaInput = document.getElementById('mascota');
const propietarioInput = document.getElementById('propietario');
const telefonoInput = document.getElementById('telefono');
const fechaInput = document.getElementById('fecha');
const horaInput = document.getElementById('hora');
const sintomasInput = document.getElementById('sintomas');

// UI
const formulario = document.getElementById('nueva-cita');
const contenedorCitas = document.getElementById('citas');

//Clases
class Citas {

    constructor() {
        this.citas = [];
    }
    agregarCita(cita) {

        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }
}
class UI {

    imprimirAlerta(mensaje, tipo) {

        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase en base al tipo de error
        if (tipo === 'error') {

            divMensaje.classList.add('alert-danger');

        } else {

            divMensaje.classList.add('alert-success');
        }

        //Mensaje de Error
        divMensaje.textContent = mensaje;

        //Agregar al DOM    
        document.getElementById('contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alarte despues de 3s
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas(citasArray) {

        this.limpiarHTML();
        
        const { citas } = citasArray;
        
        citas.forEach( cita => {

            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id= id;

            //Scripting
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: ${propietario}</span>
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: ${telefono}</span>
            `;
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: ${fecha}</span>
            `;
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: ${hora}</span>
            `;
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Síntomas: ${sintomas}</span>
            `;


            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);

        });
    }

    limpiarHTML() {

        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

//Intanciamos las clases
const ui = new UI();
const administrarCitas = new Citas();

eventListeners();
function eventListeners() {

    //Input -- Event instantanteo al escribir 
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);

}

//Objeto de la información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}

//Functions
//Agrega datos al objeto de cita
function datosCita(e) {
   
    citaObj[e.target.name] = e.target.value;
    
}

//Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    
    e.preventDefault();

    //Extraemos la información del objecto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    //Validar
    if ( mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '' ) {

        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }
    
    //Generar un Id único
    citaObj.id = Date.now();

    //Crear una nueva cita
    administrarCitas.agregarCita({...citaObj});

    //Reiniciar el objeto para la validación
    reiniciarObjeto();

    //Reiniciar el formulario
    formulario.reset();

    //Mostrar el HTML de las citas
    ui.imprimirCitas(administrarCitas);

}

function reiniciarObjeto() {

    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

}