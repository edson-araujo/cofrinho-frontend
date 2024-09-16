import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import SignupEmailConfirmation from "./SignupEmailConfirmation";
import {  useDispatch, useSelector } from "react-redux";
import { selectAuthTokenValido } from "../../redux-toolkit/auth/auth-selector";
import clsx from "clsx";
import { validaUsuario } from "../../redux-toolkit/auth/auth-thunks";

const Auth: React.FC = () => {
  const [active, setActive] = useState(true);
  const tokenValido = useSelector(selectAuthTokenValido);
  const [slideDirection, setSlideDirection] = useState("slide-in-right");
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validaUsuario()); // Opcional, se você quiser manter o token no estado
}, [dispatch, history]);

  const handleToggleActive = () => {
    setSlideDirection("slide-out-left");
    setTimeout(() => {
      setActive(!active);
      setSlideDirection("slide-in-right");
    }, 300);
  };

  return (
    <div className="min-h-screen h-screen lg:grid lg:grid-cols-2 relative overflow-hidden">
      <div className="relative flex items-center justify-center bg-gray-100 lg:w-full h-full">
        {!tokenValido ? (
          <div
            className={clsx(
              "mx-auto grid w-[600px] bg-white p-10 rounded-lg shadow-lg transition-transform duration-300",
              slideDirection === "slide-in-right" && "transform translate-x-0",
              slideDirection === "slide-out-left" && "transform -translate-x-full"
            )}
          >
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">
                {!active ? "Criar conta" : "Entrar"}
              </h1>
              <p className="text-muted-foreground">
                {!active
                  ? "Insira suas informações para criar uma conta"
                  : "Digite seu e-mail abaixo para fazer login em sua conta"}
              </p>
            </div>
            {active ? <Login /> : <Signup />}
            <div className="mt-4 text-center text-sm">
              {active ? "Não têm uma conta? " : "Já têm uma conta? "}
              <Link
                href="#"
                className="underline"
                prefetch="false"
                onClick={handleToggleActive}
              >
                {active ? "Criar conta" : "Entrar"}
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={clsx(
              "mx-auto grid w-[600px] transition-transform duration-300",
              slideDirection === "slide-in-right" && "transform translate-x-0",
              slideDirection === "slide-out-left" && "transform -translate-x-full"
            )}
          >
            <SignupEmailConfirmation />
          </div>
        )}
      </div>

      <div className="hidden lg:block bg-muted h-full">
        <img
          src="/image/porquinho.png"
          alt="Imagem do porquinho"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Auth;
