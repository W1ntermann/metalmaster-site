import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Підключаємо тестові утиліти Make webhook в development режимі
if (import.meta.env.DEV) {
  import("./utils/testMakeWebhook");
}

createRoot(document.getElementById("root")!).render(<App />);
