import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export const useBbox = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [bbox, setBbox] = useState<DOMRect | null>(null);

    const set = () => {
        setBbox(ref && ref.current ? ref.current.getBoundingClientRect() : null);
        console.log(ref?.current?.getBoundingClientRect());
    };

    useEffect(() => {
        set();
        window.addEventListener('resize', set);
        return () => window.removeEventListener('resize', set);
    }, []);

    return { bbox, ref };
};
