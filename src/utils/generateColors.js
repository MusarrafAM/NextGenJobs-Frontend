// Function to generate colors dynamically
function generateColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 360) / numColors;
    colors.push(`hsla(${hue}, 70%, 50%, 0.8)`);
  }
  return colors;
}

export default generateColors;
