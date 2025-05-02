import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Providers } from './providers.jsx';

createRoot(document.getElementById("root")).render(
  <Providers>
    <App />
  </Providers>
);