document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formModo");

    form.addEventListener("submit", (event) => {
        const modoSelecionado = document.querySelector("input[name='modo']:checked");
        if (!modoSelecionado) {
            event.preventDefault();
            alert("Por favor, selecione um modo de treino!");
        }
    });
});