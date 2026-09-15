//หน้าเว็บแสดงรายละเอียดของแต่ละวง(ที่ผู้ใช้กด)
import Link from "next/link";
import { BANDS } from "@/data/bands";
import { notFound } from "next/navigation";
import BandDetailCard from "@/components/BandDetailCard";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ isFavorite?: string; isFollowing?: string }>;
};

export default async function BandDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { isFavorite, isFollowing } = await searchParams;
  const band = BANDS.find((b) => b.id === Number(id));

  if (!band) {
    notFound();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "700px" }}>
        <Link
          href="/bands"
          style={{
            display: "inline-block",
            marginBottom: "16px",
            color: "#0066cc",
            textDecoration: "none",
          }}
        >
          ← Back
        </Link>

        <BandDetailCard
          band={band}
          initialIsFavorite={isFavorite === "true"}
          initialIsFollowing={isFollowing === "true"}
        />
      </div>
    </main>
  );
}