import { z } from "zod";

const textoValidation = (fieldName: string) => 
  z.string()
    .nonempty(`${fieldName} é obrigatório`)
    .regex(/^[\p{L}\s]+$/u, "Somente letras e espaços são permitidos");

// Helper para validar senhas
const passwordValidation = z.string()
  .nonempty("A senha é obrigatória")
  .min(6, "A senha deve ter pelo menos 6 caracteres");

// Helper para validar e-mails
const emailValidation = z.string()
  .email("O e-mail é obrigatório");

const campoValidation = (fieldName: string) => z.string()
  .nonempty(`${fieldName} é obrigatório`);


export { textoValidation, passwordValidation, emailValidation, campoValidation };
