const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Fechar menu" : "Abrir menu"
        );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });
}

const year = document.getElementById("current-year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// Formulário de solicitação de orçamento
const budgetForm = document.getElementById("budget-form");

if (budgetForm) {
    budgetForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("client-name").value.trim();
        const project = document.getElementById("project-type").value;
        const deadline = document.getElementById("project-deadline").value;
        const description = document.getElementById("project-description").value.trim();

        const message = `Olá! Gostaria de solicitar um orçamento.

Nome: ${name}
Tipo de projeto: ${project}
Prazo desejado: ${deadline}

Descrição do projeto:
${description}`;

        const whatsappURL = `https://wa.me/5551993379406?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}
// Registro do Service Worker do PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
            .then((registration) => {
                console.log("PWA registrado:", registration.scope);
            })
            .catch((error) => {
                console.error("Erro ao registrar o PWA:", error);
            });
    });
}
