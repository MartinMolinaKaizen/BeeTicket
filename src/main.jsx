import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

// Kaizen Dashboard Context Provider
import { SoftUIControllerProvider, MessageManagerProvider } from "./context";
import { UserProvider } from "./context/user.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <SoftUIControllerProvider>
          <MessageManagerProvider>
            <App />
          </MessageManagerProvider>
        </SoftUIControllerProvider>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)
