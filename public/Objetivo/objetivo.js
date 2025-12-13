document.addEventListener("DOMContentLoaded", () => {
    let objetivoSelecionado = null;

    const botoes = document.querySelectorAll(".btn-principal");
    const continuar = document.getElementById("btnContinuarObjetivo");

    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            objetivoSelecionado = btn.dataset.objetivo;


            botoes.forEach(b => b.classList.remove("ativo"));
            btn.classList.add("ativo");
        });
    });

    continuar.addEventListener("click", () => {
        if (!objetivoSelecionado) {
            alert("Selecione um objetivo antes de continuar!");
            return;
        }

        fetch("/objetivo", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `objetivo=${encodeURIComponent(objetivoSelecionado)}`
            })
            .then(() => {
                window.location.href = "/dashboard.html";
            })
            .catch(err => {
                console.error("Erro ao enviar objetivo:", err);
                alert("Erro ao enviar objetivo. Confira o servidor.");
            });
    });
});