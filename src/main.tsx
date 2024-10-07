import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import PreparePage from './pages/Prepare.tsx';
import ApprovePage from './pages/Approve.tsx';

const router = createBrowserRouter([
  {
    path: "/prepare",
    element: <PreparePage />
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
    <RouterProvider router={router} />
  </StrictMode>,
)
