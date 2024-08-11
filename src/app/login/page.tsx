"use client";

import { Button } from "@/components/ui/button";
import { login } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

interface FormErrors {
    email?: string;
    password?: string;
}

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        try {
            schema.parse(formData);
            console.log("Form data is valid");
            login(formData);
        } catch (err) {
            if (err instanceof z.ZodError) {
                console.log(`Errors: ${err.errors}`);
                console.log(formData);
                const fieldErrors = err.errors.reduce((acc: any, error) => {
                    acc[error.path[0]] = error.message;
                    return acc;
                }, {});
                setErrors(fieldErrors);
            }
        }
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center p-8">
                <h1 className="text-2xl font-bold mb-8">Log in to proceed</h1>
                {/* <Script src="https://accounts.google.com/gsi/client" async></Script> */}
                <form className="flex flex-col justify-center items-center space-y-2">
                    <div className="w-56">
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && (
                            <span className="text-red-600 text-sm">
                                {errors.email}
                            </span>
                        )}
                    </div>
                    <div className="w-56">
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && (
                            <span className="text-red-600 text-sm text-wrap">
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <div className="space-y-4 flex flex-col">
                        <Button className="w-56 mt-4" onClick={handleSubmit}>
                            Log in
                        </Button>
                    </div>
                    <Link className="font-normal pt-8" href="/signup">
                        <span className="text-md underline underline-offset-2">
                            Dont Have an account? Sign Up here
                        </span>
                    </Link>
                    {/* <div
                    id="g_id_onload"
                    data-client_id="981562259308-n2tsb6lf9q9ubvbsprlotslq6enn1vam.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-callback="handleSignInWithGoogle"
                    data-auto_prompt="false"
                    data-use_fedcm_for_prompt="true"
                    ></div>
                    
                    <div
                    className="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="outline"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left"
                    ></div> */}
                </form>
            </div>
        </>
    );
}

// async function handleSignInWithGoogle(response: any) {
//     const supabase = createClient();
//     const { data, error } = await supabase.auth.signInWithIdToken({
//         provider: "google",
//         token: response.credential,
//     });
// }
