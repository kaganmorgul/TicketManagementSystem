import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormProvider } from "./context/FormValContext.js";
import { AuthProvider } from "./context/AuthContext";
import { GeneralProvider } from "./context/GeneralContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GeneralProvider>
      <FormProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FormProvider>
    </GeneralProvider>
  </React.StrictMode>
);
