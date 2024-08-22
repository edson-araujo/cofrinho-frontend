import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../../components/ui/form";
import { campoValidation, textoValidation } from "../../helpers/zodHelpers";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/Auth/Action";

const createUserFormSchema = z.object({
  name: textoValidation("O nome"),
  fullname: textoValidation("O sobrenome"),
  nickname: campoValidation("O apelido"),
  email: z.string().email("O e-mail é obrigatório"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

interface FormData {
  email: string;
  password: string;
  name: string;
  fullname: string;
  nickname: string;
}

function Signup() {
  const methods = useForm<FormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      fullname: "",
      nickname: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, formState, control } = methods;
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(register(data));
  };
  return (
    <FormProvider {...methods}>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="grid gap-2">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className={`font-medium ${formState.errors.name ? 'border-red-500' : 'text-gray-600'}`}>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={`w-full ${formState.errors.name ? 'border-red-500' : ''}`}
                      />
                    </FormControl>
                    <FormMessage className="pt-1">{formState.errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className={`font-medium ${formState.errors.fullname ? 'border-red-500' : 'text-gray-600'}`}>Sobrenome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className={`w-full ${formState.errors.fullname ? 'border-red-500' : ''}`}
                      />
                    </FormControl>
                    <FormMessage className="pt-1">
                      {formState.errors.fullname?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={control}
            name="nickname"
            render={({ field }) => (
              <FormItem className="mb-4 space-y-0">
                <FormLabel className={`font-medium ${formState.errors.nickname ? 'border-red-500' : 'text-gray-600'}`}>Apelido</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className={`w-full ${formState.errors.nickname ? 'border-red-500' : ''}`}
                  />
                </FormControl>
                <FormMessage className="pt-1">{formState.errors.nickname?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4 space-y-0">
                <FormLabel className={`font-medium ${formState.errors.email ? 'border-red-500' : 'text-gray-600'}`}>E-mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className=" w-full"
                    placeholder="email@example.com"
                    className={`w-full ${formState.errors.email ? 'border-red-500' : ''}`}
                  />
                </FormControl>
                <FormMessage className="pt-1">{formState.errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4 space-y-0">
                <FormLabel className={`font-medium ${formState.errors.password ? 'border-red-500' : 'text-gray-600'}`}>Senha</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className={`w-full ${formState.errors.password ? 'border-red-500' : ''}`}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? (
                        <EyeOffIcon className={`h-5 w-5 text-gray-500 ${formState.errors.password ? 'text-red-500' : ''}`}/>
                      ) : (
                        <EyeIcon className={`h-5 w-5 text-gray-500 ${formState.errors.password ? 'text-red-500' : ''}`} />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="pt-1">{formState.errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="w-full py-3 text-white"
          >
            Cadastrar
          </Button>
        </form>
      </FormProvider>
  );
}

export default Signup;
