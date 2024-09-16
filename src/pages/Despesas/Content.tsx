import {
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Copy,
  MoreVertical,
  Truck,
  CalendarIcon,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../../components/ui/pagination";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { campoValidation, textoValidation } from "../../helpers/zodHelpers";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { NumericFormat } from "react-number-format";
import { cn } from "../../lib/utils";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";


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
  fonteDespesa: string;
}

export function DespesasContent() {
  const methods = useForm<FormData>({
    resolver: zodResolver(createUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      fullname: "",
      nickname: "",
      fonteDespesa: "",
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, formState, control } = methods;
  const [date, setDate] = useState<Date>(new Date());
  const { despesa } = useSelector((state) => state.despesa);

  useEffect(() => {
    // dispatch(fetchFontesDespesa());
  }, [dispatch]);

  const onSubmit = (data) => {
    // dispatch(register(data));
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:pl-6">
        <main className="grid flex-1 items-start gap-4 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>Nova despesa</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Cadastre sua nova despesa e tenha controle sobre suas
                    finanças pessoais.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormProvider {...methods}>
                    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                      <FormField
                        control={control}
                        name="nickname"
                        render={({ field }) => (
                          <FormItem className="mb-4 space-y-0">
                            <FormLabel
                              className={`font-medium ${
                                formState.errors.nickname
                                  ? "border-red-500"
                                  : "text-gray-600"
                              }`}
                            >
                              Repetição
                            </FormLabel>
                            <FormControl>
                              <Select defaultValue="unica">
                                <SelectTrigger id="categoria">
                                  <SelectValue placeholder="Selecione uma categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="unica">
                                    Única
                                  </SelectItem>
                                  <SelectItem value="parcelada">
                                    Parcelada
                                  </SelectItem>
                                  <SelectItem value="fixa">Fixa</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="pt-1">
                              {formState.errors.nickname?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="grid gap-2">
                          <FormField
                            control={control}
                            name="fullname"
                            render={({ field }) => (
                              <FormItem className="space-y-0">
                                <FormLabel
                                  className={`font-medium ${
                                    formState.errors.fullname
                                      ? "border-red-500"
                                      : "text-gray-600"
                                  }`}
                                >
                                  Data
                                </FormLabel>
                                <FormControl>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "pl-2 w-full justify-start text-left font-normal",
                                          !date && "text-muted-foreground"
                                        )}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                        {date ? (
                                          format(date, "dd/MM/yyyy")
                                        ) : (
                                          <span>Escolha</span>
                                        )}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <Calendar
                                        locale={ptBR}
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormControl>
                                <FormMessage className="pt-1">
                                  {formState.errors.fullname?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-2">
                          <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="space-y-0">
                                <FormLabel
                                  className={`font-medium ${
                                    formState.errors.name
                                      ? "border-red-500"
                                      : "text-gray-600"
                                  }`}
                                >
                                  Valor
                                </FormLabel>
                                <FormControl>
                                  <NumericFormat
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    prefix="R$ "
                                    customInput={Input}
                                    className={`w-full ${
                                      formState.errors.amount
                                        ? "border-red-500"
                                        : ""
                                    }`}
                                  />
                                </FormControl>
                                <FormMessage className="pt-1">
                                  {formState.errors.name?.message}
                                </FormMessage>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <FormField
                        control={control}
                        name="fonteDespesa" // Use o nome correto aqui
                        render={({ field }) => (
                          <FormItem className="mb-4 space-y-0">
                            <FormLabel
                              className={`font-medium ${
                                formState.errors.fonteDespesa
                                  ? "border-red-500"
                                  : "text-gray-600"
                              }`}
                            >
                              Conta
                            </FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={(value) => {
                                  field.onChange(value);
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma fonte de despesa" />
                                </SelectTrigger>
                                <SelectContent>
                                  {despesa.map((item) => (
                                    <SelectItem key={item.id} value={item.id.toString()}>
                                      {item.nome}
                                    </SelectItem>
                                  ))}
                                   <SelectItem value="parcelada">
                                    Parcelada
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="pt-1">
                              {formState.errors.fonteDespesa?.message}
                            </FormMessage>
                          </FormItem>
                        )}
                      />
                    </form>
                  </FormProvider>

                  <div>
                    <Label htmlFor="nome" className="mb-2">
                      Nome da Despesa
                    </Label>
                    <Input id="nome" placeholder="Ex: Aluguel" />
                  </div>
                  <div>
                    <Label htmlFor="valor" className="mb-2">
                      Valor
                    </Label>
                    <Input id="valor" type="number" placeholder="Ex: 1000.00" />
                  </div>
                  <div>
                    <Label htmlFor="data" className="mb-2">
                      Data
                    </Label>
                    <Input id="data" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="categoria" className="mb-2">
                      Categoria
                    </Label>
                    <Select>
                      <SelectTrigger id="categoria">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moradia">Moradia</SelectItem>
                        <SelectItem value="transporte">Transporte</SelectItem>
                        <SelectItem value="alimentacao">Alimentação</SelectItem>
                        <SelectItem value="lazer">Lazer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="descricao" className="mb-2">
                      Descrição (Opcional)
                    </Label>
                    <Textarea
                      id="descricao"
                      placeholder="Adicione detalhes sobre a despesa"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/despesas/cadastrar")}>
                    Cadastrar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Order Oe31b70H
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Copy className="h-3 w-3" />
                      <span className="sr-only">Copy Order ID</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Date: November 23, 2023</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold">Order Details</div>
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Glimmer Lamps x <span>2</span>
                      </span>
                      <span>$250.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Aqua Filters x <span>1</span>
                      </span>
                      <span>$49.00</span>
                    </li>
                  </ul>
                  <Separator className="my-2" />
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$299.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$5.00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$25.00</span>
                    </li>
                    <li className="flex items-center justify-between font-semibold">
                      <span className="text-muted-foreground">Total</span>
                      <span>$329.00</span>
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <div className="font-semibold">Shipping Information</div>
                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                      <span>Liam Johnson</span>
                      <span>1234 Main St.</span>
                      <span>Anytown, CA 12345</span>
                    </address>
                  </div>
                  <div className="grid auto-rows-max gap-3">
                    <div className="font-semibold">Billing Information</div>
                    <div className="text-muted-foreground">
                      Same as shipping address
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Customer Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Customer</dt>
                      <dd>Liam Johnson</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:">liam@acme.com</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">+1 234 567 890</a>
                      </dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Payment Information</div>
                  <dl className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1 text-muted-foreground">
                        <CreditCard className="h-4 w-4" />
                        Visa
                      </dt>
                      <dd>**** **** **** 4532</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Order</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
