import { useState, useEffect } from "react";

const useScrollDirection = () => {
    const [scrollDr, setscrollDr] = useState('up');

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            if(Math.abs(scrollY - lastScrollY) < 10) return;

            setscrollDr(scrollY > lastScrollY ? 'down' : 'up');
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener('scroll', updateScrollDirection);
        return () => window.removeEventListener('scroll', updateScrollDirection);
    }, []);

    return scrollDr;
};
export default useScrollDirection;