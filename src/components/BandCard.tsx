"use client";

import Image from "next/image";
import Link from "next/link";
import type { Band } from "@/types/band";

type BandCardProps = {
  band: Band;
  showDetailLink?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  isFollowing?: boolean;
  onToggleFollow?: (id: number) => void;
};

export default function BandCard({
  band,
  showDetailLink = true,
  isFavorite = false,
  onToggleFavorite,
  isFollowing = false,
  onToggleFollow,
}: BandCardProps) {
  const followersCount = (band.followers ?? 0) + (isFollowing ? 1 : 0);
  const likesCount = (band.likes ?? 0) + (isFavorite ? 1 : 0);

  return (
    <article className="courseCard">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <h2 style={{ margin: 0 }}>{band.name}</h2>
        {showDetailLink && onToggleFollow && (
          <button
            type="button"
            onClick={() => onToggleFollow(band.id)}
            style={{
              padding: "4px 10px",
              fontSize: "12px",
              borderRadius: "4px",
              border: isFollowing ? "1px solid #10b981" : "1px solid #00b78d",
              backgroundColor: isFollowing ? "#e6f4ea" : "#ffffff",
              color: isFollowing ? "#0d652d" : "#00b78d",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isFollowing ? "ติดตามแล้ว" : "ติดตาม"}
          </button>
        )}
      </div>

      {band.imageUrl && (
        <div className="image-wrapper" style={{ position: "relative", width: "100%", height: "200px", borderRadius: "8px", overflow: "hidden", margin: "12px 0" }}>
          <Image
            src={band.imageUrl}
            alt={band.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <p style={{ margin: "8px 0", color: "#4b5563" }}>
        <strong>แนวเพลง:</strong> {band.genre}
      </p>

      {showDetailLink && onToggleFavorite && (
        <button
          type="button"
          onClick={() => onToggleFavorite(band.id)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            color: isFavorite ? "#ef4444" : "#7a7a7a",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginTop: "8px",
          }}
        >
          {isFavorite ? "❤️ รายการโปรด" : "🤍 เพิ่มเป็นรายการโปรด"}
        </button>
      )}

      {!showDetailLink && (
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "12px", fontSize: "14px", fontWeight: "500", alignItems: "center" }}>
          <span style={{ color: "#00b78d" }}>
            ผู้ติดตาม {followersCount} คน
          </span>
          <span style={{ color: "#ef4444" }}>
            ถูกใจ {likesCount} คน
          </span>
        </div>
      )}

      {showDetailLink && (
        <div style={{ marginTop: "12px" }}>
          <Link
            href={`/bands/${band.id}?isFavorite=${isFavorite}&isFollowing=${isFollowing}`}
            style={{ color: "#00b78d", fontSize: "14px", textDecoration: "none", fontWeight: "bold" }}
          >
            เพิ่มเติม →
          </Link>
        </div>
      )}
    </article>
  );
}