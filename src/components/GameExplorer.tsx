//เป็นคอมโพเนนต์ที่ใช้สำรวจเกม-->สามารถเพิ่ม แก้ไข และลบเกมได้

"use client";

import { useState } from "react";
import type { Game, GameDraft } from "@/types/games";
import GameForm from "@/components/GameForm";
import GameCard from "@/components/GameCard";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [editingId, setEditingId] = useState<string | null>(null);

  // ฟังก์ชันบันทึกข้อมูล (ทั้งกรณีเพิ่มใหม่ และแก้ไขของเดิม)
  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      const newGame: Game = {
        id: crypto.randomUUID(),
        title: draft.title.trim(),
        platform: draft.platform.trim(),
        estimatedHours: Number(draft.estimatedHours),
        status: draft.status,
      };
      setGames((prev) => [...prev, newGame]);
    } else {
      setGames((prev) =>
        prev.map((g) =>
          g.id === editingId
            ? {
                ...g,
                title: draft.title.trim(),
                platform: draft.platform.trim(),
                estimatedHours: Number(draft.estimatedHours),
                status: draft.status,
              }
            : g
        )
      );
      setEditingId(null);
    }
  }

  // ฟังก์ชันลบเกม
  function handleDelete(id: string) {
    setGames((prev) => prev.filter((g) => g.id !== id));
  }

  const editingGame = games.find((g) => g.id === editingId);

  return (
    <div>
      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px"
        }}
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onEdit={() => setEditingId(game.id)}
            onDelete={() => handleDelete(game.id)}
          />
        ))}
      </div>
    </div>
  );
}