import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 characters." }),
});

export type SignInFormTypes = z.infer<typeof SignInSchema>;

// sign-up

export const SignUpSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "password must be at least 6 characters." })
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, {
        message: "password not good.",
      }),
    confirmPassword: z.string(),
  })
  .refine((input) => input.password === input.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type SignUpFormTypes = z.infer<typeof SignUpSchema>;

// profile

export const ProfileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  image: z.string().url().nullable(),
  tel: z.string().min(7),
  street_address: z.string().min(2),
  post_code: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
});

export type ProfileFormTypes = z.infer<typeof ProfileSchema>;

// Categories

export const CategorySchema = z.object({
  name: z.string(),
  image: z.string().nullable(),
});

export type CategoryFormTypes = z.infer<typeof CategorySchema>;

// Categories

export const ProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  price: z.coerce.number().min(1),
  categoryId: z.string(), // category id
  sizes: z.array(z.string()), // array of sizes id
  image: z.string().url().nullable(),
  best_seller: z.boolean().default(false),
});

export type ProductFormTypes = z.infer<typeof ProductSchema>;

// Categories

export const SizeSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number(),
});

export type SizeFormTypes = z.infer<typeof SizeSchema>;
