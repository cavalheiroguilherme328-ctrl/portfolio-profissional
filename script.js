// Registro e atualização do PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        const updateNotice = document.getElementById("update-notice");
        const updateButton = document.getElementById("update-button");

        try {
            const registration = await navigator.serviceWorker.register("./service-worker.js");

            console.log("PWA registrado:", registration.scope);

            let newWorker = null;

            registration.addEventListener("updatefound", () => {
                newWorker = registration.installing;

                newWorker.addEventListener("statechange", () => {
                    if (
                        newWorker.state === "installed" &&
                        navigator.serviceWorker.controller
                    ) {
                        updateNotice.hidden = false;
                    }
                });
            });

            updateButton.addEventListener("click", () => {
                if (registration.waiting) {
                    registration.waiting.postMessage({ action: "SKIP_WAITING" });
                }
            });

            navigator.serviceWorker.addEventListener("controllerchange", () => {
                window.location.reload();
            });

            registration.update();

        } catch (error) {
            console.error("Erro ao registrar o PWA:", error);
        }
    });
}
// Envio de orçamento pelo WhatsApp
document.addEventListener("DOMContentLoaded", () => {
    const budgetForm = document.getElementById("budget-form");

    if (!budgetForm) return;

    budgetForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("client-name").value.trim();
        const project = document.getElementById("project-type").value;
        const deadline = document.getElementById("project-deadline").value;
        const description = document.getElementById("project-description").value.trim();

        const whatsappNumber = "5551993379406";

        const message = 
`Olá! Gostaria de solicitar um orçamento.

Nome: ${name}
Tipo de projeto: ${project}
Prazo desejado: ${deadline}

Descrição:
${description}`;

        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.location.href = whatsappURL;
    });
});
