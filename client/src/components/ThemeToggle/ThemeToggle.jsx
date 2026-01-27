import { BsMoonStars, BsSun } from 'react-icons/bs';
import style from './ThemeToggle.module.scss';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className={style.toggleContainer}>
        <div className={style.iconWrapper}>
            <BsSun />
        </div>
        <div className={style.iconWrapper}>
            <BsMoonStars />
        </div>
        <div className={style.ball}></div>
    </div>
  )
}

export default ThemeToggle