import type { Metadata } from "next";
import { initialGames } from "@/data/games";
import GameExplorer from "@/components/GameExplorer";

//ชื่อแท็บเบราว์เซอร์
export const metadata: Metadata = {
  title: "Game Backlog Manager",
};

export default function GamesPage() {
  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 16px", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
          Game Backlog
        </h1>
        <p style={{ color: "#6b7280", marginTop: "6px" }}>
          ระบบจัดการรายการเกมที่ต้องการเล่น
        </p>
      </header>
      
      <GameExplorer initialGames={initialGames} />
    </main>
  );
}