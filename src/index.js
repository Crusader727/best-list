if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("Service Worker зарегистрирован"))
        .catch((err) => console.log("Ошибка регистрации Service Worker", err));
}
