import React, { useState } from 'react';

const ACUITY_LINK = 'https://app.acuityscheduling.com/schedule.php?owner=35479732';

function App() {
  const [sqft, setSqft] = useState('');
  const [addons, setAddons] = useState({
    floorPlan: false,
    cinematicVideo: false,
    aerial: false,
  });

  const handleSqftChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setSqft(value);
  };

  const handleAddonChange = (e) => {
    const { name, checked } = e.target;
    setAddons(prev => ({ ...prev, [name]: checked }));
  };

  const sqftNum = parseInt(sqft, 10) || 0;
  let basePrice = 0;
  if (sqftNum <= 2000) {
    basePrice = 250;
  } else if (sqftNum <= 4000) {
    basePrice = 380;
  } else {
    basePrice = 70 + sqftNum * 0.08;
  }

  const addonPrices = {
    floorPlan: sqftNum * 0.02,
    cinematicVideo: sqftNum * 0.09,
    aerial: sqftNum * 0.03,
  };

  const totalAddons = Object.keys(addons).reduce((sum, key) => {
    return addons[key] ? sum + addonPrices[key] : sum;
  }, 0);

  const total = basePrice + totalAddons;

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Pricing Calculator</h1>
      <label>
        Square Footage:
        <input
          type="text"
          value={sqft}
          onChange={handleSqftChange}
          placeholder="Enter sq. ft."
          style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
        />
      </label>
      <div>
        <h2>Add-Ons</h2>
        <label>
          <input
            type="checkbox"
            name="floorPlan"
            checked={addons.floorPlan}
            onChange={handleAddonChange}
          />
          Floor Plan ({sqftNum} × $0.02 = ${addonPrices.floorPlan.toFixed(2)})
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="cinematicVideo"
            checked={addons.cinematicVideo}
            onChange={handleAddonChange}
          />
          Cinematic 4K Video ({sqftNum} × $0.09 = ${addonPrices.cinematicVideo.toFixed(2)})
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="aerial"
            checked={addons.aerial}
            onChange={handleAddonChange}
          />
          Aerial Photo/Video ({sqftNum} × $0.03 = ${addonPrices.aerial.toFixed(2)})
        </label>
      </div>
      <h2>Total: ${total.toFixed(2)}</h2>
      <a
        href={`${ACUITY_LINK}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4A90E2',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '4px',
          marginTop: '1rem'
        }}
      >
        Schedule Now
      </a>
    </div>
  );
}

export default App;
