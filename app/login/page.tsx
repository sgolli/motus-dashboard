"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError(true);
    }
  };

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: "100vh", background: "#0d1117", color: "#e6edf3",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      <form onSubmit={submit} style={{
        display: "flex", flexDirection: "column", gap: 12,
        padding: 32, borderRadius: 12,
        background: "#161b22", border: "1px solid #30363d",
        minWidth: 280,
      }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>⚡ Motus Dashboard</h2>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          autoFocus
          style={{
            padding: "8px 12px", borderRadius: 6,
            border: error ? "1px solid #f85149" : "1px solid #30363d",
            background: "#0d1117", color: "#e6edf3", fontSize: 14,
          }}
        />
        <button type="submit" style={{
          padding: "8px 12px", borderRadius: 6, border: "none",
          background: "#238636", color: "#fff", fontSize: 14, cursor: "pointer",
        }}>Enter</button>
        {error && <span style={{ color: "#f85149", fontSize: 13 }}>Wrong password</span>}
      </form>
    </div>
  );
}
