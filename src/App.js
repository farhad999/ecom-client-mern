import router from "./router";
import { Navigate, RouterProvider, useFetcher } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/slices/authSlice";
import React from "react";

function App() {
 
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  //fetch user

  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
