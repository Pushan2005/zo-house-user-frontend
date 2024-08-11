"use client";

import { Button } from "@/components/ui/button";
import { signup } from "../login/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { z } from "zod";
import { useState } from "react";

const schema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
        confirmPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
            // console.log("Form data is valid");
            signup(formData);
        } catch (err) {
            if (err instanceof z.ZodError) {
                // console.log(`Errors: ${err.errors}`);
                // console.log(formData);
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
                <h1 className="text-2xl font-bold mb-8">Sign Up</h1>
                {/* <Script src="https://accounts.google.com/gsi/client" async></Script> */}
                <form className="flex flex-col justify-center items-center space-y-2">
                    <div className="w-56">
                        <Label htmlFor="name">Name:</Label>
                        <Input
                            id=""
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && (
                            <span className="text-red-600 text-sm">
                                {errors.name}
                            </span>
                        )}
                    </div>
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
                    <div className="w-56">
                        <Label htmlFor="confirm-password">
                            Confirm Password:
                        </Label>
                        <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-600 text-sm text-wrap">
                                {errors.confirmPassword}
                            </span>
                        )}
                    </div>

                    <div className="space-y-4 flex flex-col">
                        <Button className="w-56 mt-4" onClick={handleSubmit}>
                            Sign Up
                        </Button>
                    </div>
                    <Link className="font-normal pt-8" href="/login">
                        <span className="text-md underline underline-offset-2">
                            Already have an account? Log in here
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
