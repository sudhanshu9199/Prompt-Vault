import style from "./Navbar.module.scss";
import { AiOutlineHome } from "react-icons/ai";
import { LuLockKeyhole, LuGlobe } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { NavLink } from 'react-router';
import useScrollDirection from '../../hooks/useScrollDirection';

const Navbar = () => {

  const scrollDirection = useScrollDirection();

  const navItems = [
    { name: "All Prompts", icon: <AiOutlineHome />, path: '/' },
    { name: "Personal Vault", icon: <LuLockKeyhole />, path: '/personal-vault' },
    { name: "Community Hub", icon: <LuGlobe />, path: '/' },
    { name: "Favorites", icon: <MdFavoriteBorder />, path: '/favourites' },
  ];
  return (
    <>
      {/* mobile top bar */}
      <header className={`${style.mobileTopBar} ${scrollDirection === 'down' ? style.headerHidden : ""}`}>
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
            <NavLink key={item.name} to={item.path} className={({ isActive }) => 
                isActive ? `${style.navItem} ${style.active}` : style.navItem
              }>
              <span className={style.icon}>{item.icon}</span>
              <span className={style.label}>{item.name}</span>
            </NavLink>
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
