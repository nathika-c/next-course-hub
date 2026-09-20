export type GameStatus = "not-started" | "playing" | "completed";

export type Game = {
  id: string;
  title: string;
  platform: string;
  estimatedHours: number;
  status: GameStatus;
};

export type GameDraft = {
  title: string;
  platform: string;
  estimatedHours: string;
  status: GameStatus;
};

export type GameFormErrors = Partial<Record<keyof GameDraft, string>>;