import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

const Register = () => {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [requestError, setRequestError] = useState("");
  const navigate = useNavigate();

  const getData = async (email, password, role) => {
    try {
      const response = await Axios.post(
        "http://localhost:3000/api/users/register",
        {
          email,
          password,
          role,
        }
      );
      setRequestError("");
      goTo("/login");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            setRequestError(error.response.data.message);
          } else {
            setRequestError("Error desconocido");
      }
    }
  };

  useEffect(() => {
    /* getData(); */
  }, []);

  const submit = (e) => {
    let error = false;
    e.preventDefault();
    setErrorEmail("");
    setErrorPassword("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    if (!confirmPassword(password)) {
      error = true;
      setErrorPassword(
        "La contraseña debe contener al menos una letra mayúscula, un número y tener una longitud mínima de 6 caracteres"
      );
    }
    if (!confirmEmail(email)) {
      error = true;
      setErrorEmail("Por favor, introduce un correo electrónico válido");
    }
    if (error) return;
    getData(email, password, role);
  };

  const confirmPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(password);
  };

  const confirmEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const goTo = (url) => {
    navigate(url);
  };

  return (
    <section className="signupsection">
      <div className="form-container">
        <div className="register-container">
          <h1 className="maintitulo">Regístrate</h1>
          <form action="" onSubmit={submit}>
            <div>
              <label htmlFor="email">Dirección de correo {errorEmail}</label>
              <input
                type="email"
                name="email"
                id="email"
                className="loginInput"
              />
            </div>
            <div>
              <label htmlFor="password">Contraseña {errorPassword}</label>
              <input
                type="password"
                name="password"
                id="password"
                className="loginInput"
              />
            </div>
            <div>
            <input
            type="hidden"
            name="role"
            id="role"
            value="user"
            readOnly
          />                
            </div>
            <div className="btnslogin">
              <button className="btn-page" type="submit">
                Registrarse
              </button>
            </div>
          </form>
          <p className="text-sm">
            ¿Ya tienes cuenta?
            <Link to="/login"> Inicia sesión</Link>
          </p>
        </div>
      </div>
      <p>{requestError}</p>
    </section>
  );
};

export default Register;
