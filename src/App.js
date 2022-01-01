import router from "./router";
import { RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
