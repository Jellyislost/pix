// =============================================
//  PHOTO//SYS — Gallery Data
//  js/data.js
//  Edit this file to add/remove/update photos.
// =============================================

// Helpers — build Google Drive URLs from file IDs
function driveThumb(id)    { return `https://lh3.googleusercontent.com/d/${id}`; }
function driveDownload(id) { return `https://drive.google.com/uc?export=download&id=${id}`; }

// ── MENU ──────────────────────────────────────
const MENU_ITEMS = [
  { id: "gallery",  label: "GALLERY",  fontSize: 130, offsetX: 0,  offsetY: 0  },
  { id: "about",    label: "ABOUT",    fontSize: 108, offsetX: 38, offsetY: -8 },
  { id: "download", label: "DOWNLOAD", fontSize: 88,  offsetX: 14, offsetY: -6 },
];

// ── CLIP SHAPES (angled polygon highlights) ───
const CLIP_SHAPES = [
  (w, h) => `polygon(0px ${h*0.06}px, ${w - h*0.55}px 0px, ${w}px ${h*0.42}px, ${w - h*0.18}px ${h}px, 0px ${h*0.94}px)`,
  (w, h) => `polygon(${h*0.12}px 0px, ${w - h*0.3}px ${h*0.04}px, ${w}px ${h*0.5}px, ${w - h*0.08}px ${h}px, 0px ${h*0.88}px)`,
  (w, h) => `polygon(0px ${h*0.1}px, ${w - h*0.4}px 0px, ${w}px ${h*0.45}px, ${w - h*0.25}px ${h}px, ${h*0.05}px ${h*0.9}px)`,
];

// ── CATEGORY FILTERS ──────────────────────────
const CATEGORIES = ["ALL", "FLOWERS", "MACRO", "NATURE"];

// ── PHOTOS ────────────────────────────────────
//  thumb    → webp version (1200px, fast preview)
//  download → raw JPEG (full quality, for download)
const PHOTOS = [
  { id:1,  title:"The Pink Cluster",              category:"FLOWERS", date:"2026.01.18", thumb:driveThumb("1aSnC0fN9k0EmYbkLjKdvMSHCUw3bIcHK"),   download:driveDownload("1t7oyQ4Bg_my7FTTLDs2q9i6p8MZZM2qH")  },
  { id:2,  title:"Temple of the Gilded Hour",     category:"FLOWERS", date:"2026.01.18", thumb:driveThumb("19Ix2sT789WqC--SOKAe5jcTHh1VypUjz"),   download:driveDownload("1flkmKVyfqJlvgIwveuiMEi-W5iknvVXR") },
  { id:3,  title:"Tangled Light",                 category:"MACRO",   date:"2026.01.18", thumb:driveThumb("11NYI8rgByQkv4WjvvFZwlf4R1_7puXO5"),   download:driveDownload("13ti4xpl7RbupUfKD20z3dE9INKiz0b-M") },
  { id:4,  title:"Sunset Lantana",                category:"FLOWERS", date:"2026.01.18", thumb:driveThumb("14ugdtnZS27nbfKF8JcOmph26BP1HDuEG"),   download:driveDownload("1VsCqdj8inC3AcvlpH9mPTV9wcAj7gkVo") },
  { id:5,  title:"Sanctuary in the Leaves",       category:"NATURE",  date:"2026.01.18", thumb:driveThumb("15llA_ZMO-MbxpFYj4mOg5m-brwovH5Sf"),  download:driveDownload("13mhkLpw3Bu7uVTaKQsoUsLRfZCzfQQc3") },
  { id:6,  title:"Petals in Focus",               category:"MACRO",   date:"2026.01.18", thumb:driveThumb("1v4bWADGy5VGN7pfzcyiPLBGPyqCBBgi-"),  download:driveDownload("1mfyEwL7dwA2I6PGIMrCN0zx7szGCdaBm") },
  { id:7,  title:"Purity in Green",               category:"NATURE",  date:"2026.01.18", thumb:driveThumb("1wCrizJpAW7k-yC_L-SqiU8XHD0YIxZB_"), download:driveDownload("1LdtlYy1if4AQBOGyoGySUP4e382QTsK4") },
  { id:8,  title:"Petals in the Park",            category:"FLOWERS", date:"2026.01.18", thumb:driveThumb("1xR1ANyfdF5CEm4_cg14EL2Q-xwz6Q9vJ"),  download:driveDownload("1rvSPWmfUmkj7JWMtVVBaweFveL4xA7Lh") },
  { id:9,  title:"Monsoon Glow",                  category:"NATURE",  date:"2026.01.18", thumb:driveThumb("112wFndsBHsFcDEXWf15xd7O5eTjNekhR"),  download:driveDownload("1U7l5nn900_RYajitQz8r8Q2Wyyp02srC") },
  { id:10, title:"Madagascar Periwinkle",         category:"FLOWERS", date:"2026.01.18", thumb:driveThumb("1q63tNDbakkoDD5dI_tuYcyCvKcj7zOg0"),  download:driveDownload("1YtOiiQuXLIdU1Xz8vNJZAkPgAuBh22No") },
  { id:11, title:"Untitled · Jul 2024",           category:"NATURE",  date:"2024.07.25", thumb:driveThumb("1Ny766pNNe5aM3ouNpxhrj9GoGQzSfL9Z"),  download:driveDownload("1UyG8iB3k-dBql5KErGHGISt6-bbxnVzZ") },
  { id:12, title:"Untitled · Apr 2024",           category:"NATURE",  date:"2024.04.22", thumb:driveThumb("17sibrDer4njkq0Cn9hmomHNV6EQCdXBX"),  download:driveDownload("1kVAEa6MU0umWTY-HVWpilejtTX-tNer4") },
  { id:13, title:"Hidden Ixora",                  category:"FLOWERS", date:"2026.01.18", thumb:driveThumb("1-eXr9aBgjf8UMK-FV-u-cHVCQD_srQN6"), download:driveDownload("1KRb81Auv1l6q0tpteXcrbS7wRRtdyQAc") },
  { id:14, title:"Garloth The Astroid Destroyer", category:"MACRO",   date:"2026.01.18", thumb:driveThumb("1vC8rGXkkHxWldbOxaqdoz8JWh-pS_7bk"),  download:driveDownload("1AAa3nMLO91uEWKP-4bahDf0VlINUnCzK") },
  { id:15, title:"Dahlia in the Wild",            category:"FLOWERS", date:"2026.01.18", thumb:driveThumb("1ljDLhKVTIkSpnXKXBh1d26B3KL19_6KO"),  download:driveDownload("1h9PHzg_hCfYNzlKasILgg0mTlIOxb-QE") },
  { id:16, title:"Emerald Dewdrops",              category:"MACRO",   date:"2026.01.18", thumb:driveThumb("1UcHXbcSO8tOUXdOLtc20wFhujwC7tIGD"),  download:driveDownload("14M99MkFrwxBFuOcyCYWkeG7G9QoFoju5") },
  { id:17, title:"Sun Kissed Sida Acuta",         category:"FLOWERS", date:"2025.05.28", thumb:driveThumb("1OIq_-TK7HC2X-CVZo15cWjE_3H8orK1o"),  download:driveDownload("1-wAXpiKIkcG0gTBUrxzJF0IHBL-6ajF7") },
  { id:18, title:"Sulphur Cosmos",                category:"FLOWERS", date:"2025.05.28", thumb:driveThumb("1swM9FStfIRHmvd_ZJLS-xuERuDs1LPlm"),  download:driveDownload("1-VMUoy11mRhPbPpuwbOhTMbQp2r8L3gA") },
  { id:19, title:"Purple Water Lily",             category:"NATURE",  date:"2025.05.28", thumb:driveThumb("1QD7e08L_uyts01klLcYnBTJdRje0ycOt"),  download:driveDownload("1-34gfOVIAo6Ip_LE29BdvlLIPsMygCvL") },
  { id:20, title:"Hope Amidst the Shadows",       category:"NATURE",  date:"2025.05.28", thumb:driveThumb("1pDuuPMb5r0js3cMPQSvqEue-TPe4dNnb"),  download:driveDownload("1-Yi2vD9yDGAqlx-WuRqY9FzuygZvB-9Y") },
  { id:21, title:"Golden Sunflower",              category:"FLOWERS", date:"2025.05.28", thumb:driveThumb("1V-ak7hI486b4pmDypCfADWj8gHsWgcwS"),  download:driveDownload("1-Q_A97rz625dxEeFPJYLGn0bAqLBDr-P") },
];
