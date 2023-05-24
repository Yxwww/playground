/**
 * @param {string} ransomNote -  number of the last item;
 * @param {string} magazine
 * @returns {boolean}
 */
function canConstruct(ransomNote, magazine) {
  const noteMap = new Map();
  for (let i = 0; i < ransomNote.length; i++) {
    const c = ransomNote[i];
    if (noteMap.has(c)) {
      noteMap.set(c, noteMap.get(c) + 1);
    } else {
      noteMap.set(ransomNote[i], 1);
    }
  }

  console.log("noteMap", noteMap);
  for (let i = 0; i < magazine.length; i++) {
    const c = magazine[i];
    if (noteMap.has(c)) {
      noteMap.set(c, noteMap.get(c) - 1);
    }
  }

  console.log("noteMap", noteMap);
  for (const v of noteMap.values()) {
    if (v > 0) return false;
  }

  return true;
}

console.log("running result", canConstruct("a", "b"));
