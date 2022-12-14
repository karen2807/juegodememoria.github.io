//////Incialización
let tarjetasDes =0;
let tarjeta1=null;
let tarjeta2= null;
let primerResultado= null;
let segundoResultado= null;
let movimiento=0;
let aciertos=0;
let temporadizador = false;
let timer = 40;
let timerIni = 40;
let tiempoReg=null;

let aGanar = new Audio('./sonido/ganar.mp3');
let aPerder = new Audio('./sonido/gameo.mp3');
let aClick = new Audio('./sonido/click.mp3');
let aError = new Audio('./sonido/error.mp3');
let aBien = new Audio('./sonido/correcto1.mp3');

//apuntador de id del documento html
let mostrarMov = document.getElementById('movimiento')
let mostrarAci = document.getElementById('acierto')
let mostrarTiempo = document.getElementById('tiempo')

//////Generar numeros aleatorias
let num = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
num = num.sort(()=>{return Math.random()-0.5})

/////Funciones
function contarTiempo() {
  tiempoReg = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML= `Tiempo: ${timer} seg`;
        if (timer <= 0) {
            clearInterval(tiempoReg);
            bloquearTarjeta(num);
            aPerder.play();
        }
    },1000);
}

function bloquearTarjeta(num) {
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloq = document.getElementById(i);
        // tarjetaBloq.innerHTML = num[i];    //muestra los valores
        tarjetaBloq.innerHTML = `<img src="./img1/${num[i]}.png" alt="">`; 
        tarjetaBloq.disabled = true;
        
    }
    
}

/////Funcion Principal

function ver(id) {

    if (temporadizador==false) {
        contarTiempo();
        temporadizador =true;
    }

    
    tarjetasDes++;
    if (tarjetasDes==1) {
        //Mostrar el primer numero
        tarjeta1= document.getElementById(id);
        primerResultado = num [id];
        // tarjeta1.innerHTML = primerResultado; //Lo que se muestra en el botón al hacer clic
        tarjeta1.innerHTML = `<img src="./img1/${primerResultado}.png" alt="">`; 
        aClick.play();
        
        //deshabilitar el primer botón para que el contador no aumente al presionarlo varias veces una vez habilitado
        tarjeta1.disabled=true;
        
        primerId= id;
    } else if (tarjetasDes==2){
         //Mostrar el primer numero
         tarjeta2= document.getElementById(id);
         segundoResultado = num [id];
        //  tarjeta2.innerHTML = segundoResultado; //Lo que se muestra en el botón al hacer clic
         tarjeta2.innerHTML = `<img src="./img1/${segundoResultado}.png" alt="">`; 
         //deshabilitar el primer botón para que el contador no aumente al presionarlo varias veces una vez habilitado
         tarjeta2.disabled=true;
        //  tarjetasDes++;
         segundoId= id;
         //incrementar movimientos
         movimiento++;
        mostrarMov.innerHTML = `Movimientos: ${movimiento}`;

        if (primerResultado == segundoResultado) {
            //encerar resultados de tarjetas destapadas
            tarjetasDes=0;
            aBien.play();
            //aumentar aciertos
            aciertos++;
            mostrarAci.innerHTML = `Aciertos: ${aciertos}`;
            if (aciertos==8) {
                aGanar.play();
                clearInterval(tiempoReg);
                mostrarAci.innerHTML = `Aciertos: ${aciertos} 😱​🥳​💯​`;
                mostrarTiempo.innerHTML = `Felicidades 🥳 lo resolviste en ${timerIni-timer} seg 💥​`;
                mostrarMov.innerHTML = `Movimientos: ${movimiento} 🤘​😼​`;
            }

        } else {//mostrar valores momentaneamente y volver a tapar
            aError.play();
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDes = 0;
            },800)
            
        }
    }
}