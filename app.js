// Archivo: app.js
const contenido = document.getElementById("contenido");
const app = document.getElementById("app");
const puntosProgreso = document.querySelectorAll('.punto');

// === Control de timeouts ===
let timeouts = [];

function limpiarTimeouts() {
    timeouts.forEach(timeout => clearTimeout(timeout));
    timeouts = [];
}

// === Crear partículas de comida en el fondo ===
function crearParticulas() {
    const particulasDiv = document.getElementById('particulas');
    const emojisComida = ['🍕', '🍔', '🌮', '🍣', '🍜', '🍦', '🍩', '☕', '🍷', '🍺', '🥗', '🍉'];
    
    for (let i = 0; i < 20; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';
        particula.textContent = emojisComida[Math.floor(Math.random() * emojisComida.length)];
        particula.style.left = `${Math.random() * 100}%`;
        particula.style.animationDuration = `${15 + Math.random() * 20}s`;
        particula.style.animationDelay = `${Math.random() * 5}s`;
        particulasDiv.appendChild(particula);
    }
}

// === Actualizar progreso ===
function actualizarProgreso(pantallaActual) {
    puntosProgreso.forEach((punto, index) => {
        punto.classList.toggle('activo', index === pantallaActual);
    });
}

// === Funciones auxiliares ===
function mostrarElemento(texto, delay, clase = '') {
    const timeout = setTimeout(() => {
        const elemento = document.createElement('div');
        elemento.className = `fade ${clase}`;
        elemento.innerHTML = texto;
        contenido.appendChild(elemento);
        setTimeout(() => elemento.classList.add('show'), 50);
    }, delay);
    timeouts.push(timeout);
}

function mostrarEmoji(emoji, delay) {
    mostrarElemento(`<div class="emoji-grande">${emoji}</div>`, delay, 'emoji-container');
}

function mostrarImagen(src, delay, size = 250) {
    const timeout = setTimeout(() => {
        const img = document.createElement('img');
        img.src = src;
        img.width = size;
        img.className = 'fade';
        img.alt = "Imagen divertida";
        contenido.appendChild(img);
        setTimeout(() => img.classList.add('show'), 50);
    }, delay);
    timeouts.push(timeout);
}

// === Cargar datos ===
function cargarDatos() {
    mostrarPantallaCarga();
    
    fetch('datos_comidas.json')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar datos');
            return response.json();
        })
        .then(datos => {
            console.log('Datos cargados:', datos.length, 'registros');
            iniciarApp(datos);
        })
        .catch(error => {
            console.error('Error:', error);
            mostrarError();
        });
}

// === Pantalla de carga ===
function mostrarPantallaCarga() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    contenido.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
            <p>Cargando tus datos de comida... 🍽️</p>
            <p>Preparando estadísticas deliciosas</p>
        </div>
    `;
}

// === Pantalla de error ===
function mostrarError() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    contenido.innerHTML = `
        <div class="error">
            <h2>😢 Ups, algo salió mal</h2>
            <p>No se pudieron cargar los datos.</p>
            <p>Verifica que el archivo <strong>datos_comidas.json</strong> esté en la carpeta.</p>
            <button class="boton-usuario" onclick="location.reload()">Reintentar</button>
        </div>
    `;
}

// === Iniciar aplicación ===
function iniciarApp(datos) {
    // Variables globales
    window.datosComidas = datos;
    window.pantallaActual = 0;
    window.usuarioSeleccionado = null;
    
    // Extraer usuarios únicos
    const usuarios = [...new Set(datos.map(item => item.usuario))];
    
    // Mostrar pantalla de selección
    mostrarPantallaSeleccion(usuarios);
    
    // Configurar listener para avanzar
    contenido.addEventListener('click', manejarClicPantalla);
}

// === Pantalla de selección de usuario ===
function mostrarPantallaSeleccion(usuarios) {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    actualizarProgreso(0);
    
    let delay = 0;
    
    // Título
    mostrarElemento('<h1>🍽️ Tu Wrapped de Comidas 2026</h1>', delay);
    delay += 800;
    
    // Subtítulo
    mostrarElemento('<p>Descubre tus hábitos alimenticios del año</p>', delay);
    delay += 800;
    
    // Emoji divertido
    mostrarEmoji('🤤', delay);
    delay += 1000;
    
    // Instrucción
    mostrarElemento('<p style="margin-top: 20px; color: #7f8c8d;">¿Quién quiere ver su wrapped?</p>', delay);
    delay += 1000;
    
    // Botones de usuario
    usuarios.forEach(usuario => {
        const boton = document.createElement('button');
        boton.className = 'boton-usuario fade';
        boton.textContent = usuario.charAt(0).toUpperCase() + usuario.slice(1);
        boton.onclick = (e) => {
            e.stopPropagation();
            window.usuarioSeleccionado = usuario;
            window.pantallaActual = 1;
            mostrarPantalla1();
        };
        
        setTimeout(() => {
            contenido.appendChild(boton);
            setTimeout(() => boton.classList.add('show'), 50);
        }, delay);
        
        delay += 300;
    });
}

// === Manejar clics para avanzar ===
function manejarClicPantalla(e) {
    // Si es un botón de usuario, no hacer nada (ya tiene su handler)
    if (e.target.classList.contains('boton-usuario')) return;
    
    // Si no hay usuario seleccionado, no avanzar
    if (!window.usuarioSeleccionado) return;
    
    limpiarTimeouts();
    contenido.scrollTop = 0;
    window.pantallaActual++;
    
    // Navegar a la pantalla correspondiente
    switch(window.pantallaActual) {
        case 1: mostrarPantalla1(); break;
        case 2: mostrarPantalla2(); break;
        case 3: mostrarPantalla3(); break;
        case 4: mostrarPantalla4(); break;
        case 5: mostrarPantalla5(); break;
        case 6: mostrarPantalla6(); break;
        case 7: mostrarPantalla7(); break;
        case 8: mostrarPantalla8(); break;
        case 9: mostrarPantalla9(); break;
        default: 
            window.pantallaActual = 0;
            const usuarios = [...new Set(window.datosComidas.map(item => item.usuario))];
            mostrarPantallaSeleccion(usuarios);
            break;
    }
}

// === PANTALLA 1: Bienvenida ===
function mostrarPantalla1() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    actualizarProgreso(1);
    
    const usuario = window.usuarioSeleccionado;
    const datosUsuario = window.datosComidas.filter(item => item.usuario === usuario);
    window.datosUsuario = datosUsuario;
    
    let delay = 0;
    
    mostrarElemento(`<h1>¡Hola ${usuario}! 👋</h1>`, delay);
    delay += 1500;
    
    mostrarElemento(`<p>Vamos a analizar tus hábitos alimenticios de 2026 🍴</p>`, delay);
    delay += 1500;
    
    //mostrarEmoji('📊', delay);
    mostrarImagen('imagenes/nerd.png', delay, 150);
    delay += 1000;
    
    mostrarElemento(`<p>¿Listo para descubrir cuánto has comido?</p>`, delay);
}

// === PANTALLA 2: Total de comidas ===
function mostrarPantalla2() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    actualizarProgreso(2);
    
    const datosUsuario = window.datosUsuario;
    
    // SUMAR la columna n_plato_dia (1 solo en cada comida)
    const totalComidas = datosUsuario.reduce((sum, item) => sum + (item.n_plato_dia || 0), 0);
    
    // Calcular promedio de comidas al día
    // Primero obtenemos los días únicos en los que comió
    const diasUnicos = [...new Set(datosUsuario.map(item => item.fecha))];
    const totalDias = diasUnicos.length;
    
    // Promedio de comidas al día
    const promedioComidasDia = totalDias > 0 ? (totalComidas / totalDias).toFixed(1) : 0;
    
    let delay = 0;
    
    mostrarElemento('<h2>🍕 Total de Comidas</h2>', delay);
    delay += 1200;
    
    mostrarElemento(`<p>Este año tuviste <strong>${totalComidas}</strong> comidas diferentes</p>`, delay);
    delay += 1500;
    
    // Mostrar días registrados y promedio
    mostrarElemento(`<p>En <strong>${totalDias}</strong> días diferentes registrados</p>`, delay);
    delay += 1500;
    
    mostrarElemento(`<p>Promedio: <strong>${promedioComidasDia}</strong> comidas por día</p>`, delay);
    delay += 1500;
    
    // Comentario según promedio de comidas al día
    let comentario = '';
    let emoji = '';
    const promedio = parseFloat(promedioComidasDia);
    
    if (promedio >= 5) {
        comentario = '¡Come más que un deportista de élite! 🏋️‍♂️🍽️';
        emoji = '💪';
    } else if (promedio >= 4) {
        comentario = 'Ritmo de comidas perfecto, ni una se te escapa 😋';
        emoji = '😎';
    } else if (promedio >= 3) {
        comentario = 'Las 3 comidas principales al día, ¡bien hecho! 👍';
        emoji = '👌';
    } else if (promedio >= 2) {
        comentario = 'Dos comidas al día, ¿te saltas alguna? 🤔';
        emoji = '🤨';
    } else if (promedio >= 1) {
        comentario = 'Una comida al día... ¿estás a dieta o qué? 🐦';
        emoji = '😲';
    } else {
        comentario = '¿Eres un ser fotosintético? 🌱';
        emoji = '🌞';
    }
    
    mostrarElemento(`<p>${comentario}</p>`, delay);
    delay += 1500;
    
    mostrarEmoji(emoji, delay);
}

// === PANTALLA 3: Primer y último plato del año ===
function mostrarPantalla3() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    actualizarProgreso(3);
    
    const datosUsuario = window.datosUsuario;
    
    // Ordenar por fecha_hora para encontrar primero y último
    const datosOrdenados = [...datosUsuario].sort((a, b) => 
        new Date(a.fecha_hora) - new Date(b.fecha_hora)
    );
    
    // Encontrar primer y último plato (considerando n_plato_dia === 1 para ser comidas principales)
    const primeraComida = datosOrdenados.find(item => item.n_plato_dia === 1);
    const ultimaComida = [...datosOrdenados].reverse().find(item => item.n_plato_dia === 1);
    
    let delay = 0;
    
    mostrarElemento('<h2>🎬 Inicio y Final</h2>', delay);
    delay += 1200;
    
    if (primeraComida) {
        // Formatear fecha de la primera comida
        const fechaPrimera = new Date(primeraComida.fecha_hora);
        const fechaFormateadaPrimera = fechaPrimera.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        mostrarElemento(`<p>Tu <strong>primera comida</strong> registrada del año:</p>`, delay);
        delay += 1500;
        
        mostrarElemento(`<p style="font-size: 1.5rem; font-weight: 700; color: #27ae60;">${primeraComida.plato}</p>`, delay);
        delay += 1500;
        
        mostrarElemento(`<p>El <strong>${fechaFormateadaPrimera}</strong></p>`, delay);
        delay += 1500;
        
        // Comentario según hora de la primera comida
        const horaPrimera = parseInt(primeraComida.hora.split(':')[0]);
        let comentarioPrimera = '';
        if (horaPrimera < 6) {
            comentarioPrimera = '¡Qué madrugador para empezar el año! 🌅';
        } else if (horaPrimera < 12) {
            comentarioPrimera = 'Buen desayuno para arrancar el año ☕';
        } else if (horaPrimera < 18) {
            comentarioPrimera = 'Comiendo temprano, buen hábito 🕛';
        } else {
            comentarioPrimera = 'Empezando el año con cena 🌃';
        }
        
        mostrarElemento(`<p>${comentarioPrimera}</p>`, delay);
        delay += 1500;
    }
    
    if (ultimaComida && ultimaComida !== primeraComida) {
        // Separador visual
        mostrarElemento('<div style="height: 2px; background: linear-gradient(90deg, transparent, #ddd, transparent); margin: 20px 0;"></div>', delay);
        delay += 500;
        
        // Formatear fecha de la última comida
        const fechaUltima = new Date(ultimaComida.fecha_hora);
        const fechaFormateadaUltima = fechaUltima.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        mostrarElemento(`<p>Tu <strong>última comida</strong> registrada del año:</p>`, delay);
        delay += 1500;
        
        mostrarElemento(`<p style="font-size: 1.5rem; font-weight: 700; color: #e74c3c;">${ultimaComida.plato}</p>`, delay);
        delay += 1500;
        
        mostrarElemento(`<p>El <strong>${fechaFormateadaUltima}</strong></p>`, delay);
        delay += 1500;
        
        // Comentario según hora de la última comida
        const horaUltima = parseInt(ultimaComida.hora.split(':')[0]);
        let comentarioUltima = '';
        if (horaUltima < 6) {
            comentarioUltima = 'Terminando el año de madrugada, ¡épico! 🌙';
        } else if (horaUltima < 12) {
            comentarioUltima = 'Cerrando el año con buen desayuno 🍳';
        } else if (horaUltima < 18) {
            comentarioUltima = 'Año que termina, comida que alimenta 🍽️';
        } else {
            comentarioUltima = 'Cena de fin de año perfecta 🎉';
        }
        
        mostrarElemento(`<p>${comentarioUltima}</p>`, delay);
        delay += 1500;
        
        // Comparación si hay diferencia de platos
        if (primeraComida && primeraComida.plato !== ultimaComida.plato) {
            mostrarElemento('<div style="height: 2px; background: linear-gradient(90deg, transparent, #ddd, transparent); margin: 20px 0;"></div>', delay);
            delay += 500;
            
            mostrarElemento(`<p>De <strong style="color: #27ae60;">${primeraComida.plato}</strong> a <strong style="color: #e74c3c;">${ultimaComida.plato}</strong></p>`, delay);
            delay += 1500;
            
            // Comentario humorístico según la diferencia
            if (primeraComida.plato.toLowerCase().includes('cafe') && ultimaComida.plato.toLowerCase().includes('cafe')) {
                mostrarElemento(`<p>¡Vaya, te gusta tanto el café que empezaste y terminaste con él! ☕➡️☕</p>`, delay);
            } else if (primeraComida.plato === ultimaComida.plato) {
                mostrarElemento(`<p>Eres fiel a tus gustos, mismo plato para empezar y terminar 💖</p>`, delay);
            } else {
                mostrarElemento(`<p>¡Vaya evolución gastronómica en un año! 🔄</p>`, delay);
            }
        }
    }
    
    // Emoji final
    delay += 1500;
    mostrarEmoji('📅', delay);
}

// === PANTALLA 4: Día favorito para comer ===
function mostrarPantalla4() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    actualizarProgreso(3);
    
    const datosUsuario = window.datosUsuario;
    
    // Contar por día de la semana usando n_plato_dia
    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const conteoDias = {};
    diasSemana.forEach(dia => conteoDias[dia] = 0);
    
    // Solo contar cuando n_plato_dia == 1 (cada comida una vez)
    datosUsuario.forEach(item => {
        if (item.n_plato_dia === 1 && conteoDias[item.dia_semana] !== undefined) {
            conteoDias[item.dia_semana]++;
        }
    });
    
    // Encontrar día favorito
    let diaFavorito = '';
    let maxComidas = 0;
    
    diasSemana.forEach(dia => {
        if (conteoDias[dia] > maxComidas) {
            maxComidas = conteoDias[dia];
            diaFavorito = dia;
        }
    });
    
    // Calcular total de comidas por semana
    const totalComidasSemana = Object.values(conteoDias).reduce((sum, val) => sum + val, 0);
    const promedioComidasPorDiaSemana = totalComidasSemana > 0 ? (totalComidasSemana / 7).toFixed(1) : 0;
    
    let delay = 0;
    
    mostrarElemento('<h2>📅 Día Favorito</h2>', delay);
    delay += 1200;
    
    mostrarElemento(`<p>Tu día favorito para comer es el <strong>${diaFavorito}</strong></p>`, delay);
    delay += 1500;
    
    mostrarElemento(`<p>Con <strong>${maxComidas}</strong> comidas completas ese día</p>`, delay);
    delay += 1500;
    
    // Mostrar promedio de comidas por día de la semana
    mostrarElemento(`<p>Promedio: <strong>${promedioComidasPorDiaSemana}</strong> comidas por día de semana</p>`, delay);
    delay += 1500;
    
    // Comentario según día
    let comentario = '';
    if (['Sábado', 'Domingo'].includes(diaFavorito)) {
        comentario = '¡Los fines de semana se come de rechupete! 🎉';
    } else if (['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].includes(diaFavorito)) {
        comentario = 'Hasta entre semana te das tus banquetes 💼';
    }
    
    // Comentario extra según diferencia con promedio
    const diferenciaConPromedio = maxComidas - parseFloat(promedioComidasPorDiaSemana);
    if (diferenciaConPromedio > 2) {
        comentario += ' ¡Ese día comes el doble! 🍽️🍽️';
    }
    
    mostrarElemento(`<p>${comentario}</p>`, delay);
    delay += 1500;
    
    // Mostrar gráfico simple
    setTimeout(() => {
        const grafico = document.createElement('div');
        grafico.className = 'grafico-barras fade';
        
        diasSemana.forEach(dia => {
            const container = document.createElement('div');
            container.className = 'barra-container';
            
            const valor = document.createElement('div');
            valor.className = 'barra-valor';
            valor.textContent = conteoDias[dia];
            
            const barra = document.createElement('div');
            barra.className = 'barra';
            const maxValor = Math.max(...Object.values(conteoDias));
            const porcentaje = maxValor > 0 ? (conteoDias[dia] / maxValor) * 100 : 0;
            setTimeout(() => {
                barra.style.height = `${porcentaje}%`;
            }, 100);
            
            // Resaltar la barra del día favorito
            if (dia === diaFavorito) {
                barra.style.background = 'linear-gradient(to top, #c0392b, #e74c3c)';
            }
            
            const label = document.createElement('div');
            label.className = 'barra-label';
            label.textContent = dia.substring(0, 3);
            
            container.appendChild(valor);
            container.appendChild(barra);
            container.appendChild(label);
            grafico.appendChild(container);
        });
        
        contenido.appendChild(grafico);
        setTimeout(() => grafico.classList.add('show'), 50);
        
        // Añadir leyenda si hay día favorito claro
        if (maxComidas > parseFloat(promedioComidasPorDiaSemana) * 1.5) {
            setTimeout(() => {
                const leyenda = document.createElement('p');
                leyenda.className = 'fade';
                leyenda.style.fontSize = '0.9rem';
                leyenda.style.color = '#7f8c8d';
                leyenda.style.marginTop = '10px';
                leyenda.innerHTML = `↑ El <strong>${diaFavorito}</strong> tiene ${maxComidas - parseFloat(promedioComidasPorDiaSemana).toFixed(1)} comidas más que el promedio`;
                contenido.appendChild(leyenda);
                setTimeout(() => leyenda.classList.add('show'), 50);
            }, 500);
        }
    }, delay);
}
// === PANTALLA 5: Top 5 platos más repetidos ===
function mostrarPantalla5() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    actualizarProgreso(4);
    
    const datosUsuario = window.datosUsuario;
    
    // Contar platos más repetidos
    const conteoPlatos = {};
    datosUsuario.forEach(item => {
        const plato = item.plato;
        conteoPlatos[plato] = (conteoPlatos[plato] || 0) + 1;
    });
    
    // Convertir a array y ordenar por frecuencia (mayor a menor)
    const platosOrdenados = Object.entries(conteoPlatos)
        .sort((a, b) => b[1] - a[1]) // Ordenar descendente
        .slice(0, 5); // Tomar solo top 5
    
    // Plato más repetido (el primero)
    const platoFavorito = platosOrdenados[0] ? platosOrdenados[0][0] : '';
    const vecesRepetido = platosOrdenados[0] ? platosOrdenados[0][1] : 0;
    
    // Calcular porcentaje sobre total de platos
    const totalPlatos = datosUsuario.length;
    const porcentajeFavorito = totalPlatos > 0 ? Math.round((vecesRepetido / totalPlatos) * 100) : 0;
    
    let delay = 0;
    
    mostrarElemento('<h2>⭐ Top 5 Platos</h2>', delay);
    delay += 1200;
    
    // Mostrar plato favorito destacado
    mostrarElemento(`<p>Tu <strong>#1</strong> del año:</p>`, delay);
    delay += 1500;
    
    mostrarElemento(`<p style="font-size: 2rem; font-weight: 700; color: #e74c3c;">${platoFavorito}</p>`, delay);
    delay += 1500;
    
    mostrarElemento(`<p>Lo comiste <strong>${vecesRepetido} veces</strong> (${porcentajeFavorito}% de todos tus platos)</p>`, delay);
    delay += 1500;
    
    // Emoji según tipo de plato
    let emoji = '🍽️';
    if (platoFavorito.toLowerCase().includes('cafe')) emoji = '☕';
    else if (platoFavorito.toLowerCase().includes('pizza')) emoji = '🍕';
    else if (platoFavorito.toLowerCase().includes('hamburguesa')) emoji = '🍔';
    else if (platoFavorito.toLowerCase().includes('ensalada')) emoji = '🥗';
    
    mostrarEmoji(emoji, delay);
    delay += 1000;
    
    // Mostrar gráfico de barras con top 5
    if (platosOrdenados.length > 0) {
        setTimeout(() => {
            const grafico = document.createElement('div');
            grafico.className = 'fade';
            grafico.style.marginTop = '20px';
            grafico.style.width = '100%';
            grafico.style.maxWidth = '450px';
            
            const maxVeces = Math.max(...platosOrdenados.map(item => item[1]));
            
            grafico.innerHTML = `
                <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 15px; backdrop-filter: blur(5px);">
                    <p style="margin-bottom: 15px; font-weight: 600; color: #2c3e50; text-align: center;">🏆 Ranking Top 5</p>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${platosOrdenados.map(([plato, veces], index) => {
                            const porcentaje = maxVeces > 0 ? (veces / maxVeces) * 100 : 0;
                            const porcentajeTotal = totalPlatos > 0 ? Math.round((veces / totalPlatos) * 100) : 0;
                            const esPrimero = index === 0;
                            const color = esPrimero ? '#e74c3c' : '#3498db';
                            
                            // Emoji según posición
                            let posicionEmoji = '';
                            if (index === 0) posicionEmoji = '🥇';
                            else if (index === 1) posicionEmoji = '🥈';
                            else if (index === 2) posicionEmoji = '🥉';
                            else posicionEmoji = '🔸';
                            
                            // Acortar nombres largos
                            const platoCorto = plato.length > 20 ? plato.substring(0, 20) + '...' : plato;
                            
                            return `
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div style="width: 40px; text-align: center; font-size: 1.2rem; font-weight: 700; color: ${color}">
                                        ${posicionEmoji}
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                            <span style="font-weight: ${esPrimero ? '700' : '600'}; color: ${color}">${platoCorto}</span>
                                            <div style="display: flex; gap: 8px; align-items: center;">
                                                <span style="font-weight: 700; color: ${color}">${veces}</span>
                                                <span style="font-size: 0.8rem; color: #7f8c8d;">(${porcentajeTotal}%)</span>
                                            </div>
                                        </div>
                                        <div style="height: 20px; background: rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden; position: relative;">
                                            <div style="width: ${porcentaje}%; height: 100%; background: ${color}; transition: width 1.5s ease;"></div>
                                            <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); font-size: 0.8rem; font-weight: 600; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.3);">
                                                #${index + 1}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    <div style="margin-top: 15px; font-size: 0.8rem; color: #7f8c8d; text-align: center;">
                        <p>Total de platos registrados: <strong>${totalPlatos}</strong></p>
                    </div>
                </div>
            `;
            
            contenido.appendChild(grafico);
            setTimeout(() => grafico.classList.add('show'), 50);
            
            // Estadística adicional si el #1 es muy dominante
            if (platosOrdenados.length > 1) {
                const segundo = platosOrdenados[1][1];
                const diferencia = vecesRepetido - segundo;
                
                if (diferencia > 5) {
                    setTimeout(() => {
                        const nota = document.createElement('p');
                        nota.className = 'fade';
                        nota.style.fontSize = '0.9rem';
                        nota.style.color = '#7f8c8d';
                        nota.style.marginTop = '10px';
                        nota.style.textAlign = 'center';
                        nota.innerHTML = `<strong>${platoFavorito}</strong> le saca <strong>${diferencia}</strong> platos de ventaja al #2`;
                        contenido.appendChild(nota);
                        setTimeout(() => nota.classList.add('show'), 50);
                    }, 500);
                }
            }
        }, delay);
    }
}

// === PANTALLA 6: Resumen de contadores ===
function mostrarPantalla6() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    contenido.scrollTop = 0; // Resetear scroll
    
    // Poner el número de pantalla que corresponda, ej: actualizarProgreso(4);
    
    const datosUsuario = window.datosUsuario;
    
    // Calcular sumas de contadores
    const totalCafe = datosUsuario.reduce((sum, item) => sum + (item.contador_cafe || 0), 0);
    const totalYogur = datosUsuario.reduce((sum, item) => sum + (item.contador_yogur || 0), 0);
    const totalBurgerKing = datosUsuario.reduce((sum, item) => sum + (item.contador_burger_king || 0), 0);
    
    // Calcular porcentajes sobre el total de comidas
    const totalComidas = datosUsuario.reduce((sum, item) => sum + (item.n_plato_dia || 0), 0);
    const porcentajeCafe = totalComidas > 0 ? Math.round((totalCafe / totalComidas) * 100) : 0;
    const porcentajeYogur = totalComidas > 0 ? Math.round((totalYogur / totalComidas) * 100) : 0;
    const porcentajeBurgerKing = totalComidas > 0 ? Math.round((totalBurgerKing / totalComidas) * 100) : 0;
    
    let delay = 0;
    
    mostrarElemento('<h2>📊 Tus Favoritos</h2>', delay);
    delay += 1200;
    
    mostrarElemento('<p>Veamos qué te gusta más...</p>', delay);
    delay += 1500;
    
    // CAFÉ
    if (totalCafe > 0) {
        mostrarElemento(`<p><strong>☕ Café:</strong> ${totalCafe} veces</p>`, delay);
        delay += 1200;
        
        mostrarElemento(`<p>El ${porcentajeCafe}% de tus comidas incluyeron café</p>`, delay);
        delay += 1500;
        
        // Comentario según cantidad de café
        let comentarioCafe = '';
        if (totalCafe > 50) {
            comentarioCafe = '¡Eres un auténtico cafeinómano! ⚡';
        } else if (totalCafe > 20) {
            comentarioCafe = 'Te gusta arrancar el día con energía ☀️';
        } else if (totalCafe > 0) {
            comentarioCafe = 'Un cafelito de vez en cuando no hace daño 😌';
        }
        
        if (comentarioCafe) {
            mostrarElemento(`<p>${comentarioCafe}</p>`, delay);
            delay += 1500;
        }
    }
    
    // YOGUR
    if (totalYogur > 0) {
        // Separador visual
        mostrarElemento('<div style="height: 1px; background: rgba(0,0,0,0.1); margin: 15px 0;"></div>', delay);
        delay += 500;
        
        mostrarElemento(`<p><strong>🥛 Yogur:</strong> ${totalYogur} veces</p>`, delay);
        delay += 1200;
        
        mostrarElemento(`<p>El ${porcentajeYogur}% de tus comidas incluyeron yogur</p>`, delay);
        delay += 1500;
        
        // Comentario según cantidad de yogur
        let comentarioYogur = '';
        if (totalYogur > 30) {
            comentarioYogur = '¡Tu flora intestinal te adora! 🦠💖';
        } else if (totalYogur > 10) {
            comentarioYogur = 'Muy saludable, sigue así 🍃';
        } else if (totalYogur > 0) {
            comentarioYogur = 'Un toque de calcio en tu dieta 💪';
        }
        
        if (comentarioYogur) {
            mostrarElemento(`<p>${comentarioYogur}</p>`, delay);
            delay += 1500;
        }
    }
    
    // BURGER KING
    if (totalBurgerKing > 0) {
        // Separador visual
        mostrarElemento('<div style="height: 1px; background: rgba(0,0,0,0.1); margin: 15px 0;"></div>', delay);
        delay += 500;
        
        mostrarElemento(`<p><strong>🍔 Burger King:</strong> ${totalBurgerKing} veces</p>`, delay);
        delay += 1200;
        
        mostrarElemento(`<p>El ${porcentajeBurgerKing}% de tus comidas fueron en BK</p>`, delay);
        delay += 1500;
        
        // Comentario según cantidad de BK
        let comentarioBK = '';
        if (totalBurgerKing > 20) {
            comentarioBK = '¡Deberían darte acciones de la empresa! 👑';
        } else if (totalBurgerKing > 10) {
            comentarioBK = 'Eres cliente VIP sin saberlo 😎';
        } else if (totalBurgerKing > 0) {
            comentarioBK = 'Un Whopper de vez en cuando no hace daño 🍔';
        }
        
        if (comentarioBK) {
            mostrarElemento(`<p>${comentarioBK}</p>`, delay);
            delay += 1500;
        }
    }
    
    // Si no hay contadores
    if (totalCafe === 0 && totalYogur === 0 && totalBurgerKing === 0) {
        mostrarElemento('<p>No registraste ninguno de tus favoritos este año</p>', delay);
        delay += 1500;
        mostrarElemento('<p>¡El próximo año apunta más cosas! 📝</p>', delay);
        delay += 1500;
    }
    
    // Gráfico de barras para comparar
    if (totalCafe > 0 || totalYogur > 0 || totalBurgerKing > 0) {
        setTimeout(() => {
            const grafico = document.createElement('div');
            grafico.className = 'fade';
            grafico.style.marginTop = '20px';
            grafico.style.width = '100%';
            grafico.style.maxWidth = '400px';
            
            const contadores = [
                { nombre: 'Café', valor: totalCafe, color: '#8B4513', emoji: '☕' },
                { nombre: 'Yogur', valor: totalYogur, color: '#F0E68C', emoji: '🥛' },
                { nombre: 'Burger King', valor: totalBurgerKing, color: '#FF4500', emoji: '🍔' }
            ].filter(item => item.valor > 0);
            
            const maxValor = Math.max(...contadores.map(item => item.valor));
            
            grafico.innerHTML = `
                <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 15px; backdrop-filter: blur(5px);">
                    <p style="margin-bottom: 15px; font-weight: 600; color: #2c3e50; text-align: center;">📈 Comparativa</p>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        ${contadores.map(item => {
                            const porcentaje = maxValor > 0 ? (item.valor / maxValor) * 100 : 0;
                            return `
                                <div style="display: flex; align-items: center; gap: 15px;">
                                    <div style="font-size: 1.8rem;">${item.emoji}</div>
                                    <div style="flex: 1;">
                                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                            <span style="font-weight: 600;">${item.nombre}</span>
                                            <span style="font-weight: 700; color: ${item.color};">${item.valor}</span>
                                        </div>
                                        <div style="height: 20px; background: rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden;">
                                            <div style="width: ${porcentaje}%; height: 100%; background: ${item.color}; transition: width 1s ease;"></div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            
            contenido.appendChild(grafico);
            setTimeout(() => grafico.classList.add('show'), 50);
        }, delay);
    }
    
    delay += 1500;
    mostrarEmoji('🏆', delay);
}

// === PANTALLA 7: Horario preferido ===
function mostrarPantalla7() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    actualizarProgreso(5);
    
    const datosUsuario = window.datosUsuario;
    
    // Agrupar por franjas horarias usando n_plato_dia
    const franjas = {
        'Madrugada (00-06h)': 0,
        'Mañana (06-12h)': 0,
        'Tarde (12-18h)': 0,
        'Noche (18-24h)': 0
    };
    
    // Solo contar comidas completas (n_plato_dia === 1)
    datosUsuario.forEach(item => {
        if (item.n_plato_dia === 1) {
            const hora = parseInt(item.hora.split(':')[0]);
            
            if (hora >= 0 && hora < 6) franjas['Madrugada (00-06h)']++;
            else if (hora >= 6 && hora < 12) franjas['Mañana (06-12h)']++;
            else if (hora >= 12 && hora < 18) franjas['Tarde (12-18h)']++;
            else franjas['Noche (18-24h)']++;
        }
    });
    
    // Encontrar franja favorita
    let franjaFavorita = '';
    let maxEnFranja = 0;
    
    Object.entries(franjas).forEach(([franja, conteo]) => {
        if (conteo > maxEnFranja) {
            maxEnFranja = conteo;
            franjaFavorita = franja;
        }
    });
    
    // Calcular porcentaje de comidas en esa franja
    const totalComidas = Object.values(franjas).reduce((sum, val) => sum + val, 0);
    const porcentajeFranjaFavorita = totalComidas > 0 ? Math.round((maxEnFranja / totalComidas) * 100) : 0;
    
    let delay = 0;
    
    mostrarElemento('<h2>🕐 Horario Preferido</h2>', delay);
    delay += 1200;
    
    mostrarElemento(`<p>Tu franja horaria favorita es:</p>`, delay);
    delay += 1500;
    
    mostrarElemento(`<p style="font-size: 1.8rem; font-weight: 700; color: #e67e22;">${franjaFavorita}</p>`, delay);
    delay += 1500;
    
    mostrarElemento(`<p>Con <strong>${maxEnFranja} comidas</strong> en ese horario</p>`, delay);
    delay += 1500;
    
    // Mostrar porcentaje
    mostrarElemento(`<p>Eso es el <strong>${porcentajeFranjaFavorita}%</strong> de todas tus comidas</p>`, delay);
    delay += 1500;
    
    // Comentario según franja
    let comentario = '';
    let emojiExtra = '';
    
    if (franjaFavorita.includes('Madrugada')) {
        comentario = '¡Eres un trasnochador de la comida! 🌙';
        emojiExtra = '🦉';
    } else if (franjaFavorita.includes('Mañana')) {
        comentario = 'Empiezas el día con energía ☀️';
        emojiExtra = '🌅';
    } else if (franjaFavorita.includes('Tarde')) {
        comentario = 'La comida principal es sagrada 🍽️';
        emojiExtra = '⏰';
    } else {
        comentario = 'Las cenas son tus momentos especiales 🌃';
        emojiExtra = '🌙';
    }
    
    // Comentario adicional según porcentaje
    if (porcentajeFranjaFavorita > 50) {
        comentario += ' ¡Más de la mitad de tus comidas son a esa hora!';
    } else if (porcentajeFranjaFavorita < 20) {
        comentario += ' Repartes bien tus comidas a lo largo del día.';
    }
    
    mostrarElemento(`<p>${comentario}</p>`, delay);
    delay += 1500;
    
    // Mostrar emoji relacionado
    mostrarEmoji(emojiExtra, delay);
    delay += 1000;
    
    // Mostrar distribución completa si hay datos
    if (totalComidas > 0) {
        setTimeout(() => {
            const distribucion = document.createElement('div');
            distribucion.className = 'fade';
            distribucion.style.marginTop = '20px';
            distribucion.style.padding = '15px';
            distribucion.style.background = 'rgba(255, 255, 255, 0.1)';
            distribucion.style.borderRadius = '15px';
            distribucion.style.backdropFilter = 'blur(5px)';
            distribucion.style.width = '100%';
            distribucion.style.maxWidth = '400px';
            
            distribucion.innerHTML = `
                <p style="margin-bottom: 10px; font-weight: 600; color: #2c3e50;">📊 Distribución completa:</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${Object.entries(franjas).map(([franja, conteo]) => {
                        const porcentaje = totalComidas > 0 ? Math.round((conteo / totalComidas) * 100) : 0;
                        return `
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <span>${franja}:</span>
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div style="width: 100px; height: 8px; background: rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden;">
                                        <div style="width: ${porcentaje}%; height: 100%; background: ${franja === franjaFavorita ? '#e74c3c' : '#3498db'};"></div>
                                    </div>
                                    <span style="font-weight: 600; color: ${franja === franjaFavorita ? '#e74c3c' : '#2c3e50'};">${conteo} (${porcentaje}%)</span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            
            contenido.appendChild(distribucion);
            setTimeout(() => distribucion.classList.add('show'), 50);
        }, delay);
    }
}

// === PANTALLA 8: Mes más activo ===
function mostrarPantalla8() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    actualizarProgreso(6);
    
    const datosUsuario = window.datosUsuario;
    
    // Contar por mes usando n_plato_dia
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                   'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const conteoMeses = {};
    meses.forEach(mes => conteoMeses[mes] = 0);
    
    // Solo contar comidas completas (n_plato_dia === 1)
    datosUsuario.forEach(item => {
        if (item.n_plato_dia === 1 && conteoMeses[item.mes] !== undefined) {
            conteoMeses[item.mes]++;
        }
    });
    
    // Encontrar mes más activo
    let mesActivo = '';
    let maxEnMes = 0;
    
    meses.forEach(mes => {
        if (conteoMeses[mes] > maxEnMes) {
            maxEnMes = conteoMeses[mes];
            mesActivo = mes;
        }
    });
    
    // Calcular estadísticas adicionales
    const totalComidasAnio = Object.values(conteoMeses).reduce((sum, val) => sum + val, 0);
    const promedioMensual = totalComidasAnio > 0 ? (totalComidasAnio / meses.length).toFixed(1) : 0;
    const diferenciaConPromedio = maxEnMes - parseFloat(promedioMensual);
    
    let delay = 0;
    
    mostrarElemento('<h2>📈 Mes Más Activo</h2>', delay);
    delay += 1200;
    
    mostrarElemento(`<p>Tu mes más hambriento fue <strong>${mesActivo}</strong></p>`, delay);
    delay += 1500;
    
    mostrarElemento(`<p>Con <strong>${maxEnMes} comidas</strong> registradas</p>`, delay);
    delay += 1500;
    
    // Mostrar promedio anual
    mostrarElemento(`<p>Promedio anual: <strong>${promedioMensual}</strong> comidas por mes</p>`, delay);
    delay += 1500;
    
    // Comentario según mes
    let comentario = '';
    let emoji = '';
    
    if (['Diciembre', 'Noviembre'].includes(mesActivo)) {
        comentario = '¡Las fiestas navideñas abren el apetito! 🎄';
        emoji = '🎅';
    } else if (['Julio', 'Agosto'].includes(mesActivo)) {
        comentario = 'El verano y las vacaciones se notan 🏖️';
        emoji = '🌴';
    } else if (['Enero', 'Febrero'].includes(mesActivo)) {
        comentario = 'Empiezas el año con buen ritmo 🎆';
        emoji = '✨';
    } else {
        comentario = 'Buena temporada de comida 🍴';
        emoji = '📅';
    }
    
    // Comentario adicional según diferencia con promedio
    if (diferenciaConPromedio > 10) {
        comentario += ' ¡Vaya festín mensual! 🍽️';
    } else if (diferenciaConPromedio < 5) {
        comentario += ' Bastante estable durante el año.';
    }
    
    mostrarElemento(`<p>${comentario}</p>`, delay);
    delay += 1500;
    
    mostrarEmoji(emoji, delay);
    delay += 1000;
    
    // Mostrar gráfico de meses si hay datos
    if (totalComidasAnio > 0) {
        setTimeout(() => {
            const graficoMeses = document.createElement('div');
            graficoMeses.className = 'fade';
            graficoMeses.style.marginTop = '20px';
            graficoMeses.style.width = '100%';
            graficoMeses.style.maxWidth = '500px';
            
            // Crear filas para cada mes
            const mesesHTML = meses.map(mes => {
                const conteo = conteoMeses[mes] || 0;
                const porcentaje = totalComidasAnio > 0 ? Math.round((conteo / totalComidasAnio) * 100) : 0;
                const esMesActivo = mes === mesActivo;
                
                return `
                    <div style="display: flex; align-items: center; margin: 8px 0; gap: 10px;">
                        <div style="width: 80px; font-size: 0.9rem; font-weight: ${esMesActivo ? '700' : '500'}; color: ${esMesActivo ? '#e74c3c' : '#2c3e50'}">
                            ${mes.substring(0, 3)}
                        </div>
                        <div style="flex: 1; height: 20px; background: rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden; position: relative;">
                            <div style="width: ${porcentaje}%; height: 100%; background: ${esMesActivo ? '#e74c3c' : '#3498db'}; transition: width 1s ease;"></div>
                            <div style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); font-size: 0.8rem; font-weight: 600; color: ${esMesActivo ? '#e74c3c' : '#2c3e50'}">
                                ${conteo}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            graficoMeses.innerHTML = `
                <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 15px; backdrop-filter: blur(5px);">
                    <p style="margin-bottom: 15px; font-weight: 600; color: #2c3e50; text-align: center;">🍽️ Comidas por mes</p>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                        ${mesesHTML}
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 0.8rem; color: #7f8c8d;">
                        <div><span style="display: inline-block; width: 12px; height: 12px; background: #e74c3c; border-radius: 50%; margin-right: 5px;"></span> Mes más activo</div>
                        <div><span style="display: inline-block; width: 12px; height: 12px; background: #3498db; border-radius: 50%; margin-right: 5px;"></span> Otros meses</div>
                    </div>
                </div>
            `;
            
            contenido.appendChild(graficoMeses);
            setTimeout(() => graficoMeses.classList.add('show'), 50);
            
            // Mostrar estadística adicional si el mes activo es muy destacado
            if (diferenciaConPromedio > 5) {
                setTimeout(() => {
                    const nota = document.createElement('p');
                    nota.className = 'fade';
                    nota.style.fontSize = '0.9rem';
                    nota.style.color = '#7f8c8d';
                    nota.style.marginTop = '10px';
                    nota.style.textAlign = 'center';
                    nota.innerHTML = `En <strong>${mesActivo}</strong> comiste <strong>${diferenciaConPromedio.toFixed(1)}</strong> veces más que el promedio mensual`;
                    contenido.appendChild(nota);
                    setTimeout(() => nota.classList.add('show'), 50);
                }, 500);
            }
        }, delay);
    }
}

// === PANTALLA 9: Despedida ===
function mostrarPantalla9() {
    // Añadir esta línea al inicio de cada función
    contenido.scrollTop = 0;
    limpiarTimeouts();
    contenido.innerHTML = '';
    actualizarProgreso(7);
    
    const usuario = window.usuarioSeleccionado;
    let delay = 0;
    
    mostrarElemento('<h1>🎉 ¡Felicidades!</h1>', delay);
    delay += 1500;
    
    mostrarElemento(`<p>${usuario}, has completado tu Wrapped de Comidas 2026</p>`, delay);
    delay += 1500;
    
    mostrarEmoji('🏆', delay);
    delay += 1500;
    
    mostrarElemento('<p>Esperamos que te haya gustado este repaso gastronómico</p>', delay);
    delay += 1500;
    
    mostrarElemento('<p>¡Nos vemos el próximo año con más datos deliciosos! 🍕</p>', delay);
    delay += 1500;
    
    // Botón para reiniciar
    setTimeout(() => {
        const boton = document.createElement('button');
        boton.className = 'boton-usuario fade';
        boton.textContent = 'Ver de nuevo';
        boton.onclick = () => {
            window.pantallaActual = 0;
            const usuarios = [...new Set(window.datosComidas.map(item => item.usuario))];
            mostrarPantallaSeleccion(usuarios);
        };
        
        contenido.appendChild(boton);
        setTimeout(() => boton.classList.add('show'), 50);
    }, delay);
}

// === Iniciar todo ===
document.addEventListener('DOMContentLoaded', () => {
    crearParticulas();
    cargarDatos();
});
