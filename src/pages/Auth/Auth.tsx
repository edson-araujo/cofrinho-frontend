import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const Auth: React.FC = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[450px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              {!active ? "Criar conta" : "Entrar"}
            </h1>
            <p className="text-balance text-muted-foreground">
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
              onClick={() => setActive(!active)}
            >
               {active ? "Criar conta" : "Entrar"}
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/image/porquinho.png"
          width="1920"
          height="1080"
          className="min-h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
          style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Auth;
