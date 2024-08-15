"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface LoginForm {
    email: string;
    password: string;
}

interface SignUpForm extends LoginForm {
    name: string;
    confirmPassword: string;
}

export async function login(formData: LoginForm) {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    });

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}

export async function signup(formData: SignUpForm) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            data: {
                name: formData.name,
                debt: 0,
            },
        },
    });

    if (error) {
        console.error(`Error signing up: ${error.message}`);
        redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
}
