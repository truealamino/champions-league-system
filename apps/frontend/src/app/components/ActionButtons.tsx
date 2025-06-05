import React from "react";

type ActionButtonsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function ActionButtons({
  onEdit,
  onDelete
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="p-2 rounded border-2 border-yellow-400 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition w-10 h-10 flex items-center justify-center"
        title="Editar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6"
          />
        </svg>
      </button>
      <button
        onClick={onDelete}
        className="p-2 rounded border-2 border-red-400 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 transition w-10 h-10 flex items-center justify-center"
        title="Excluir"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
