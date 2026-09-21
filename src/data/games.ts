import type { Game } from "@/types/games";

export const initialGames: Game[] = [
  {
    id: "game-1",
    title: "Minecraft",
    platform: "PC",
    estimatedHours: 100,
    status: "completed",
  },
  {
    id: "game-2",
    title: "Valorant",
    platform: "PC",
    estimatedHours: 200,
    status: "playing",
  },
  {
    id: "game-3",
    title: "Cookie Run: Kingdom",
    platform: "Mobile",
    estimatedHours: 49,
    status: "not-started",
  },
  {
    id: "game-4",
    title: "RoV (Realm of Valor)",
    platform: "Mobile",
    estimatedHours: 150,
    status: "not-started",
  },
  {
    id: "game-5",
    title: "Genshin Impact",
    platform: "PC",
    estimatedHours: 120,
    status: "not-started",
  },
];