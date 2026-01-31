import React from "react";
import style from "./PersonalVault.module.scss"; // Make sure to create this file!
import { FiLock, FiCopy, FiMaximize2 } from "react-icons/fi";
import Masonry from "react-masonry-css";

const PersonalVault = () => {
  // Dummy data for visualization
  const vaultCards = Array(5)
    .fill(0)
    .map((_, i) => ({
      id: i,
      title: "My Private Project Prompts",
      content:
        "Secret prompts for the upcoming SaaS launch. Contains detailed system instructions and persona definitions.",
      date: "2 days ago",
    }));

  const breakpointColumnsObj = {
    default: 4,
    1599: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className={style.homePage}>
      {" "}
      {/* Reusing same wrapper class name for consistent styling */}
      <div className={style.header}>
        <h1>🔒 Personal Vault</h1>
        <div className={style.filters}>
          <select>
            <option>All Time</option>
            <option>This Week</option>
          </select>
        </div>
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={style.masonryGrid}
        columnClassName={style.masonryGridColumn}
      >
        {vaultCards.map((card, index) => (
          <div className={style.card} key={index}>
            <div className={style.cardTop}>
              <span className={style.tag}>Private</span>
              <FiLock className={style.publicIcon} />
            </div>

            <h2>{card.title}</h2>
            <p>{card.content}</p>
            <div className={style.divider}></div>

            <div className={style.cardBottom}>
              <div className={style.likes} style={{ color: "#888" }}>
                <span>{card.date}</span>
              </div>

              <div className={style.actions}>
                <FiCopy />
                <FiMaximize2 />
              </div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default PersonalVault;
