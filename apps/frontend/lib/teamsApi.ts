import { authFetch } from "./authFetch";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type Team = {
  id: string;
  name: string;
  country?: string;
  logoUrl?: string;
};

export async function getTeams(): Promise<Team[]> {
  const res = await authFetch(`${API_URL}/teams`);
  if (!res) return [];

  if (!res.ok) throw new Error("Erro ao buscar times");
  return res.json();
}

export async function createTeam(team: {
  name: string;
  country?: string;
  logo?: File;
}) {
  const formData = new FormData();
  formData.append("name", team.name);
  if (team.country) formData.append("country", team.country);
  if (team.logo) formData.append("logo", team.logo);

  const res = await fetch(`${API_URL}/teams`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao criar time");
  }

  return res.json();
}

export async function updateTeam(
  id: string,
  team: { name: string; country?: string; logo?: File }
) {
  const formData = new FormData();
  formData.append("name", team.name);
  if (team.country) formData.append("country", team.country);
  if (team.logo) formData.append("logo", team.logo);

  const res = await fetch(`${API_URL}/teams/${id}`, {
    method: "PATCH",
    body: formData
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Erro ao atualizar time");
  }

  return res.json();
}

export async function deleteTeam(id: string) {
  const res = await fetch(`${API_URL}/teams/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Erro ao deletar time");
}
