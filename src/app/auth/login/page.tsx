"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      alert(`Error logging in: ${error.message}`);
    } else {
      alert("Login successful!");
      router.push("/notes/list");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Welcome Back!</h1>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleLogin} disabled={loading} className="w-full">
        {loading ? "Logging in..." : "Login"}
      </Button>
    </div>
  );
}