"use client";

import Link from "next/link";
import type { Game, GameStatus } from "@/types/games";

type GameCardProps = {
  game: Game;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (newStatus: GameStatus) => void; // 1. เพิ่ม Props สำหรับรับฟังก์ชันเปลี่ยนสถานะด่วน
};

// สีแสดงสถานะเกม และข้อความแสดงสถานะเกม
const statusBadgeStyle: Record<GameStatus, { label: string; bg: string; color: string }> = {
  "not-started": { label: "ยังไม่เริ่ม", bg: "#fef3c7", color: "#92400e" },
  playing: { label: "กำลังเล่น", bg: "#dbeafe", color: "#1e40af" },
  completed: { label: "เล่นจบแล้ว", bg: "#dcfce7", color: "#166534" },
};

// ใช้สำหรับแสดงข้อมูลเกมในรูปแบบการ์ด โดยมีปุ่มแก้ไข ลบเกม และเปลี่ยนสถานะด่วน
export default function GameCard({ game, onEdit, onDelete, onStatusChange }: GameCardProps) {
  const badge = statusBadgeStyle[game.status];

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        {/* ลิงก์ไปยังหน้ารายละเอียดเกม */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "bold", margin: 0 }}>
            {/* เมื่อผู้ใช้กดชื่อเกมจะแสดงรายละเอียดของเกมนั้น */}
            <Link href={`/games/${game.id}`} style={{ color: "#111827", textDecoration: "none" }}> 
              {game.title}
            </Link>
          </h3>

          <span
            style={{
              backgroundColor: badge.bg,
              color: badge.color,
              padding: "4px 10px",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: "bold"
            }}
          >
            {badge.label}
          </span>
        </div>

        <p style={{ margin: "4px 0", color: "#4b5563", fontSize: "0.9rem" }}>
          <strong>แพลตฟอร์ม:</strong> {game.platform}
        </p>
        <p style={{ margin: "4px 0 12px 0", color: "#4b5563", fontSize: "0.9rem" }}>
          <strong>เวลาที่คาดว่าจะใช้:</strong> {game.estimatedHours} ชั่วโมง
        </p>

        {/* 2. ส่วนที่เพิ่มเข้ามา: ปุ่มสลับสถานะเกมด่วนโดยไม่ต้องเปิดฟอร์มแก้ไข */}
        <div style={{ marginBottom: "16px", paddingTop: "8px", borderTop: "1px dashed #e5e7eb" }}>
          <span style={{ fontSize: "0.8rem", color: "#6b7280", display: "block", marginBottom: "6px" }}>
            สลับสถานะด่วน:
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              type="button"
              onClick={() => onStatusChange("not-started")}
              disabled={game.status === "not-started"}
              style={{
                fontSize: "0.75rem",
                padding: "3px 8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                backgroundColor: game.status === "not-started" ? "#fef3c7" : "#fff",
                color: game.status === "not-started" ? "#92400e" : "#374151",
                cursor: game.status === "not-started" ? "default" : "pointer",
                fontWeight: game.status === "not-started" ? "bold" : "normal"
              }}
            >
              ยังไม่เริ่ม
            </button>
            <button
              type="button"
              onClick={() => onStatusChange("playing")}
              disabled={game.status === "playing"}
              style={{
                fontSize: "0.75rem",
                padding: "3px 8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                backgroundColor: game.status === "playing" ? "#dbeafe" : "#fff",
                color: game.status === "playing" ? "#1e40af" : "#374151",
                cursor: game.status === "playing" ? "default" : "pointer",
                fontWeight: game.status === "playing" ? "bold" : "normal"
              }}
            >
              กำลังเล่น
            </button>
            <button
              type="button"
              onClick={() => onStatusChange("completed")}
              disabled={game.status === "completed"}
              style={{
                fontSize: "0.75rem",
                padding: "3px 8px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                backgroundColor: game.status === "completed" ? "#dcfce7" : "#fff",
                color: game.status === "completed" ? "#166534" : "#374151",
                cursor: game.status === "completed" ? "default" : "pointer",
                fontWeight: game.status === "completed" ? "bold" : "normal"
              }}
            >
              จบแล้ว
            </button>
          </div>
        </div>
      </div>

      {/* ปุ่มแก้ไขและลบเกม */}
      <div style={{ display: "flex", gap: "8px", paddingTop: "12px", borderTop: "1px solid #f3f4f6" }}>
        <button
          type="button"
          onClick={onEdit}
          style={{
            backgroundColor: "#f59e0b",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            fontSize: "0.85rem",
            fontWeight: "600",
            cursor: "pointer",
            flex: 1
          }}
        >
          แก้ไข
        </button>
        <button
          type="button"
          onClick={onDelete}
          style={{
            backgroundColor: "#dc2626",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            fontSize: "0.85rem",
            fontWeight: "600",
            cursor: "pointer",
            flex: 1
          }}
        >
          ลบ
        </button>
      </div>
    </div>
  );
}