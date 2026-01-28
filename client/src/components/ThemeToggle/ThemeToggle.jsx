import { BsMoonStars, BsSun } from 'react-icons/bs';
import style from './ThemeToggle.module.scss';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className={`${style.toggleContainer} ${isDarkMode ? style.dark : style.light}`} onClick={toggleTheme} role='button' aria-label='toggle theme'>
        <div className={`${style.iconWrapper} ${style.sun} ${!isDarkMode ? style.active : ''}`}>
            <BsSun className={style.sunIcon}/>
        </div>
        <div className={`${style.iconWrapper} ${style.moon} ${isDarkMode ? style.active : ''}`}>
            <BsMoonStars className={style.moon}/>
        </div>
        <div className={style.ball}></div>
    </div>
  )
}

export default ThemeToggle