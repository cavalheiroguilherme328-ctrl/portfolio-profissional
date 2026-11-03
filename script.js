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
