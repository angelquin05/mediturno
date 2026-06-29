//========================================
// MÓDULO ESPECIALIDADES - MEDITURNO
//========================================

// Validar sesión
if (localStorage.getItem("sesion") !== "activa") {
    window.location.href = "index.html";
}

// Obtener datos
let especialidades = JSON.parse(localStorage.getItem("especialidades")) || [];

let indiceEditar = -1;

//========================================
// GUARDAR
//========================================

function guardarEspecialidad() {

    const nombre = document.getElementById("nombreEspecialidad").value.trim();

    const descripcion = document.getElementById("descripcionEspecialidad").value.trim();

    if (nombre === "" || descripcion === "") {

        alert("Debe completar todos los campos.");

        return;

    }

    const existe = especialidades.find((e, index) =>
        e.nombre.toLowerCase() === nombre.toLowerCase() &&
        index !== indiceEditar
    );

    if (existe) {

        alert("La especialidad ya existe.");

        return;

    }

    const especialidad = {

        nombre,

        descripcion

    };

    if (indiceEditar === -1) {

        especialidades.push(especialidad);

    } else {

        especialidades[indiceEditar] = especialidad;

        indiceEditar = -1;

    }

    localStorage.setItem("especialidades", JSON.stringify(especialidades));

    limpiarEspecialidad();

    mostrarEspecialidades();

}

//========================================
// MOSTRAR
//========================================

function mostrarEspecialidades() {

    const tabla = document.getElementById("tablaEspecialidades");

    tabla.innerHTML = "";

    especialidades.forEach((especialidad, index) => {

        tabla.innerHTML += `

        <tr>

            <td>${especialidad.nombre}</td>

            <td>${especialidad.descripcion}</td>

            <td>

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editarEspecialidad(${index})">

                    <i class="bi bi-pencil"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="eliminarEspecialidad(${index})">

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

function editarEspecialidad(index) {

    document.getElementById("nombreEspecialidad").value = especialidades[index].nombre;

    document.getElementById("descripcionEspecialidad").value = especialidades[index].descripcion;

    indiceEditar = index;

}

//========================================
// ELIMINAR
//========================================

function eliminarEspecialidad(index) {

    if (confirm("¿Desea eliminar esta especialidad?")) {

        especialidades.splice(index, 1);

        localStorage.setItem("especialidades", JSON.stringify(especialidades));

        mostrarEspecialidades();

    }

}

//========================================
// LIMPIAR
//========================================

function limpiarEspecialidad() {

    document.getElementById("nombreEspecialidad").value = "";

    document.getElementById("descripcionEspecialidad").value = "";

    indiceEditar = -1;

}

//========================================
// INICIAR
//========================================

mostrarEspecialidades();