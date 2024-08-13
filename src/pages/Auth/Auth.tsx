import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/Auth/Action";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      fullname: "",
      nickname: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(register(data));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="p-8 grow shrink basis-0 self-stretch bg-gray-950 flex-col justify-between items-start inline-flex">
        <div className="justify-start items-center lg:gap-2 inline-flex">
          <div className="text-white text-lg font-medium leading-7">
            Cofrinho
          </div>
        </div>
        <div className="self-stretch h-[84px] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-white text-sm lg:text-lg font-normal leading-7 italic">
            “Uma jornada de mil quilômetros precisa começar com um simples
            passo.”
          </div>
          <div className="text-white text-sm font-normal leading-tight">
            Lao Tzu
          </div>
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch flex flex-col justify-center items-center gap-6 p-4 relative">
        <div className="h-9 px-8 py-2 bg-white rounded-md flex justify-center items-center gap-2 absolute top-0 right-0 m-4">
          <Button variant="ghost" className="text-gray-950 text-sm font-bold leading-tight">
            Login
          </Button>
        </div>
        <div className="py-2 flex flex-col justify-center items-center">
          <div className="text-[#08080a] text-2xl font-semibold leading-loose">
            Crie uma conta
          </div>
          <div className="text-zinc-500 text-sm font-normal leading-tight">
            Digite seu e-mail abaixo para criar sua conta
          </div>
        </div>
        <div className="w-full max-w-lg flex flex-col justify-start items-center gap-6">
          <div className="self-stretch flex flex-col justify-start items-center gap-2 px-5">
            <Form {...form}>
              <form
                className="space-y-3 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="py-3 px-3 w-full"
                          placeholder="Nome"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="py-3 px-3 w-full"
                          placeholder="Sobrenome"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          className="py-3 px-3 w-full"
                          placeholder="Apelido"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="py-3 px-3 w-full"
                          placeholder="E-mail"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="py-3 px-3 w-full"
                            placeholder="Senha"
                          />
                          <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {!showPassword ? (
                              <EyeOffIcon className="h-5 w-5 text-gray-500" />
                            ) : (
                              <EyeIcon className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className=" w-full h-9 px-4 py-2">
                  Registrar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
