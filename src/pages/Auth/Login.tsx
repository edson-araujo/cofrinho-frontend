import { Link } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../../Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const createUserFormSchema = z.object({
  email: z.string().email("O e-mail é obrigatório"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const methods = useForm<FormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, formState, control } = methods;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(login({ ...data, rememberMe }));
  };

  const loginError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (loginError) {
      setErrorMessage(loginError);
    }
  }, [loginError]);
  return (
    <FormProvider {...methods}>
      <form className="space-y-3 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
       
          <div className="grid gap-2">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-600">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center w-full">
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="flex justify-between items-center w-full">
                      <FormLabel className="font-medium text-gray-600">
                        Senha
                      </FormLabel>
                      <Link
                        href="#"
                        className="ml-auto text-sm font-medium text-gray-400"
                        prefetch="false"
                      >
                        Esqueceu sua senha?
                      </Link>
                    </div>
                    <FormControl className="w-full">
                      <div className="relative w-full">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="py-3 px-3 w-full"
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
                    <FormMessage>
                      {formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            {errorMessage && (
            <div className="text-red-600 text-sm">{errorMessage}</div>
          )}
          </div>
          
          <Button type="submit" className="w-full">
            Entrar
          </Button>
          <Button variant="outline" className="w-full">
            Entrar com Google
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Login;
