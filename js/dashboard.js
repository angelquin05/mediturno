//==============================
// VALIDAR SESIÓN
//==============================

if(localStorage.getItem("sesion")!="activa"){

    window.location.href="index.html";

}

//==============================
// FECHA
//==============================

const fecha=new Date();

document.getElementById("fecha").innerHTML=
fecha.toLocaleDateString("es-ES",{

weekday:"long",

year:"numeric",

month:"long",

day:"numeric"

});

//==============================
// TOTALES
//==============================

const pacientes=JSON.parse(localStorage.getItem("pacientes"))||[];

const medicos=JSON.parse(localStorage.getItem("medicos"))||[];

const especialidades=JSON.parse(localStorage.getItem("especialidades"))||[];

const citas=JSON.parse(localStorage.getItem("citas"))||[];

document.getElementById("totalPacientes").innerHTML=pacientes.length;

document.getElementById("totalMedicos").innerHTML=medicos.length;

document.getElementById("totalEspecialidades").innerHTML=especialidades.length;

document.getElementById("totalCitas").innerHTML=citas.length;

//==============================
// ÚLTIMAS CITAS
//==============================

const tabla=document.getElementById("tablaCitas");

tabla.innerHTML="";

if(citas.length==0){

tabla.innerHTML=`

<tr>

<td colspan="4" class="text-center">

No hay citas registradas.

</td>

</tr>

`;

}else{

citas.slice(-5).reverse().forEach(c=>{

tabla.innerHTML+=`

<tr>

<td>${c.paciente}</td>

<td>${c.medico}</td>

<td>${c.fecha}</td>

<td>

<span class="badge bg-success">

${c.estado}

</span>

</td>

</tr>

`;

});

}