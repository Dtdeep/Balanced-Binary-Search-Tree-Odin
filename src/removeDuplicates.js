export default function removeDuplicatesSorted(arr) {
  if (arr === 0) return [];
  if (arr.length === 0) return [];
  const uniqueArr = [arr[0]]; // Initialize with the first element
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      uniqueArr.push(arr[i]);
    }
  }
  return uniqueArr;
}
