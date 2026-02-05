import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from 'antd';
import { paths } from '@/routes';
import { useAuth } from '@/contexts/AuthContext';
import logoImg from '@/assets/icons/logo.svg';

export interface LoginFormValues {
    login: string;
    password: string;
}

function getMockAccessToken(login: string): string {
    const payload = { sub: login, iat: Date.now() };
    return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
}

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const form = useForm<LoginFormValues>({
        defaultValues: {
            login: '',
            password: '',
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        const trimmedLogin = values.login.trim();

        if (trimmedLogin === 'admin' && values.password === 'admin123') {
            const accessKey = getMockAccessToken(trimmedLogin);
            login(accessKey);
            navigate(paths.DASHBOARD, { replace: true });
            toast.success("Tizimga muvaffaqiyatli kirdingiz");
            return;
        }

        toast.error("Login yoki parol noto'g'ri");
    };

    return (
        <div className="w-full max-w-[400px] mx-auto">
            <div className="flex justify-center mb-8">
                <img src={logoImg} alt="Yagona baza" className="h-14 w-auto" />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                    <FormField
                        control={form.control}
                        name="login"
                        rules={{
                            required: 'Login kiriting',
                            minLength: { value: 2, message: 'Login kamida 2 ta belgidan iborat bo‘lishi kerak' },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-black">
                                    Login
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        size="large"
                                        placeholder="Login"
                                        className="custom-input w-full text-base"
                                        style={{
                                            height: '48px',
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                        }}
                                        autoComplete="username"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        rules={{
                            required: 'Parol kiriting',
                            minLength: { value: 6, message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' },
                        }}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-black">
                                    Parol
                                </FormLabel>
                                <FormControl>
                                    <Input.Password
                                        {...field}
                                        size="large"
                                        placeholder="Parol"
                                        className="custom-input w-full text-base"
                                        style={{
                                            height: '48px',
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                        }}
                                        autoComplete="current-password"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 text-base font-semibold bg-blue text-white hover:bg-blue/90"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? 'Kutilmoqda...' : 'Tizimga kirish'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;
