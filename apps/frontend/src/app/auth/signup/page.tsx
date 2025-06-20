"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "../../../../lib/usersApi";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER" // valor padrão
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signupUser(form);
      router.push("/auth/login");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro inesperado");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Cadastro</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          required
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600"
        >
          <option value="USER">Usuário</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
        >
          Cadastrar
        </button>

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  );
}
