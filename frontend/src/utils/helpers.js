export const generateRandomUsername = () => {
  const adjectives = [
    "Anonymous",
    "Silent",
    "Hidden",
    "Mystic",
    "Shadow",
    "Ghost",
    "Secret",
    "Whisper",
    "Invisible",
    "Phantom",
    "Covert",
    "Stealthy",
    "Veiled",
    "Enigmatic",
    "Incognito",
  ];

  const nouns = [
    "User",
    "Traveler",
    "Seeker",
    "Observer",
    "Agent",
    "Node",
    "Entity",
    "Presence",
    "Voyager",
    "Specter",
    "Echo",
    "Cipher",
    "Pixel",
    "Byte",
    "Stream",
  ];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `${randomAdjective}${randomNoun}${randomNumber}`
};
