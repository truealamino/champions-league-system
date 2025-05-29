const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export type Team = {
  id: string;
  name: string;
  country?: string;
  logoUrl?: string;
};

export async function getTeams(token: string): Promise<Team[]> {
  const res = await fetch(`${API_URL}/teams`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Erro ao buscar times');
  return res.json();
}

export async function createTeam(team: { name: string; country?: string; logo?: File }, token: string) {
  const formData = new FormData();
  formData.append('name', team.name);
  if (team.country) formData.append('country', team.country);
  if (team.logo) formData.append('logo', team.logo);

  const res = await fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erro ao criar time');
  }

  return res.json();
}

export async function updateTeam(id: string, team: { name: string; country?: string; logo?: File }, token: string) {
  const formData = new FormData();
  formData.append('name', team.name);
  if (team.country) formData.append('country', team.country);
  if (team.logo) formData.append('logo', team.logo);
  
  const res = await fetch(`${API_URL}/teams/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Erro ao atualizar time');
  }

  return res.json();
}

export async function deleteTeam(id: string, token: string) {
  const res = await fetch(`${API_URL}/teams/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Erro ao deletar time');
}
