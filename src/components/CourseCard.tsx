// "use client";

import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <div>
        <h2>{course.name}</h2>
        <p><strong>รหัสวิชา:</strong> {course.code}</p>
        <p><strong>จำนวน:</strong> {course.credit} หน่วยกิต</p>
      {/* <p><strong>ผู้สอน:</strong> {course.instructor}</p> */}
      </div>

      <button
        type="button"
        className="favoriteBtn"
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(course.id)}
      >
        {isFavorite ? "❤️ อยู่ในรายการโปรด" : "🤍 เพิ่มเป็นรายการโปรด"}
      </button>
    </article>
  );
}
