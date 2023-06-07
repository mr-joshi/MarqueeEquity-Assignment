import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/plus-jakarta-sans/latin.css";
import App from "./App";
import { AppProvider } from "./context/context";
import { TodoProvider } from "./context/todoContext";
import { theme } from "./lib/styles/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <TodoProvider>
        <ColorModeScript initialColorMode={theme.config?.initialColorMode} />
        <App />
      </TodoProvider>
    </AppProvider>
  </React.StrictMode>
);
