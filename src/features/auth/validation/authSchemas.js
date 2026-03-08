import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Ad ən az 3 simvol olmalıdır")
      .max(20, "Ad ən çox 20 simvol ola bilər"),
    surname: z
      .string()
      .min(3, "Soyad ən az 3 simvol olmalıdır")
      .max(20, "Soyad ən çox 20 simvol ola bilər"),
    email: z.string().email("Email formatı yanlışdır"),
    password: z
      .string()
      .min(6, "Şifrə ən az 6 simvol olmalıdır")
      .max(20, "Şifrə ən çox 20 simvol ola bilər")
      .regex(
        /^(?=.*[A-Z])(?=.*\d).*$/,
        "Şifrədə ən az bir böyük hərf və bir rəqəm olmalıdır"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifrələr eyni deyil",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Email formatı yanlışdır"),
  password: z.string().min(1, "Şifrə mütləqdir"),
});

