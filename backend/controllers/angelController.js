const Angel = require("../models/Angel");

exports.callAngel = async (req, res) => {
  try {
    const entryType = req.body.entryType || Math.floor(Math.random() * 6) + 1;
    const entryNames = {
      1: "Heavenly Light Descent",
      2: "Mystic Portal Vortex",
      3: "Celestial Orbital Flight",
      4: "Starlight Supernova Genesis",
      5: "Golden Phoenix Rise",
      6: "Diamond Butterfly Tempest",
    };

    return res.json({
      success: true,
      angelType: entryType,
      entryName: entryNames[entryType],
      music: "angel_theme.mp3",
      animation: `entry${entryType}`,
      particles: true,
      crackers: true,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAngelsList = async (req, res) => {
  try {
    const angels = [
      { id: 1, name: "Celestial Seraph", entryType: 1, active: true },
      { id: 2, name: "Mystic Archangel", entryType: 2, active: true },
      { id: 3, name: "Rose Guardian", entryType: 3, active: true },
      { id: 4, name: "Starlight Spirit", entryType: 4, active: true },
      { id: 5, name: "Golden Phoenix", entryType: 5, active: true },
      { id: 6, name: "Crystal Butterfly", entryType: 6, active: true },
    ];
    return res.json({ success: true, angels });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getRandomAngel = async (req, res) => {
  const randomType = Math.floor(Math.random() * 6) + 1;
  return res.json({ success: true, angelType: randomType });
};
