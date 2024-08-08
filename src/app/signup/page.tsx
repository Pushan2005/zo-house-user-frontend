import { Button } from "@/components/ui/button";
import { signup } from "../login/actions";
import { Input } from "@/components/ui/input";
import Script from "next/script";
import { createClient } from "@/utils/supabase/server";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <>
            <div className="flex flex-col justify-center items-center p-8">
                <h1 className="text-2xl font-bold mb-8">Sign Up</h1>
                {/* <Script src="https://accounts.google.com/gsi/client" async></Script> */}
                <form className="flex flex-col justify-center items-center space-y-2">
                    <div className="">
                        <Label htmlFor="email">Email:</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="">
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>

                    <div className="space-y-4 flex flex-col">
                        <Button className="w-56 mt-4" formAction={signup}>
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
