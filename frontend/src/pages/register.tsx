"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/RegisterSchema";
import type { RegisterSchema } from "@/schemas/RegisterSchema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState("");
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (authCtx?.isAuthenticated) {
            navigate("/me");
        }
    }, [authCtx?.isAuthenticated, navigate]);

    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: RegisterSchema) {
        try {
            setServerError("");
            await authCtx?.register(data);
            navigate("/me");
        } catch (error: any) {
            setServerError(
                error?.response?.data?.error || "Erro ao criar conta",
            );
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <div className="w-full max-w-md bg-background p-8 rounded-2xl shadow-xl border">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Criar Conta
                </h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Seu nome"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="seu@email.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="******"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {serverError && (
                            <p className="text-sm text-red-500 text-center">
                                {serverError}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? "Criando conta..."
                                : "Criar Conta"}
                        </Button>
                        <div className="text-center">
                            <p className="text-center text-sm mt-4" />
                            Não tem uma conta?{" "}
                            <span
                                className="text-primary cursor-pointer hover:underline"
                                onClick={() => navigate("/login")}
                            >
                                Entrar
                            </span>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Register;
