var groupAnagrams = function (strs) {
  if (strs.length === 0) {
    return [];
  }
  const map = new Map();

  for (const str of strs) {
    const characters = Array(26).fill(0);
    for (let i = 0; i < str.length; i++) {
      const ascii = str.charCodeAt(i) - 97;
      characters[ascii]++;
    }
    const key = characters.join("");
    if (map.has(key)) {
      map.set(key, [...map.get(key), str]);
    } else {
      map.set(key, [str]);
    }
  }

  const result = [];
  for (const arr of map) {
    result.push(arr[1]);
  }

  return result;
};
