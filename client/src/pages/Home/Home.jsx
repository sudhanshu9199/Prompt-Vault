import style from "./Home.module.scss";
import { FiGlobe, FiCopy, FiMaximize2 } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import Masonry from "react-masonry-css";

const cards = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: i,
    title: "Build a Scalable React Community Platform with Modern Architecture",
    content:
      "This prompt helps you design a production-ready community hub where users can explore, copy, and share prompts with proper structure, styling, and performance optimized for modern devices and screen sizes.",
    likes: Math.floor(Math.random() * 200) + 10,
    tag: "AI",
  }));
const Home = () => {
  const breakpointColumnsObj = {
    default: 4,
    1599: 3,
    1100: 2,
    700: 1,
  };
  return (
    <div className={style.homePage}>
      <div className={style.header}>
        <h1>🌎Community Hub</h1>
        <div className={style.filters}>
          <select name="" id="">
            <option>Trending</option>
            <option>Latest</option>
            <option>Popular</option>
          </select>
          <select name="" id="">
            <option>All Categories</option>
            <option>AI</option>
            <option>Design</option>
            <option>Code</option>
          </select>
        </div>
      </div>

      {/* <div className={style.grid}> */}
      <Masonry
       breakpointCols={breakpointColumnsObj} className={style.masonryGrid} columnClassName={style.masonryGridColumn} >
        {cards.map((card, idx) => (
          <div className={style.card} key={idx}>
            <div className={style.cardTop}>
              <span className={style.tag}>{card.tag}</span>
              <FiGlobe className={style.publicIcon} />
            </div>

            <h2>{card.title.slice(0, 60)}...</h2>
            <p>{card.content.slice(0, 150)}...</p>
            <div className={style.divider}></div>

            <div className={style.cardBottom}>
              <div className={style.likes}>
                <AiOutlineLike />
                <span>{card.likes}</span>
              </div>

              <div className={style.actions}>
                <FiCopy />
                <AiOutlineLike />
                <FiMaximize2 />
              </div>
            </div>
          </div>
        ))}
      </Masonry>
      {/* </div> */}
    </div>
  );
};

export default Home;
