//========================================
// REPORTES MEDITURNO
//========================================

if(localStorage.getItem("sesion")!="activa"){

    window.location.href="index.html";

}

const pacientes=JSON.parse(localStorage.getItem("pacientes"))||[];

const medicos=JSON.parse(localStorage.getItem("medicos"))||[];

const especialidades=JSON.parse(localStorage.getItem("especialidades"))||[];

const citas=JSON.parse(localStorage.getItem("citas"))||[];

// Totales

document.getElementById("rpPacientes").innerHTML=pacientes.length;

document.getElementById("rpMedicos").innerHTML=medicos.length;

document.getElementById("rpEspecialidades").innerHTML=especialidades.length;

document.getElementById("rpCitas").innerHTML=citas.length;

//==============================
// GRÁFICO
//==============================

new Chart(document.getElementById("grafico"),{

type:"bar",

data:{

labels:[

"Pacientes",

"Médicos",

"Especialidades",

"Citas"

],

datasets:[{

label:"Registros",

data:[

pacientes.length,

medicos.length,

especialidades.length,

citas.length

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

}

}

});