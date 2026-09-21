// 

"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Game, GameDraft, GameFormErrors } from "@/types/games";


// ส่วนที่1: ค่าตั้งต้นใช้สำหรับล้างฟอร์มหรือเริ่มต้นฟอร์มใหม่
const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  estimatedHours: "",
  status: "not-started",
};

function toDraft(game?: Game): GameDraft {
  if (!game) return emptyDraft;
  return {
    title: game.title,
    platform: game.platform,
    estimatedHours: String(game.estimatedHours),
    status: game.status,
  };
}

function validate(draft: GameDraft): GameFormErrors {
  const errors: GameFormErrors = {};
  if (draft.title.trim() === "") errors.title = "กรุณาระบุชื่อเกม";
  if (draft.platform.trim() === "") errors.platform = "กรุณาเลือกแพลตฟอร์ม";
  
  const hours = Number(draft.estimatedHours);
  if (!draft.estimatedHours || !Number.isInteger(hours) || hours <= 0) {
    errors.estimatedHours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
  }
  return errors;
}


// ส่วนที่2: ค่าตั้งต้นสำหรับเพิ่มหรือแก้ไขเกม
type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<GameFormErrors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }


  // ส่วนที่3: การแสดงผลฟอร์ม
  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate 
      style={{
        backgroundColor: "#ffffff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        marginBottom: "32px",
        border: "1px solid #e5e7eb"
      }}
    >
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "20px", color: "#1f2937" }}>
        {initialGame ? "✏️ แก้ไขข้อมูลเกม" : "➕ เพิ่มเกมใหม่ลง Backlog"}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
        <div>
          <label htmlFor="title" style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "6px", color: "#374151" }}>
            ชื่อเกม <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={draft.title}
            onChange={handleChange}
            placeholder="เช่น Robox"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: errors.title ? "1px solid #ef4444" : "1px solid #d1d5db",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          {errors.title && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.title}</p>}
        </div>

      {/* // แพลตฟอร์ม */}
        <div>
          <label htmlFor="platform" style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "6px", color: "#374151" }}>
            แพลตฟอร์ม <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            id="platform"
            name="platform"
            value={draft.platform}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: errors.platform ? "1px solid #ef4444" : "1px solid #d1d5db",
              outline: "none",
              backgroundColor: "#fff",
              boxSizing: "border-box"
            }}
          >
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="Tablet">Tablet</option>
            <option value="Mobile">Mobile</option>
          </select>
          {errors.platform && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.platform}</p>}
        </div>
      
      {/* // เวลาที่ใช้ (ชั่วโมง) */}
        <div>
          <label htmlFor="estimatedHours" style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "6px", color: "#374151" }}>
            เวลาที่ใช้ (ชั่วโมง) <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            id="estimatedHours"
            name="estimatedHours"
            type="number"
            value={draft.estimatedHours}
            onChange={handleChange}
            placeholder="เช่น 67"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: errors.estimatedHours ? "1px solid #ef4444" : "1px solid #d1d5db",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          {errors.estimatedHours && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.estimatedHours}</p>}
        </div>

      {/* // สถานะ */}
        <div>
          <label htmlFor="status" style={{ display: "block", fontSize: "0.875rem", fontWeight: "600", marginBottom: "6px", color: "#374151" }}>
            สถานะ
          </label>
          <select
            id="status"
            name="status"
            value={draft.status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              outline: "none",
              backgroundColor: "#fff",
              boxSizing: "border-box"
            }}
          >
            <option value="not-started">ยังไม่เริ่ม</option>
            <option value="playing">กำลังเล่น</option>
            <option value="completed">เล่นจบแล้ว</option>
          </select>
        </div>
      </div>

    {/* // ปุ่มบันทึกและยกเลิก */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          {initialGame ? "บันทึกการแก้ไข" : "บันทึกข้อมูล"}
        </button>
        {initialGame && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              backgroundColor: "#9ca3af",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}