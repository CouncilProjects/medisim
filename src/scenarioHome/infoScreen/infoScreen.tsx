import React, { useState } from 'react';

export default function InfoScreen() {
    // Initialize the counter state at 0
    const [count, setCount] = useState(0);

    // Inline styles for the red button
    const buttonStyle = {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background 0.2s ease',
    };

    return (
        <button
            style={buttonStyle}
            onClick={() => setCount(count + 1)}
        >
            Clicks: {count} Info
        </button>
    );
}