"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Band } from "@/types/band";

type BandDetailCardProps = {
  band: Band;
  initialIsFavorite?: boolean;
  initialIsFollowing?: boolean;
};

export default function BandDetailCard({
  band,
  initialIsFavorite = false,
  initialIsFollowing = false,
}: BandDetailCardProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);

  useEffect(() => {
    try {
      const savedFollows = localStorage.getItem("band_following_ids");
      if (savedFollows) {
        const list: number[] = JSON.parse(savedFollows);
        setIsFollowing(list.includes(band.id) || initialIsFollowing);
      } else {
        setIsFollowing(initialIsFollowing);
      }

      const savedFavs = localStorage.getItem("band_favorite_ids");
      if (savedFavs) {
        const list: number[] = JSON.parse(savedFavs);
        setIsFavorite(list.includes(band.id) || initialIsFavorite);
      } else {
        setIsFavorite(initialIsFavorite);
      }
    } catch {
      setIsFollowing(initialIsFollowing);
      setIsFavorite(initialIsFavorite);
    }
  }, [band.id, initialIsFollowing, initialIsFavorite]);

  function handleToggleFollow() {
    setIsFollowing((prev) => {
      const next = !prev;
      try {
        const saved = localStorage.getItem("band_following_ids");
        const list: number[] = saved ? JSON.parse(saved) : [];
        const nextList = next
          ? (list.includes(band.id) ? list : [...list, band.id])
          : list.filter((id) => id !== band.id);
        localStorage.setItem("band_following_ids", JSON.stringify(nextList));
      } catch {}
      return next;
    });
  }

  function handleToggleFavorite() {
    setIsFavorite((prev) => {
      const next = !prev;
      try {
        const saved = localStorage.getItem("band_favorite_ids");
        const list: number[] = saved ? JSON.parse(saved) : [];
        const nextList = next
          ? (list.includes(band.id) ? list : [...list, band.id])
          : list.filter((id) => id !== band.id);
        localStorage.setItem("band_favorite_ids", JSON.stringify(nextList));
      } catch {}
      return next;
    });
  }

  const followersCount = (band.followers ?? 0) + (isFollowing ? 1 : 0);
  const likesCount = (band.likes ?? 0) + (isFavorite ? 1 : 0);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* ปุ่มติดตาม และ ปุ่มหัวใจรายการโปรด */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <button
          type="button"
          onClick={handleToggleFollow}
          style={{
            padding: "6px 14px",
            fontSize: "14px",
            borderRadius: "6px",
            border: isFollowing ? "1px solid #10b981" : "1px solid #00b78d",
            backgroundColor: isFollowing ? "#e6f4ea" : "#ffffff",
            color: isFollowing ? "#0d652d" : "#00b78d",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isFollowing ? "ติดตามแล้ว" : "ติดตาม"}
        </button>

        <button
          type="button"
          onClick={handleToggleFavorite}
          style={{
            background: "none",
            border: "none",
            fontSize: "22px",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
          aria-label={isFavorite ? "เลิกชอบ" : "กดถูกใจ"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* รูปภาพวง */}
      {band.imageUrl && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "360px",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <Image
            src={band.imageUrl}
            alt={band.name}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}

      {/* รายละเอียดวง */}
      <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 8px 0" }}>
        {band.name}
      </h1>
      <p style={{ color: "#4b5563", marginBottom: "8px" }}>
        <strong>แนวเพลง:</strong> {band.genre}
      </p>

      {/* จำนวนผู้ติดตาม และ จำนวนการกดถูกใจ */}
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "20px", fontSize: "15px", fontWeight: "600", alignItems: "center" }}>
        <span style={{ color: "#00b78d" }}>
          ผู้ติดตาม {followersCount} คน {isFollowing && "(กำลังติดตาม)"}
        </span>
        <span style={{ color: "#ef4444" }}>
          ถูกใจ {likesCount} คน {isFavorite && "(คุณถูกใจสิ่งนี้)"}
        </span>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "16px 0" }} />

      {/* สมาชิกวง */}
      <div>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
          สมาชิก:
        </h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, lineHeight: "1.8" }}>
          {band.members.map((member) => (
            <li
              key={member.id}
              style={{
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "10px",
              }}
            >
              {member.imageUrl && (
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={100}
                  height={60}
                  style={{ borderRadius: "0.5rem", objectFit: "cover" }}
                />
              )}
              <span>
                {member.name} ({member.role})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
