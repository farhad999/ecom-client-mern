import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  if (user.role === "admin") {
    navigate("/admin", { replace: true });
  }

  console.log('user', user);

  return <div>Home Layout</div>;
};

export default HomeLayout;
