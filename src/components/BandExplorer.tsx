"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import type { Band } from "@/types/band";
import BandCard from "./BandCard";

type BandExplorerProps = {
  bands: Band[];
};

export default function BandExplorer({ bands }: BandExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [followingIds, setFollowingIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("band_favorite_ids");
      if (savedFavs) setFavoriteIds(JSON.parse(savedFavs));
      const savedFollows = localStorage.getItem("band_following_ids");
      if (savedFollows) setFollowingIds(JSON.parse(savedFollows));
    } catch {
      // fallback if localStorage disabled
    }
  }, []);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("band_favorite_ids", JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  function handleToggleFollow(id: number) {
    setFollowingIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("band_following_ids", JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  const searchText = keyword.trim().toLowerCase();
  const isSearching = searchText !== "";
  const visibleBands = bands.filter((band) =>
    band.name.toLowerCase().includes(searchText)
  );

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="search"
          aria-label="ค้นหาวงดนตรี"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="ค้นหาชื่อวงดนตรี..."
          className="searchInput"
        />
      </div>
      {visibleBands.length === 0 ? (
        <p style={{ color: "#64748b", padding: "1rem 0" }}>ไม่พบวงดนตรีที่ตรงกับเงื่อนไข</p>
      ) : (
        <section className="courseGrid">
          {visibleBands.map((band) => (
            <BandCard
              key={band.id}
              band={band}
              showDetailLink={!isSearching}
              isFavorite={favoriteIds.includes(band.id)}
              onToggleFavorite={handleToggleFavorite}
              isFollowing={followingIds.includes(band.id)}
              onToggleFollow={handleToggleFollow}
            />
          ))}
        </section>
      )}
    </div>
  );
}