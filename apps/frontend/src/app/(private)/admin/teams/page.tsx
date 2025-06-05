"use client";

import { useEffect, useState } from "react";
import {
  createTeam,
  deleteTeam,
  getTeams,
  updateTeam
} from "../../../../../lib/teamsApi";
import Modal from "../../../components/Modal";
import DataTable from "../../../components/DataTable";
import ActionButtons from "../../../components/ActionButtons";

type Team = {
  id: string;
  name: string;
  country?: string;
  logoUrl?: string;
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [creating, setCreating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    country: string;
    logo?: File;
  }>({ name: "", country: "" });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const data = await getTeams(token);
      setTeams(data);
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token") || "";

    try {
      setCreating(true);
      setError("");

      if (editingTeam) {
        await updateTeam(editingTeam.id, form, token);
      } else {
        await createTeam(form, token);
      }

      await fetchTeams();
      setForm({ name: "", country: "" });
      setEditingTeam(null);
      setModalOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const openCreateModal = () => {
    setEditingTeam(null);
    setForm({ name: "", country: "" });
    setModalOpen(true);
  };

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
    setForm({ name: team.name, country: team.country || "" });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Tem certeza que deseja excluir este time?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token") || "";
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

      <button
        onClick={openCreateModal}
        className="mb-6 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Novo Time
      </button>

      {/* Modal de criação/edição */}
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTeam(null);
          setForm({ name: "", country: "" });
          setError("");
        }}
        title={editingTeam ? "Editar time" : "Adicionar novo time"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
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
                if (file && file.type !== "image/png") {
                  alert("Apenas arquivos PNG são permitidos.");
                  return;
                }
                setForm((prev) => ({ ...prev, logo: file }));
              }}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={creating}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
            >
              {creating
                ? "Salvando..."
                : editingTeam
                ? "Atualizar"
                : "Criar time"}
            </button>
            <button
              type="button"
              onClick={() => {
                setModalOpen(false);
                setEditingTeam(null);
                setForm({ name: "", country: "" });
                setError("");
              }}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </Modal>

      <hr className="mb-6" />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <DataTable
          columns={[
            {
              label: "Logo",
              accessor: "logoUrl",
              render: (team) => (
                <img
                  src={
                    team.logoUrl
                      ? `${API_URL}${team.logoUrl}`
                      : "/images/default-team.png"
                  }
                  alt="Logo"
                  className="w-12 h-12 object-contain border rounded bg-gray-50"
                />
              )
            },
            { label: "Nome", accessor: "name" },
            {
              label: "País",
              accessor: "country",
              render: (team) => team.country || "País não informado"
            },
            {
              label: "Ações",
              accessor: "id",
              render: (team) => (
                <ActionButtons
                  onEdit={() => handleEdit(team)}
                  onDelete={() => handleDelete(team.id)}
                />
              )
            }
          ]}
          data={teams}
        />
      )}
    </div>
  );
}
