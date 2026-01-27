import style from "./Navbar.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { LuLockKeyhole, LuGlobe } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { BsMoonStars, BsSun } from "react-icons/bs";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const navItems = [
    { name: "All Prompts", icon: <AiOutlineHome /> },
    { name: "Personal Vault", icon: <LuLockKeyhole /> },
    { name: "Community Hub", icon: <LuGlobe /> },
    { name: "Favorites", icon: <MdFavoriteBorder /> },
  ];
  return (
    <>
      {/* mobile top bar */}
      <header className={style.mobileTopBar}>
        <div className={style.logo}>PromptVault</div>
        <div className={style.rightSection}>
          <div className={style.user}>👤</div>
          <ThemeToggle />
        </div>
      </header>

      {/* sidebar / bottom nav */}
      <nav className={style.navbar}>
        <div className={style.desktopHeader}>
          <div className={style.logo}>PromptVault</div>
          <button className={style.newPromptBtn}>+ New Prompt</button>
        </div>

        <div className={style.navList}>
          {navItems.map((item) => (
            <div key={item.name} className={style.navItem}>
              <span className={style.icon}>{item.icon}</span>
              <span className={style.label}>{item.name}</span>
            </div>
          ))}
        </div>

        <div className={style.desktopFooter}>
          <div className={style.userCard}>
            <div className={style.avatar}>👤</div>
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
