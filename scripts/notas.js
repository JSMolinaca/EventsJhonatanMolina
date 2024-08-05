let notas = [];

notas.push(
    {
        id: 1,
        titulo: "Hacer el trabajo",
        texto: "Si no la hago, pierdo el semestre",
        realizada: false,
    },
    {
        id: 2,
        titulo: "Tender la cama",
        texto: "Si no tiendo mi cam mi mama me castiga",
        realizada: false,
    }
);

let idGlobal = 2;

function pintarNotas(notasAPintar) {
    const contenedor = document.getElementById("contenedor-notas");
    contenedor.innerHTML = "";

    if (notasAPintar.length === 0) {
        contenedor.innerHTML = "<p>NO HAY NOTAS PARA MOSTRAR</p>";
        return;
    }

    notasAPintar.forEach((nota) => {
        contenedor.innerHTML += `
                    <div class="nota ${nota.realizada ? 'nota-realizada' : ''}">
                        <h3>${nota.titulo}</h3>
                        <p>${nota.texto}</p>
                        <div class="d-flex flex-column">
                            <button class="btn btn-danger mb-2" onclick="borrarNota(${nota.id})">Borrar nota</button>
                            <input onclick="marcarRealizada(${nota.id})" type="checkbox" ${nota.realizada ? "checked" : ""}>realizada
                        </div>
                    </div>
                `;
    });
}

function agregarNota(titulo, texto) {
    idGlobal++;
    notas.push({
        id: idGlobal,
        titulo: titulo,
        texto: texto,
        realizada: false,
    });
}

function guardarNota() {
    const titulo = document.getElementById("titulo").value;
    const texto = document.getElementById("texto").value;

    if (titulo && texto) {
        agregarNota(titulo, texto);
        limpiarCampos();
        aplicarFiltros();
    } else {
        alert("Por favor, completa todos los campos");
    }
}

function borrarNota(id) {
    notas = notas.filter((nota) => nota.id !== id);
    aplicarFiltros();
}

function limpiarCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
}

function marcarRealizada(id) {
    const nota = notas.find((nota) => nota.id === id);
    if (nota) {
        nota.realizada = !nota.realizada;
        aplicarFiltros();
    }
}

function filtrarPorRealizadas(notasAFiltrar) {
    return notasAFiltrar.filter((nota) => nota.realizada);
}

function filtrarPorTexto(notasAFiltrar, texto) {
    if (!texto) return notasAFiltrar;
    return notasAFiltrar.filter(
        (nota) =>
            nota.titulo.toLowerCase().includes(texto.toLowerCase()) ||
            nota.texto.toLowerCase().includes(texto.toLowerCase())
    );
}

function aplicarFiltros() {
    let notasFiltradas = [...notas];
    const textoBusqueda = document.getElementById("busqueda").value;
    const soloRealizadas = document.getElementById("filtroRealizadas").checked;

    if (soloRealizadas) {
        notasFiltradas = filtrarPorRealizadas(notasFiltradas);
    }

    notasFiltradas = filtrarPorTexto(notasFiltradas, textoBusqueda);

    pintarNotas(notasFiltradas);
}

document.getElementById('notaForm').addEventListener('submit', function (e) {
    e.preventDefault();
    guardarNota();
});

aplicarFiltros();