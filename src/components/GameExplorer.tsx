"use client";

import { useState } from "react";
import type { Game, GameDraft, GameStatus } from "@/types/games";
import GameForm from "@/components/GameForm";
import GameCard from "@/components/GameCard";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  // State หลักสำหรับเก็บรายการเกม และรหัสเกมที่กำลังแก้ไข
  const [games, setGames] = useState<Game[]>(initialGames);
  const [editingId, setEditingId] = useState<string | null>(null);

  // State สำหรับค้นหา กรองสถานะ และเก็บบันทึกรหัสเกมที่รอการยืนยันลบ
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Derived State คำนวณจำนวนชั่วโมงรวมของเกมที่ยังไม่เริ่ม
  const totalNotStartedHours = games
    .filter((g) => g.status === "not-started")
    .reduce((sum, g) => sum + g.estimatedHours, 0);

  // Derived State กรองรายการเกมตามคำค้นหา และสถานะพร้อมกัน
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesStatus = statusFilter === "all" || game.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  // ฟังก์ชันสลับสถานะเกมด่วนจากรายการ
  function handleStatusChange(id: string, newStatus: GameStatus) {
    setGames((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
    );
  }

  // ฟังก์ชันยืนยันลบเกมจริงเมื่อกดปุ่มยืนยันใน Modal
  function confirmDelete() {
    if (deletingId) {
      setGames((prev) => prev.filter((g) => g.id !== deletingId));
      setDeletingId(null);
    }
  }

  const editingGame = games.find((g) => g.id === editingId);
  const gameToDelete = games.find((g) => g.id === deletingId);

  return (
    <div>
      {/* 1. ฟอร์มสำหรับเพิ่มและแก้ไขเกม อยู่บนสุด */}
      <GameForm
        key={editingId ?? "new"}
        initialGame={editingGame}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {/* 2. ช่องค้นหาชื่อเกม และแถบกรองตามสถานะ */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", backgroundColor: "#f9fafb", padding: "16px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
        <input
          type="text"
          placeholder="🔍 ค้นหาชื่อเกม..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db" }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px", border: "1px solid #d1d5db", backgroundColor: "#fff" }}
        >
          <option value="all">สถานะทั้งหมด</option>
          <option value="not-started">ยังไม่เริ่ม</option>
          <option value="playing">กำลังเล่น</option>
          <option value="completed">เล่นจบแล้ว</option>
        </select>
      </div>

      {/* 3. กล่องสรุปจำนวนชั่วโมงรวม ย้ายมาอยู่ใต้แถบค้นหาแล้ว */}
      <div style={{ backgroundColor: "#e0f2f1", border: "1px solid #4db6ac", padding: "14px 16px", borderRadius: "8px", marginBottom: "24px" }}>
        <p style={{ margin: 0, color: "#1e40af", fontWeight: "bold" }}>
          📊 เวลาที่คาดว่าจะต้องใช้สำหรับเกมที่ยังไม่เริ่มทั้งหมด: <span style={{ fontSize: "1.2rem", color: "#2563eb" }}>{totalNotStartedHours}</span> ชั่วโมง
        </p>
      </div>

      {/* 4. แสดงรายการการ์ดเกมที่ผ่านการกรอง */}
      {filteredGames.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b7280", padding: "40px" }}>ไม่พบรายการเกมที่ตรงกับการค้นหา</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px"
          }}
        >
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={() => setEditingId(game.id)}
              onDelete={() => setDeletingId(game.id)}
              onStatusChange={(newStatus) => handleStatusChange(game.id, newStatus)}
            />
          ))}
        </div>
      )}

      {/* Modal / Pop-up ยืนยันก่อนลบ */}
      {deletingId && gameToDelete && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", maxWidth: "400px", width: "100%", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <h3 style={{ margin: "0 0 12px 0", color: "#111827" }}>⚠️ ยืนยันการลบเกม</h3>
            <p style={{ margin: "0 0 20px 0", color: "#4b5563" }}>
              คุณต้องการลบเกม <strong>"{gameToDelete.title}"</strong> ออกจาก Backlog ใช่หรือไม่?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #d1d5db", backgroundColor: "#fff", cursor: "pointer" }}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#dc2626", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
              >
                ยืนยันการลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}