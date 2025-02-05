import supabase from "@/utils/supabase/supabaseClient";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(1, "Name is required"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Błąd rejestracji:", error.message);
      return;
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="email" />
        {errors.email && <span>{errors.email.message}</span>}

        <input {...register("password")} placeholder="password" />
        {errors.password && <span>{errors.password.message}</span>}

        <Button type="submit">Register</Button>
      </form>
    </>
  );
};

export default Register;
