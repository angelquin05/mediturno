//========================================
// MÓDULO MÉDICOS - MEDITURNO
//========================================

// Validar sesión
if (localStorage.getItem("sesion") !== "activa") {
    window.location.href = "index.html";
}

// Arreglos
let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
let especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

let indiceEditar = -1;

//==============================
// CARGAR ESPECIALIDADES
//==============================

function cargarEspecialidades() {

    const select = document.getElementById("especialidad");

    select.innerHTML = '<option value="">Seleccione...</option>';

    especialidades.forEach(e => {

        select.innerHTML += `
            <option value="${e.nombre}">
                ${e.nombre}
            </option>
        `;

    });

}

//==============================
// GUARDAR
//==============================

function guardarMedico() {

    const nombre = document.getElementById("nombre").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const especialidad = document.getElementById("especialidad").value;

    if (
        nombre==="" ||
        cedula==="" ||
        telefono==="" ||
        correo==="" ||
        especialidad===""){

        alert("Complete todos los campos.");

        return;

    }

    const existe = medicos.find((m,index)=>

        m.cedula===cedula && index!==indiceEditar

    );

    if(existe){

        alert("Ya existe un médico con esa cédula.");

        return;

    }

    const medico={

        nombre,

        cedula,

        telefono,

        correo,

        especialidad

    };

    if(indiceEditar==-1){

        medicos.push(medico);

    }else{

        medicos[indiceEditar]=medico;

        indiceEditar=-1;

    }

    localStorage.setItem("medicos",JSON.stringify(medicos));

    limpiarFormulario();

    mostrarMedicos();

}

//==============================
// MOSTRAR
//==============================

function mostrarMedicos(){

    const tabla=document.getElementById("tablaMedicos");

    tabla.innerHTML="";

    medicos.forEach((m,index)=>{

        tabla.innerHTML+=`

        <tr>

            <td>${m.nombre}</td>

            <td>${m.cedula}</td>

            <td>${m.especialidad}</td>

            <td>${m.telefono}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editarMedico(${index})">

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="eliminarMedico(${index})">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

//==============================
// EDITAR
//==============================

function editarMedico(index){

    const m=medicos[index];

    document.getElementById("nombre").value=m.nombre;

    document.getElementById("cedula").value=m.cedula;

    document.getElementById("telefono").value=m.telefono;

    document.getElementById("correo").value=m.correo;

    document.getElementById("especialidad").value=m.especialidad;

    indiceEditar=index;

}

//==============================
// ELIMINAR
//==============================

function eliminarMedico(index){

    if(confirm("¿Desea eliminar este médico?")){

        medicos.splice(index,1);

        localStorage.setItem("medicos",JSON.stringify(medicos));

        mostrarMedicos();

    }

}

//==============================
// LIMPIAR
//==============================

function limpiarFormulario(){

    document.getElementById("nombre").value="";

    document.getElementById("cedula").value="";

    document.getElementById("telefono").value="";

    document.getElementById("correo").value="";

    document.getElementById("especialidad").value="";

    indiceEditar=-1;

}

//==============================
// INICIAR
//==============================

cargarEspecialidades();

mostrarMedicos();