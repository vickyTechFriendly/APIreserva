import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [loged, setLoged] = useState(localStorage.getItem("infoUser"));
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const infoUser = localStorage.getItem("infoUser");
      if (!infoUser) {
        navigate("/login");
        return;
      }
      const token = JSON.parse(infoUser).token;
      const response = await axios.get("http://localhost:3001/", {
        headers: { "x-access-token": token },
      });
      setData(response.data);
    } catch (error) {
      console.log("Da este error al entrar en home", error);
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleButtonClick = (route) => {
    navigate(route);
  };

  /* if (!loged) {
    navigate("/login");
  } */
  return (
    <section className="homensection">
      <div className="home-container">
        <div className="menu-container">
            <button
            className="homebtns"
            onClick={() => handleButtonClick("/perfil")}
          >
            Perfil
          </button>
        </div>
      </div>
    </section>
  );
}

export default Home;
