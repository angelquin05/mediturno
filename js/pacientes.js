//========================================
// MÓDULO PACIENTES - MEDITURNO
//========================================

// Validar sesión
if (localStorage.getItem("sesion") !== "activa") {
    window.location.href = "index.html";
}

// Arreglo de pacientes
let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

// Índice para editar
let indiceEditar = -1;

//==============================
// GUARDAR PACIENTE
//==============================

function guardarPaciente() {

    const nombre = document.getElementById("nombre").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const nacimiento = document.getElementById("nacimiento").value;
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const direccion = document.getElementById("direccion").value.trim();

    if (
        nombre === "" ||
        cedula === "" ||
        nacimiento === "" ||
        telefono === "" ||
        correo === "" ||
        direccion === ""
    ) {
        alert("Debe completar todos los campos.");
        return;
    }

    // Validar cédula repetida
    const existe = pacientes.find((p, index) =>
        p.cedula === cedula && index !== indiceEditar
    );

    if (existe) {
        alert("Ya existe un paciente con esa cédula.");
        return;
    }

    const paciente = {
        nombre,
        cedula,
        nacimiento,
        telefono,
        correo,
        direccion
    };

    if (indiceEditar === -1) {

        pacientes.push(paciente);

    } else {

        pacientes[indiceEditar] = paciente;

        indiceEditar = -1;

    }

    localStorage.setItem("pacientes", JSON.stringify(pacientes));

    limpiarFormulario();

    mostrarPacientes();

}

//==============================
// MOSTRAR PACIENTES
//==============================

function mostrarPacientes() {

    const tabla = document.getElementById("tablaPacientes");

    tabla.innerHTML = "";

    pacientes.forEach((paciente, index) => {

        tabla.innerHTML += `

        <tr>

            <td>${paciente.nombre}</td>

            <td>${paciente.cedula}</td>

            <td>${paciente.telefono}</td>

            <td>${paciente.correo}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editarPaciente(${index})">

                    <i class="bi bi-pencil-square"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="eliminarPaciente(${index})">

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

function editarPaciente(index) {

    const paciente = pacientes[index];

    document.getElementById("nombre").value = paciente.nombre;

    document.getElementById("cedula").value = paciente.cedula;

    document.getElementById("nacimiento").value = paciente.nacimiento;

    document.getElementById("telefono").value = paciente.telefono;

    document.getElementById("correo").value = paciente.correo;

    document.getElementById("direccion").value = paciente.direccion;

    indiceEditar = index;

}

//==============================
// ELIMINAR
//==============================

function eliminarPaciente(index) {

    if (confirm("¿Desea eliminar este paciente?")) {

        pacientes.splice(index, 1);

        localStorage.setItem("pacientes", JSON.stringify(pacientes));

        mostrarPacientes();

    }

}

//==============================
// BUSCAR
//==============================

function buscarPaciente() {

    const texto = document.getElementById("buscar").value.toLowerCase();

    const filas = document.querySelectorAll("#tablaPacientes tr");

    filas.forEach(fila => {

        fila.style.display = fila.textContent.toLowerCase().includes(texto)

            ? ""

            : "none";

    });

}

//==============================
// LIMPIAR
//==============================

function limpiarFormulario() {

    document.getElementById("nombre").value = "";

    document.getElementById("cedula").value = "";

    document.getElementById("nacimiento").value = "";

    document.getElementById("telefono").value = "";

    document.getElementById("correo").value = "";

    document.getElementById("direccion").value = "";

    indiceEditar = -1;

}

//==============================
// INICIAR
//==============================

mostrarPacientes();