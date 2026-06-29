//========================================
// MÓDULO CITAS - MEDITURNO
//========================================

// Validar sesión
if (localStorage.getItem("sesion") !== "activa") {
    window.location.href = "index.html";
}

// Datos almacenados
let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
let citas = JSON.parse(localStorage.getItem("citas")) || [];

let indiceEditar = -1;

//========================================
// CARGAR PACIENTES
//========================================

function cargarPacientes() {

    const select = document.getElementById("paciente");

    select.innerHTML = '<option value="">Seleccione...</option>';

    pacientes.forEach(p => {

        select.innerHTML += `
            <option value="${p.nombre}">
                ${p.nombre}
            </option>
        `;

    });

}

//========================================
// CARGAR MÉDICOS
//========================================

function cargarMedicos() {

    const select = document.getElementById("medico");

    select.innerHTML = '<option value="">Seleccione...</option>';

    medicos.forEach(m => {

        select.innerHTML += `
            <option value="${m.nombre}">
                ${m.nombre} - ${m.especialidad}
            </option>
        `;

    });

}

//========================================
// GUARDAR CITA
//========================================

function guardarCita() {

    const paciente = document.getElementById("paciente").value;
    const medico = document.getElementById("medico").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const estado = document.getElementById("estado").value;
    const motivo = document.getElementById("motivo").value.trim();

    if (
        paciente === "" ||
        medico === "" ||
        fecha === "" ||
        hora === "" ||
        motivo === ""
    ) {

        alert("Complete todos los campos.");

        return;

    }

    const cita = {

        paciente,
        medico,
        fecha,
        hora,
        estado,
        motivo

    };

    if (indiceEditar === -1) {

        citas.push(cita);

    } else {

        citas[indiceEditar] = cita;

        indiceEditar = -1;

    }

    localStorage.setItem("citas", JSON.stringify(citas));

    limpiarFormulario();

    mostrarCitas();

}

//========================================
// MOSTRAR CITAS
//========================================

function mostrarCitas() {

    const tabla = document.getElementById("tablaCitas");

    tabla.innerHTML = "";

    citas.forEach((cita, index) => {

        let color = "bg-primary";

        if (cita.estado === "Atendida") color = "bg-success";

        if (cita.estado === "Cancelada") color = "bg-danger";

        tabla.innerHTML += `

        <tr>

            <td>${cita.paciente}</td>

            <td>${cita.medico}</td>

            <td>${cita.fecha}</td>

            <td>${cita.hora}</td>

            <td>

                <span class="badge ${color}">
                    ${cita.estado}
                </span>

            </td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editarCita(${index})">

                    <i class="bi bi-pencil-square"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="eliminarCita(${index})">

                    <i class="bi bi-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

//========================================
// EDITAR
//========================================

function editarCita(index) {

    const cita = citas[index];

    document.getElementById("paciente").value = cita.paciente;
    document.getElementById("medico").value = cita.medico;
    document.getElementById("fecha").value = cita.fecha;
    document.getElementById("hora").value = cita.hora;
    document.getElementById("estado").value = cita.estado;
    document.getElementById("motivo").value = cita.motivo;

    indiceEditar = index;

}

//========================================
// ELIMINAR
//========================================

function eliminarCita(index) {

    if (confirm("¿Desea eliminar esta cita?")) {

        citas.splice(index, 1);

        localStorage.setItem("citas", JSON.stringify(citas));

        mostrarCitas();

    }

}

//========================================
// LIMPIAR
//========================================

function limpiarFormulario() {

    document.getElementById("paciente").value = "";
    document.getElementById("medico").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("hora").value = "";
    document.getElementById("estado").value = "Programada";
    document.getElementById("motivo").value = "";

    indiceEditar = -1;

}

//========================================
// INICIAR
//========================================

cargarPacientes();

cargarMedicos();

mostrarCitas();