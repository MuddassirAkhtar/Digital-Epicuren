export function toTitleCase(str) {
  return str
    .trim() // remove extra spaces from start/end
    .toLowerCase()
    .replace(/\s+/g, " ") // collapse multiple spaces
    .split(" ")
    .map(word => {
      // handle hyphenated words like burger-king
      return word
        .split("-")
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join("-");
    })
    .join(" ");
}