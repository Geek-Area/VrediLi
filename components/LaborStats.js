'use client';

import { CURRENCIES, SALARIES } from '@/lib/constants';
import styles from './LaborStats.module.css';

export default function LaborStats({ moneyRSD, currency, onToggleCurrency, salaryRSD, onSalaryChange }) {
    if (!moneyRSD) moneyRSD = 0;

    // Derived display values
    const rateToEur = CURRENCIES.RSD.rateToEur;

    // If currency is EUR, we show EUR value
    // 1 RSD = X EUR
    // Val in EUR = ValRSD * Rate
    const displaySalary = currency === 'RSD'
        ? salaryRSD
        : (salaryRSD * rateToEur);

    const handleSalaryChange = (val) => {
        if (currency === 'RSD') {
            onSalaryChange(val);
        } else {
            // User entered EUR, convert back to RSD
            // ValRSD = ValEUR / Rate
            onSalaryChange(val / rateToEur);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.label}>VREDNOST RADA</span>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.inputGroup}>
                    <input
                        className={styles.salaryInput}
                        type="number"
                        value={displaySalary.toFixed(0)}
                        onChange={(e) => handleSalaryChange(Number(e.target.value))}
                    />
                    <div className={styles.currencyToggleInline}>
                        {Object.keys(CURRENCIES).map(c => (
                            <button
                                key={c}
                                className={`${styles.currencyBtn} ${currency === c ? styles.active : ''}`}
                                onClick={() => onToggleCurrency(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <input
                    className={styles.range}
                    type="range"
                    min={currency === 'RSD' ? 1000 : 10}
                    max={currency === 'RSD' ? 300000 : 2500}
                    step={currency === 'RSD' ? 1000 : 10}
                    value={displaySalary}
                    onChange={(e) => handleSalaryChange(Number(e.target.value))}
                />
            </div>

            <div className={styles.footer}>
                <div className={styles.presets}>
                    <button
                        className={styles.presetBtn}
                        onClick={() => onSalaryChange(SALARIES.MIN.netRSD)}
                    >
                        Minimalac
                    </button>
                    <button
                        className={styles.presetBtn}
                        onClick={() => onSalaryChange(SALARIES.MEDIAN.netRSD)}
                    >
                        Medijana
                    </button>
                    <button
                        className={styles.presetBtn}
                        onClick={() => onSalaryChange(SALARIES.AVG.netRSD)}
                    >
                        Prosek
                    </button>
                </div>
            </div>
        </div>
    );
}
