import { useState, useEffect } from 'react';
function getScroll() {
    return {
        x: typeof window === 'undefined' ? 0 : window.pageXOffset || window.scrollX,
        y: typeof window === 'undefined' ? 0 : window.pageYOffset || document.documentElement.scrollTop,
    };
}
export function useScroll() {
    const [scrollState, setScroll] = useState(getScroll());
    useEffect(() => {
        let ticking = null;
        function handleScroll() {
            if (ticking === null) {
                ticking = window.requestAnimationFrame(() => {
                    setScroll(getScroll());
                    ticking = null;
                });
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return scrollState;
}
export function useScrollX() {
    const { x } = useScroll();
    return x;
}
export function useScrollY() {
    const { y } = useScroll();
    return y;
}
