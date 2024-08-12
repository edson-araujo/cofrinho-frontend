import React from "react";
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

const Auth = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      fullName: "",
    },
  });

  const onSubmit = (data) => {
    dispatch(register(data));
  };

  return (
    <div className="flex h-screen">
      <div className="grow shrink basis-0 self-stretch p-10 bg-zinc-900 flex-col justify-between items-start inline-flex">
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="w-6 h-6 relative"></div>
          <div className="text-white text-lg font-medium leading-7">
            Acme Inc
          </div>
        </div>
        <div className="self-stretch h-[84px] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-white text-lg font-normal leading-7">
            “This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </div>
          <div className="text-white text-sm font-normal leading-tight">
            Sofia Davis
          </div>
        </div>
      </div>
      <div className="grow shrink basis-0 self-stretch flex flex-col justify-center items-center gap-6">
        <div className="h-9 px-4 py-2 bg-white rounded-md justify-center items-center gap-2 inline-flex">
          <div className="text-[#08080a] text-sm font-medium leading-tight">
            Login
          </div>
        </div>
        <div className="py-2 flex-col justify-center items-center flex">
          <div className="text-[#08080a] text-2xl font-semibold leading-loose">
            Create an account
          </div>
          <div className="text-zinc-500 text-sm font-normal leading-tight">
            Enter your email below to create your account
          </div>
        </div>
        <div className="w-full flex-col justify-start items-center gap-6 flex"> {/* Ajuste aqui */}
          <div className="self-stretch flex-col justify-start items-center gap-2 flex">
            <Form {...form}>
              <form
                className="space-y-3 w-full h-9 px-4 py-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          className=""
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
                          type="text"
                          className=""
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
                          type="text"
                          className=""
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
                          type="email"
                          className=""
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
                        <Input
                          type="password"
                          className=""
                          placeholder="Senha"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full h-9 px-4 py-2">
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
