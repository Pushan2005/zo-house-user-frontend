"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

export default function LogoutButton() {
    const supabase = createClient();
    const router = useRouter();

    return (
        <Button
            onClick={async () => {
                await supabase.auth.signOut();
                router.push("/login");
            }}
        >
            Logout
        </Button>
    );
}
