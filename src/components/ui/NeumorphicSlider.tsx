'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface NeumorphicSliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

export default function NeumorphicSlider({
    value,
    min,
    max,
    step = 1,
    onChange,
    orientation = 'horizontal',
    className = ''
}: NeumorphicSliderProps) {
    const constraintsRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    // Update progress when value changes
    useEffect(() => {
        const p = (value - min) / (max - min);
        setProgress(Math.max(0, Math.min(1, p)));
    }, [value, min, max]);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!constraintsRef.current) return;
        const element = constraintsRef.current;
        element.setPointerCapture(e.pointerId);
        calculateValue(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!constraintsRef.current) return;
        if (constraintsRef.current.hasPointerCapture(e.pointerId)) {
            calculateValue(e.clientX, e.clientY);
        }
    };

    const calculateValue = (clientX: number, clientY: number) => {
        if (!constraintsRef.current) return;
        const rect = constraintsRef.current.getBoundingClientRect();
        let percentage = 0;

        if (orientation === 'horizontal') {
            percentage = (clientX - rect.left) / rect.width;
        } else {
            // Vertical: Bottom is Min (0), Top is Max (1)
            // clientY grows downwards.
            // rect.bottom is the higher Y value.
            // percentage = (rect.bottom - clientY) / rect.height;
            percentage = (rect.bottom - clientY) / rect.height;
        }

        percentage = Math.max(0, Math.min(1, percentage));

        let newValue = min + percentage * (max - min);

        // Snap to step
        if (step) {
            newValue = Math.round(newValue / step) * step;
        }

        // Floating point correction
        newValue = parseFloat(newValue.toFixed(2));

        if (newValue !== value) {
            onChange(newValue);
        }
    };

    return (
        <div
            ref={constraintsRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            className={`relative flex items-center justify-center touch-none cursor-pointer ${orientation === 'vertical' ? 'h-full w-12' : 'w-full h-12'} ${className}`}
        >
            {/* Track (Inset Shadow) */}
            <div className={`absolute rounded-full bg-bg-base shadow-[var(--shadow-neu-pressed)] pointer-events-none ${orientation === 'vertical' ? 'w-4 h-full' : 'w-full h-4'}`}></div>

            {/* Fill (Gradient) */}
            <div
                className={`absolute rounded-full bg-gradient-to-r from-brand-coral to-brand-coral-dark pointer-events-none opacity-50 ${orientation === 'vertical' ? 'w-2 bottom-0 left-1/2 -translate-x-1/2' : 'h-2 left-0 top-1/2 -translate-y-1/2'}`}
                style={{
                    [orientation === 'vertical' ? 'height' : 'width']: `${progress * 100}%`,
                    [orientation === 'vertical' ? 'marginBottom' : 'marginLeft']: '0',
                    // Reset standard widths if overriding
                    [orientation === 'vertical' ? 'width' : 'height']: '0.5rem', // w-2 / h-2
                }}
            />

            {/* Thumb (Visual Only) */}
            <div
                className="absolute w-8 h-8 rounded-full bg-bg-base shadow-[var(--shadow-neu-flat)] border border-white/5 flex items-center justify-center pointer-events-none z-10"
                style={{
                    [orientation === 'vertical' ? 'bottom' : 'left']: `calc(${progress * 100}% - 16px)`, // -16px to center thumb
                }}
            >
                <div className="w-2 h-2 rounded-full bg-brand-coral shadow-[0_0_10px_var(--color-brand-coral)]"></div>
            </div>
        </div>
    );
}
// Note: Vertical interaction with native input range is non-standard in CSS (orient=vertical is deprecated/firefox only).
// For Vertical, we MIGHT need custom drag.
// I will implement Horizontal-only for now or use rotation for vertical.
