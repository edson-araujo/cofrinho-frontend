import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { UserRegistration } from "../../types/types";
import { registration } from "../../redux-toolkit/auth/auth-thunks";
import ReCAPTCHA from "react-google-recaptcha";

const createUserFormSchema = z
  .object({
    firstname: textoValidation("O nome"),
    lastname: textoValidation("O sobrenome"),
    nickname: campoValidation("O apelido"),
    email: z.string().email("O e-mail é obrigatório"),
    password: z
      .string()
      .nonempty("A senha é obrigatória")
      .min(6, "A senha deve ter pelo menos 6 caracteres"),
    password2: z.string().nonempty("A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.password2, {
    message: "As senhas precisam ser iguais",
    path: ["password2"], // Local do erro
  });

interface FormData {
  email: string;
  password: string;
  password2: string;
  firstname: string;
  lastname: string;
  nickname: string;
}

function Signup() {
  const methods = useForm<FormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
      firstname: "",
      lastname: "",
      nickname: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { handleSubmit, formState, control } = methods;

  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.auth.error);
  const [errorMessage, setErrorMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState<string | null>("");
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  const onChangeRecaptcha = (token: string | null): void => {
    setCaptchaValue(token);
  };

  const handleSubmitForm = (userData: UserRegistration): void => {
    if (!captchaValue) {
      setCaptchaError("Por favor, complete a verificação do captcha.");
      return;
    }
    dispatch(registration({ ...userData, captcha: captchaValue }));
  };

  useEffect(() => {
    if (loginError) {
      setErrorMessage(loginError);
    }
  }, [loginError, methods]);

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="grid gap-2">
            <FormField
              control={control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel
                    className={`font-medium ${
                      formState.errors.firstname
                        ? "border-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type="text"
                      className={`w-full ${
                        formState.errors.firstname ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="pt-1">
                    {formState.errors.firstname?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
              control={control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel
                    className={`font-medium ${
                      formState.errors.lastname
                        ? "border-red-500"
                        : "text-gray-600"
                    }`}
                  >
                    Sobrenome
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      type="text"
                      className={`w-full ${
                        formState.errors.lastname ? "border-red-500" : ""
                      }`}
                    />
                  </FormControl>
                  <FormMessage className="pt-1">
                    {formState.errors.lastname?.message}
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
              <FormLabel
                className={`font-medium ${
                  formState.errors.nickname ? "border-red-500" : "text-gray-600"
                }`}
              >
                Apelido
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  type="text"
                  className={`w-full ${
                    formState.errors.nickname ? "border-red-500" : ""
                  }`}
                />
              </FormControl>
              <FormMessage className="pt-1">
                {formState.errors.nickname?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4 space-y-0">
              <FormLabel
                className={`font-medium ${
                  formState.errors.email ? "border-red-500" : "text-gray-600"
                }`}
              >
                E-mail
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  type="email"
                  placeholder="email@example.com"
                  className={`w-full ${
                    formState.errors.email ? "border-red-500" : ""
                  }`}
                />
              </FormControl>
              <FormMessage className="pt-1">
                {formState.errors.email?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4 space-y-0">
              <FormLabel
                className={`font-medium ${
                  formState.errors.password ? "border-red-500" : "text-gray-600"
                }`}
              >
                Senha
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type={showPassword ? "text" : "password"}
                    className={`w-full ${
                      formState.errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? (
                      <EyeOffIcon
                        className={`h-5 w-5 text-gray-500 ${
                          formState.errors.password ? "text-red-500" : ""
                        }`}
                      />
                    ) : (
                      <EyeIcon
                        className={`h-5 w-5 text-gray-500 ${
                          formState.errors.password ? "text-red-500" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage className="pt-1">
                {formState.errors.password?.message}
                {errorMessage && (
                  <div className="text-red-600 text-sm">{errorMessage}</div>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password2"
          render={({ field }) => (
            <FormItem className="mb-4 space-y-0">
              <FormLabel
                className={`font-medium ${
                  formState.errors.password2
                    ? "border-red-500"
                    : "text-gray-600"
                }`}
              >
                Confirme a senha
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    type={showPassword2 ? "text" : "password"}
                    className={`w-full ${
                      formState.errors.password2 ? "border-red-500" : ""
                    }`}
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowPassword2(!showPassword2)}
                  >
                    {!showPassword2 ? (
                      <EyeOffIcon
                        className={`h-5 w-5 text-gray-500 ${
                          formState.errors.password2 ? "text-red-500" : ""
                        }`}
                      />
                    ) : (
                      <EyeIcon
                        className={`h-5 w-5 text-gray-500 ${
                          formState.errors.password2 ? "text-red-500" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage className="pt-1">
                {formState.errors.password2?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="captcha"
          render={({ field }) => (
            <FormItem className="mb-4 space-y-0">
              <FormLabel
                className={`font-medium ${
                  captchaError ? "border-red-500" : "text-gray-600"
                }`}
              >
                Verificação reCAPTCHA
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <ReCAPTCHA
                    {...field}
                    onChange={onChangeRecaptcha}
                    sitekey="6LcbPjQqAAAAACtxo-27FGb3q_Z5iVu0XlJ7sMfn"
                  />
                </div>
              </FormControl>
              {captchaError && (
                <FormMessage className="pt-1 text-red-500">
                  {captchaError}
                </FormMessage>
              )}
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
