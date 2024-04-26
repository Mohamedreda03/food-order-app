"use server";
import bcrypt from "bcryptjs";

import { SignUpFormTypes, SignUpSchema } from "@/types/schema";
import { db } from "@/lib/db";
import { signIn } from "@/auth";

const signup = async (data: SignUpFormTypes) => {
  const validatedFields = SignUpSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });

  return { success: "register successfully." };
};

export default signup;
