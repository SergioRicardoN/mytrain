document.addEventListener("DOMContentLoaded", () => {
    let nivelSelecionado = null;

    const botoes = document.querySelectorAll(".btn-principal");
    const continuar = document.getElementById("btnContinuar");

    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            nivelSelecionado = btn.dataset.nivel;


            botoes.forEach(b => b.classList.remove("ativo"));
            btn.classList.add("ativo");
        });
    });

    continuar.addEventListener("click", () => {
        if (!nivelSelecionado) {
            alert("Selecione um nível antes de continuar!");
            return;
        }

        fetch("/nivel", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `nivel=${encodeURIComponent(nivelSelecionado)}`
            })
            .then(() => {
                window.location.href = "/objetivo.html";
            })
            .catch(err => {
                console.error("Erro ao enviar nível:", err);
                alert("Erro ao enviar nível. Confira o servidor.");
            });
    });
});