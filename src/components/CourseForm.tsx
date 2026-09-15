"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

export default function CourseForm() {
  // 1.2 เติม: Hook ที่ใช้ประกาศตัวแปรสถานะภายใน Component
  const [draft, setDraft] = useState<CourseDraft>(emptyDraft);

  // 1.4 ฟังก์ชันเดียวที่รองรับทุกฟิลด์
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  // 1.6 จัดการเหตุการณ์การส่งฟอร์ม
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(draft);
  }

  // 1.5 ผูกทุกอินพุตเข้ากับ State
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="code">รหัสวิชา</label>
        <input
          id="code"
          name="code"
          type="text"
          value={draft.code}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="name">ชื่อวิชา</label>
        {/* เติม: ชื่อฟิลด์ใน CourseDraft ที่ช่องนี้รับผิดชอบ คือ "name" */}
        <input
          id="name"
          name="name"
          type="text"
          value={draft.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="credit">หน่วยกิต</label>
        <input
          id="credit"
          name="credit"
          type="number"
          inputMode="numeric"
          min="1"
          max="6"
          value={draft.credit}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="instructor">ผู้สอน</label>
        <input
          id="instructor"
          name="instructor"
          type="text"
          value={draft.instructor}
          onChange={handleChange}
        />
      </div>

      <button type="submit">บันทึก</button>
    </form>
  );
}
