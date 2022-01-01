import router from "./router";
import { RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
