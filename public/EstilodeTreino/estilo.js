document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formEstilo");

    form.addEventListener("submit", (event) => {
        const estiloSelecionado = document.querySelector("input[name='estilo']:checked");
        if (!estiloSelecionado) {
            event.preventDefault();
            alert("Por favor, selecione Casa ou Academia!");
        }
    });
});