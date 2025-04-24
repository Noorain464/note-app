"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      alert(`Error registering: ${error.message}`);
    } else {
      alert("Registration successful! Please check your email to confirm.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">Create Your Account</h1>
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
      <Button onClick={handleRegister} disabled={loading} className="w-full">
        {loading ? "Registering..." : "Register"}
      </Button>
    </div>
  );
}
