import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { CheckCircleIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../redux-toolkit/auth/auth-selector";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { updateEmail } from "../../redux-toolkit/auth/auth-thunks";

const createUserFormSchema = z.object({
  newEmail: z.string().email("O e-mail é obrigatório"),
});

const SignupEmailConfirmation = () => {
  const methods = useForm<FormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      newEmail: "",
    },
  });
  const { handleSubmit, formState, control } = methods;

  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const handleSubmitForm = (newEmail: newEmail) => {
    dispatch(updateEmail({ userId, newEmail }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full bg-white p-10 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">
            Verifique seu e-mail
          </h2>
          <p className="text-gray-600 mt-2">
            Um e-mail foi enviado para ativar sua conta. Se você não recebeu ou
            deseja alterar o e-mail, insira abaixo e reenvie a confirmação.
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <FormField
              control={control}
              name="newEmail"
              render={({ field }) => (
                <FormItem className="mb-4 space-y-0">
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

            <Button
              type="submit"
              variant="default"
              className="w-full mt-4 py-3"
            >
              Reenviar confirmação para este e-mail
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignupEmailConfirmation;
