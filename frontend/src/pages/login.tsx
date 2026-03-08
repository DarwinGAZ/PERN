import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import axios from "axios";
import { loginSchema } from "@/schemas/LoginSchema";

type LoginSchema = z.infer<typeof loginSchema>;

function Login() {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        if (authCtx?.isAuthenticated) {
            navigate("/me");
        }
    }, [authCtx?.isAuthenticated, navigate]);

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginSchema) {
        try {
            setServerError("");
            await authCtx?.login(data.email, data.password);
            navigate("/me");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setServerError(
                    error.response?.data?.error || "Erro ao fazer login",
                );
            } else {
                setServerError("Erro inesperado");
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <div className="w-full max-w-md bg-background p-8 rounded-2xl shadow-xl border">
                <h1 className="text-2xl font-bold text-center mb-6">Entrar</h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
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
                                ? "Entrando..."
                                : "Entrar"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center text-sm mt-4">
                    Não tem uma conta?{" "}
                    <span
                        className="text-primary cursor-pointer hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Registrar-se
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
