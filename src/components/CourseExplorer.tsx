"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "./CourseCard";

type CourseExplorerProps = {
  courses: Course[];
};

export default function CourseExplorer({ courses }: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: string) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  const searchText = keyword.trim().toLowerCase();
  const visibleCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText);
    const matchesFavorite = !showOnlyFavorites || favoriteIds.includes(course.id);

    return matchesSearch && matchesFavorite;
  });

  return (
    <div>
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="search"
          aria-label="ค้นหารายวิชา"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา..."
          className="searchInput"
        />
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={showOnlyFavorites}
            onChange={(e) => setShowOnlyFavorites(e.target.checked)}
          />
          แสดงเฉพาะรายการโปรด ({favoriteIds.length})
        </label>
      </div>

      {visibleCourses.length === 0 ? (
        <p style={{ color: "#64748b", padding: "1rem 0" }}>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
      ) : (
        <section className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </section>
      )}
    </div>
  );
}

