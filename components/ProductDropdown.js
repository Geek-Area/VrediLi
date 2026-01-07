'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './ProductDropdown.module.css';

export default function ProductDropdown({ products, selectedProduct, onSelect, currency, currencySymbol }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const Icon = selectedProduct.icon;

    return (
        <div className={styles.wrapper} ref={dropdownRef}>
            <button
                className={styles.trigger}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <div className={styles.selectedContent}>
                    <Icon size={20} color={selectedProduct.color} />
                    <span>{selectedProduct.name}</span>
                </div>
                <ChevronDown size={16} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
                {products.map((p) => {
                    const PIcon = p.icon;
                    const price = currency === 'RSD' ? p.priceRSD : p.priceEUR;

                    return (
                        <div
                            key={p.id}
                            className={styles.option}
                            onClick={() => {
                                onSelect(p);
                                setIsOpen(false);
                            }}
                        >
                            <div className={styles.optionLeft}>
                                <PIcon size={20} color={p.color} />
                                <span className={styles.optionName}>{p.name}</span>
                            </div>
                            <span className={styles.optionPrice}>
                                {price} {currencySymbol}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
