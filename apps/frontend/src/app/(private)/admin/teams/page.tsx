'use client';

import { useEffect, useState } from 'react';
import { createTeam, deleteTeam, getTeams, updateTeam } from '../../../../../lib/teamsApi';

type Team = {
  id: string;
  name: string;
  country?: string;
  logoUrl?: string;
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<{ name: string; country: string; logo?: File }>({ name: '', country: '' });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchTeams();
  }, []);
  
  const fetchTeams = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token') || '';
      const data = await getTeams(token);
      setTeams(data);
    } catch (err: any) {
      setError(err.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || '';

    try {
      setCreating(true);
      setError('');

      if (editingTeam) {
        await updateTeam(editingTeam.id, form, token);
      } else {
        await createTeam(form, token);
      }

      await fetchTeams();
      setForm({ name: '', country: '' });
      setEditingTeam(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setForm({ name: team.name, country: team.country || '' });
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este time?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token') || '';
      await deleteTeam(id, token);
      setTeams((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Times</h1>
      <p className="mb-4">Gerencie os times participantes do campeonato.</p>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 mb-6">
        <h2 className="text-lg font-semibold">
          {editingTeam ? 'Editar time' : 'Adicionar novo time'}
        </h2>
        <div>
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">País</label>
          <input
            type="text"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Logo (apenas PNG)</label>
          <input
            type="file"
            accept="image/png"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type !== 'image/png') {
                alert('Apenas arquivos PNG são permitidos.');
                return;
              }
              setForm((prev) => ({ ...prev, logo: file }));
            }}
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          {creating ? 'Salvando...' : editingTeam ? 'Atualizar' : 'Criar time'}
        </button>
        {editingTeam && (
          <button
            type="button"
            onClick={() => {
              setEditingTeam(null);
              setForm({ name: '', country: '' });
            }}
            className="ml-4 text-sm underline text-red-500"
          >
            Cancelar edição
          </button>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <hr className="mb-6" />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="space-y-2">
          {teams.map((team) => (
            <li key={team.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div className="flex items-center space-x-4">
                {team.logoUrl && (
                  <img
                    src={`${API_URL}${team.logoUrl}`}
                    alt="Logo"
                    className="w-12 h-12 object-contain border rounded"
                  />
                )}
                <div>
                  <div className="font-semibold">{team.name}</div>
                  <div className="text-sm text-gray-600">{team.country || 'País não informado'}</div>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(team)}
                  className="px-3 py-1 bg-yellow-400 text-sm rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(team.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
