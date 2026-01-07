'use client';

import { useState, useEffect } from 'react';
import styles from './Converter.module.css';
import { PRODUCTS, CURRENCIES, SALARIES } from '@/lib/constants';
import LaborStats from './LaborStats';
import Visualizer from './Visualizer';
import { ArrowLeftRight } from 'lucide-react';
import ProductDropdown from './ProductDropdown';

// Ranges for sliders based on currency/product
const MAX_MONEY_RSD = 100000;
const MAX_MONEY_EUR = 1000;
const MAX_QUANTITY = 200;

export default function Converter() {
    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
    const [currency, setCurrency] = useState('RSD'); // 'RSD' | 'EUR'
    const [salaryRSD, setSalaryRSD] = useState(SALARIES.AVG.netRSD);
    const [moneyValue, setMoneyValue] = useState(1000);
    const [quantityValue, setQuantityValue] = useState(0);

    const getProductPrice = (prod, curr) => {
        return curr === 'RSD' ? prod.priceRSD : prod.priceEUR;
    };

    useEffect(() => {
        if (moneyValue === '') {
            setQuantityValue('');
            return;
        }
        const price = getProductPrice(selectedProduct, currency);
        const qty = parseFloat(moneyValue) / price;
        setQuantityValue(qty.toFixed(2));
    }, [moneyValue, selectedProduct, currency]);

    const handleMoneyChange = (e) => {
        const val = e.target.value;
        setMoneyValue(val);
    };

    const handleQuantityChange = (e) => {
        const val = e.target.value;
        setQuantityValue(val);
        if (val === '') {
            setMoneyValue('');
            return;
        }
        const price = getProductPrice(selectedProduct, currency);
        const money = parseFloat(val) * price;
        setMoneyValue(money.toFixed(2));
    };

    const toggleCurrency = (c) => {
        if (c === currency) return;
        const valInEur = moneyValue * CURRENCIES[currency].rateToEur;
        const newVal = valInEur / CURRENCIES[c].rateToEur;
        setMoneyValue(newVal.toFixed(0));
        setCurrency(c);
    };

    // Safe convert to RSD for LaborStats
    const currentRSD = currency === 'RSD'
        ? parseFloat(moneyValue)
        : parseFloat(moneyValue) * (1 / CURRENCIES.RSD.rateToEur);

    const maxMoney = currency === 'RSD' ? MAX_MONEY_RSD : MAX_MONEY_EUR;

    // Calculate time needed
    const hoursPerMonth = 168; // Standard full time
    const hourlyRateRSD = salaryRSD / hoursPerMonth;
    const hoursNeeded = currentRSD / hourlyRateRSD;

    let timeString = '';
    if (currentRSD > 0) {
        if (hoursNeeded < 1) {
            const minutes = Math.ceil(hoursNeeded * 60);
            timeString = `${minutes} min`;
        } else if (hoursNeeded < 8) {
            timeString = `${hoursNeeded.toFixed(1)} sati`;
        } else if (hoursNeeded < 168) {
            // Convert to days (8h work days)
            const days = (hoursNeeded / 8).toFixed(1);
            timeString = `${days} radnih dana`;
        } else {
            // Months
            const months = (hoursNeeded / hoursPerMonth).toFixed(1);
            timeString = `${months} meseci`;
        }
    }

    return (
        <div className={`${styles.wrapper} glass-panel`}>
            <header className={styles.header}>
                <h1 className={styles.title}>Vredi li?</h1>
                <p className={styles.subtitle}>Saznaj pravu vrednost svog novca.</p>
            </header>

            <div className={styles.controls}>
                {/* Money Input Side */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <label className={styles.label}>Budžet</label>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="number"
                            inputMode="decimal"
                            className={styles.input}
                            value={moneyValue}
                            onChange={handleMoneyChange}
                            placeholder="0"
                        />
                        <div className={styles.currencyToggleInline}>
                            {Object.keys(CURRENCIES).map(c => (
                                <button
                                    key={c}
                                    className={`${styles.currencyBtn} ${currency === c ? styles.active : ''}`}
                                    onClick={() => toggleCurrency(c)}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={maxMoney}
                        step={currency === 'RSD' ? 100 : 1}
                        value={moneyValue || 0}
                        onChange={handleMoneyChange}
                        className={styles.range}
                    />
                </div>

                {/* Product Output Side */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <label className={styles.label}>Kupovna Moć</label>
                    </div>

                    <ProductDropdown
                        products={PRODUCTS}
                        selectedProduct={selectedProduct}
                        onSelect={setSelectedProduct}
                        currency={currency}
                        currencySymbol={CURRENCIES[currency].symbol}
                    />

                    <div className={styles.inputGroup}>
                        <span style={{ fontSize: '1.5rem', opacity: 0.5, marginRight: '8px' }}>x</span>
                        <input
                            type="number"
                            inputMode="decimal"
                            min="1"
                            className={styles.input}
                            value={quantityValue}
                            onChange={handleQuantityChange}
                            placeholder="1"
                        />
                    </div>
                    <input
                        type="range"
                        min="1"
                        max={MAX_QUANTITY}
                        step="1"
                        value={quantityValue || 1}
                        onChange={handleQuantityChange}
                        className={styles.range}
                    />
                </div>

                {/* Labor Stats Card */}
                <div className={styles.card}>
                    <LaborStats
                        moneyRSD={currentRSD}
                        currency={currency}
                        onToggleCurrency={toggleCurrency}
                        salaryRSD={salaryRSD}
                        onSalaryChange={setSalaryRSD}
                    />
                </div>
            </div>

            <Visualizer
                product={selectedProduct}
                count={parseFloat(quantityValue) || 0}
                maxAffordableCount={salaryRSD / selectedProduct.priceRSD}
                hasBudget={currentRSD > 0}
            />

            {timeString && (
                <div style={{ textAlign: 'center', margin: '20px 0', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                    Za <span style={{ fontWeight: 'bold' }}>{parseFloat(quantityValue).toFixed(2)}</span> x <span style={{ fontWeight: 'bold' }}>{selectedProduct.name}</span> u vrednosti od <span style={{ fontWeight: 'bold' }}>{parseFloat(moneyValue).toFixed(0)} {CURRENCIES[currency].symbol}</span> je potrebno da radite <span style={{ fontWeight: 'bold', color: 'var(--accent-color)' }}>{timeString}</span>.
                </div>
            )}

        </div>
    );
}
