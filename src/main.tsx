import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { ThemeProvider } from "../src/components/theme-provider.tsx";
import { store } from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <TooltipProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </TooltipProvider>
    </BrowserRouter>
  </StrictMode>
);
