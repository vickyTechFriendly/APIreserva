import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import axios from  "axios";

function Perfil() {
    const [loged, setLoged] = useState(localStorage.getItem("infoUser"));
    const navigate = useNavigate();
    const [data, setData] = useState([]);
  
    //Coger datos del usuario logeado de backend y pintarlos en el perfil
    const getProfileData = async () => {
      try {
        const infoUser = localStorage.getItem("infoUser");
        /*       console.log("infoUser", infoUser);
         */ if (!infoUser) {
          navigate("/login");
          return;
        }
        const token = JSON.parse(infoUser).token;
        const response = await axios.get(
          `http://localhost:3000/api/users`,
          {
            headers: { "x-access-token": token },
          }
        );
        console.log("datos del perfil logeado: ", response);
         setData(response.data);
      } catch (error) {
        console.log("Da este error al coger la info del user", error);
        if (error.response.status === 401 || error.response.status === 400) {
          navigate("/login");
        }
      }
    };
  
    useEffect(() => {
      getProfileData();
    }, []);
  
    const logout = () => {
      localStorage.removeItem("infoUser");
      setLoged(false);
      navigate("/login");
    };
    return (
      <article className="perfilScreen">
        <section className="perfilScreen__container">
          <div className="perfilScreen__container-datos">
            <h2>Datos del perfil</h2>
  
            <div className="data-container">
              <p>
                Nº identificador: <span>{data.user_id}</span>
              </p>
              <p>
                Nombre: <span>{data.name}</span>
              </p>
              <p>
                Rol: <span>{data.role}</span>
              </p>
              <p>
                Email: <span>{data.email}</span>
              </p>
              <p>
                Telefono: <span>{data.telephone}</span>
              </p>
            </div>
            <div className="reserva-container">
              {data.reservations && data.reservations.map((reservation, index) => (
                <div key={index}>
                  <h3>Título: <span>{reservation.title}</span></h3>
                  <p>Nº participantes: <span>{reservation.participants}</span></p>
                  <p>Inicio Reserva: <span>{new Date(reservation.startReservation).toLocaleString()}</span></p>
                  <p>Fin Reserva: <span>{new Date(reservation.endReservation).toLocaleString()}</span></p>
                  <p>Descripción: <span>{reservation.comment}</span></p>
                  <p>id Sala: <span>{reservation.room_id}</span></p>
                  </div>
                  ))}
              </div>
            <div className="btns-container">
              {loged && (
                <button className="logOut" onClick={logout}>
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </section>
      </article>
    );
  }
  
  export default Perfil;