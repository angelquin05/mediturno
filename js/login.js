//====================================
// LOGIN MEDITURNO
//====================================

document
.getElementById("loginForm")
.addEventListener("submit",function(e){

    e.preventDefault();

    const correo=document.getElementById("correo").value.trim();

    const password=document.getElementById("password").value.trim();

    if(correo==="admin@mediturno.com" && password==="12345"){

        localStorage.setItem("sesion","activa");

        window.location.href="dashboard.html";

    }else{

        alert("Correo o contraseña incorrectos.");

    }

});