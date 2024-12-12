
function guardarTareas(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}


function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    return tareas;
}


function agregarTarea() {
    const tareaInput = document.getElementById("tareaInput");
    const tareaTexto = tareaInput.value.trim();
    if (tareaTexto) {
        const tareas = cargarTareas();
        tareas.push({ id: Date.now(), texto: tareaTexto });
        guardarTareas(tareas);
        tareaInput.value = "";
        mostrarTareas();
    }
}


function mostrarTareas() {
    const tareas = cargarTareas();
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = '';
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        listaTareas.appendChild(li);
    });
}

document.getElementById("btnAgregar").addEventListener("click", agregarTarea);
mostrarTareas();



function buscarTarea() {
    const busquedaInput = document.getElementById("busquedaInput");
    const textoBusqueda = busquedaInput.value.trim().toLowerCase();
    const tareas = cargarTareas();
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = '';
    const tareasFiltradas = tareas.filter(tarea => tarea.texto.toLowerCase().includes(textoBusqueda));
    tareasFiltradas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        listaTareas.appendChild(li);
    });
}


const busquedaInputHTML = document.createElement('input');
busquedaInputHTML.id = 'busquedaInput';
busquedaInputHTML.placeholder = 'Buscar tarea';
document.body.insertBefore(busquedaInputHTML, document.getElementById("btnAgregar"));



busquedaInputHTML.addEventListener("input", buscarTarea);




function editarTarea(id) {
    const tareas = cargarTareas();
    const tarea = tareas.find(t => t.id === id);
    const nuevoTexto = prompt("Editar tarea", tarea.texto);
    if (nuevoTexto !== null) {
        tarea.texto = nuevoTexto.trim();
        guardarTareas(tareas);
        mostrarTareas();
    }
}


function mostrarTareas() {
    const tareas = cargarTareas();
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = '';
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.addEventListener("click", () => editarTarea(tarea.id));
        li.appendChild(editarBtn);
        listaTareas.appendChild(li);
    });
}


function eliminarTarea(id) {
    const tareas = cargarTareas();
    const tareasFiltradas = tareas.filter(t => t.id !== id);
    guardarTareas(tareasFiltradas);
    mostrarTareas();
}


function mostrarTareas() {
    const tareas = cargarTareas();
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = '';
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.addEventListener("click", () => editarTarea(tarea.id));
        li.appendChild(editarBtn);

        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", () => eliminarTarea(tarea.id));
        li.appendChild(eliminarBtn);

        listaTareas.appendChild(li);
    });
}
