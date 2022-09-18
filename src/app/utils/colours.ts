export const typeColor = (type: string) => {
  const colours = [
    'normal',
    'fire',
    'water',
    'electric',
    'ice',
    'grass',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy'
  ]
  let typeExists = colours.includes(type);
  return typeExists ? type : 'default';
}