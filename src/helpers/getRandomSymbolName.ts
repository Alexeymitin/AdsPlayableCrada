export const starNames = [
  'star_blue',
  'star_gray',
  'star_green',
  'star_ice',
  'star_orange',
  'star_pink',
  'star_purple',
  'star_red',
  'star_wood',
  'star_yellow'
];

export function getRandomSymbolName() {
  const randomIndex = Math.floor(Math.random() * starNames.length);
  return starNames[randomIndex];
}
