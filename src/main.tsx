import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PreparePage from './pages/Prepare.tsx';
import ApprovePage from './pages/Approve.tsx';
import SettingsPage from './pages/Settings.tsx';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: "/prepare",
    element: <PreparePage />
  },
  {
    path: "/settings",
    element: <SettingsPage />
  },
  {
    path: "/approve",
    element: <ApprovePage />
  },
  {
    path: "/",
    element: <App />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>,
)
