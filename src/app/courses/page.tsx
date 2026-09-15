import type { Metadata } from "next";
import CourseExplorer from "@/components/CourseExplorer";
import { courses } from "@/data/coursesdata";

export const metadata: Metadata = {
  title: "รายวิชาทั้งหมด",
};

export default function CoursesPage() {
  return (
    <main className="page">
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        รายวิชาทั้งหมด
      </h1>
      <CourseExplorer courses={courses} />
    </main>
  );
}
