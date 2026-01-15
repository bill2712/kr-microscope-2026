const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// List of specimens and their magnifications
const specimens = [
  'potato_starch', 'carrot_root', 'butterfly_leg', 'honeybee_leg', 
  'honeybee_wing', 'locust_wing', 'camellia_pollen', 'tulip_pollen', 
  'lily_pollen', 'sunflower_pollen', 'holly_leaf', 'corn_stem', 
  'pigeon_feather', 'canary_feather', 'cat_hair', 'plankton_egg', 
  'dandelion_fuzz', 'goldfish_scale'
];

const magnifications = ['100x', '400x', '1200x'];

const outputDir = path.join(__dirname, 'public', 'images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to create a placeholder image
function createPlaceholder(name, mag) {
  const canvas = createCanvas(800, 800); // Square image like others
  const ctx = canvas.getContext('2d');

  // Background color (varied based on mag for visual distinction)
  if (mag === '100x') ctx.fillStyle = '#e0f7fa';
  else if (mag === '400x') ctx.fillStyle = '#b2ebf2';
  else ctx.fillStyle = '#80deea';
  
  ctx.fillRect(0, 0, 800, 800);

  // Circle frame (microscope view)
  ctx.beginPath();
  ctx.arc(400, 400, 380, 0, Math.PI * 2);
  ctx.lineWidth = 20;
  ctx.strokeStyle = '#333';
  ctx.stroke();
  ctx.closePath();

  // Text
  ctx.fillStyle = '#333';
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const textName = name.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  ctx.fillText(textName, 400, 350);
  ctx.fillText(mag + ' Magnification', 400, 450);
  ctx.font = 'italic 40px Arial';
  ctx.fillText('(Placeholder)', 400, 550);

  // Save
  const buffer = canvas.toBuffer('image/png');
  const filename = `${name}_${mag}.png`;
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, buffer);
  console.log(`Created ${filename}`);
}

// Generate all
specimens.forEach(specimen => {
  magnifications.forEach(mag => {
    // Skip potato_starch_100x if it exists (I generated one successfully)
    if (specimen === 'potato_starch' && mag === '100x' && fs.existsSync(path.join(outputDir, 'potato_starch_100x.png'))) {
        console.log('Skipping existing potato_starch_100x.png');
        return;
    }
    createPlaceholder(specimen, mag);
  });
});
