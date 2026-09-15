import { BANDS } from "@/data/bands";
import BandExplorer from "@/components/BandExplorer";

export default function HomePage() {
  return (
    <main className="page">
      <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
        Favorite Bands
      </h1>

      <BandExplorer bands={BANDS} />
    </main>
  );
}