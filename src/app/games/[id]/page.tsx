import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { initialGames } from "@/data/games";

type GameDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: GameDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const game = initialGames.find((g) => g.id === id);
  return {
    title: game ? game.title : "ไม่พบรายการเกม",  //เมื่อผู้ใช้กดชื่อเกมที่ไม่มีในรายการจะแสดงคำว่า "ไม่พบรายการเกม" ตรงชื่อแท็บเบราว์เซอร์
  };
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  const { id } = await params;
  const game = initialGames.find((g) => g.id === id);  

  if (!game) {
    notFound(); //เมื่อผู้ใช้กดชื่อเกมที่ไม่มีในรายการจะแสดงหน้า 404
  }

  return (
    <article style={{ padding: "20px" }}>
      <h1>{game.title}</h1>
      <p>แพลตฟอร์ม: {game.platform}</p>
      <p>เวลาที่ใช้: {game.estimatedHours} ชั่วโมง</p>
      <p>สถานะ: {game.status}</p>
    </article>
  );
}