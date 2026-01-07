'use client';

import styles from './Visualizer.module.css';
import { useEffect, useState } from 'react';

export default function Visualizer({ product, count, maxAffordableCount, hasBudget }) {
    const [displayCount, setDisplayCount] = useState(0);

    // Simple safe guard against rendering too many items causing lag
    const MAX_ITEMS = 100;
    const safeCount = Math.min(Math.floor(count), MAX_ITEMS);
    const Icon = product.icon;

    useEffect(() => {
        setDisplayCount(safeCount);
    }, [safeCount]);

    if (!product) return null;

    return (
        <div className={styles.container}>
            {Array.from({ length: displayCount }).map((_, index) => {
                const isAffordable = index < maxAffordableCount;
                return (
                    <div key={index} className={styles.item} style={{ animationDelay: `${index * 0.02}s` }}>
                        <Icon style={{ color: isAffordable ? product.color : 'var(--text-muted)' }} />
                    </div>
                );
            })}
            {count > MAX_ITEMS && (
                <div className={styles.item}>
                    <span style={{ fontWeight: 'bold' }}>+{Math.floor(count - MAX_ITEMS)}</span>
                </div>
            )}
            {safeCount === 0 && (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>
                    {hasBudget
                        ? "Nažalost, ne možeš da priuštiš tu količinu proizvoda za taj budžet. Moraćeš nešto da promeniš."
                        : "Unesi vrednost da vidiš šta možeš da kupiš..."}
                </p>
            )}
        </div>
    );
}
