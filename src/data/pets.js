// REQ: the list of pets that are available for adoption (no database, just an array)
// "image" is the file name (without .jpg) inside public/images/pets/
// so for Luna the main photo is public/images/pets/luna.jpg

const PETS = [
  {
    id: 1, name: "Luna", image: "luna", species: "Dog", breed: "Golden Retriever mix",
    age: 3, gender: "Female", size: "Large", goodWithKids: true,
    tags: ["Friendly", "Playful"],
    story: "Luna was left at our gate with her toys. She loves fetch, swimming and meeting new people, and she is already toilet trained.",
  },
  {
    id: 2, name: "Milo", image: "milo", species: "Cat", breed: "Domestic Shorthair",
    age: 2, gender: "Male", size: "Small", goodWithKids: true,
    tags: ["Cuddly", "Calm"],
    story: "Milo was found sleeping in a void deck. He purrs the moment he is picked up and loves sitting on laps.",
  },
  {
    id: 3, name: "Biscuit", image: "biscuit", species: "Dog", breed: "Beagle",
    age: 5, gender: "Male", size: "Medium", goodWithKids: true,
    tags: ["Curious", "Energetic"],
    story: "Biscuit follows his nose everywhere. He needs a family that enjoys long walks and does not mind a bit of howling.",
  },
  {
    id: 4, name: "Mochi", image: "mochi", species: "Cat", breed: "Persian mix",
    age: 4, gender: "Female", size: "Small", goodWithKids: false,
    tags: ["Quiet", "Independent"],
    story: "Mochi is shy at first but warms up slowly. She would be happiest in a calm home without small children.",
  },
  {
    id: 5, name: "Rocky", image: "rocky", species: "Dog", breed: "Labrador mix",
    age: 7, gender: "Male", size: "Large", goodWithKids: true,
    tags: ["Gentle", "Loyal"],
    story: "Rocky's owner moved overseas. He is a gentle senior who loves slow walks and belly rubs.",
  },
  {
    id: 6, name: "Pepper", image: "pepper", species: "Cat", breed: "Tabby",
    age: 1, gender: "Female", size: "Small", goodWithKids: true,
    tags: ["Playful", "Curious"],
    story: "Pepper climbs everything and chases anything that moves. She needs plenty of toys and a window to watch birds.",
  },
  {
    id: 7, name: "Daisy", image: "daisy", species: "Dog", breed: "Shih Tzu",
    age: 9, gender: "Female", size: "Small", goodWithKids: true,
    tags: ["Calm", "Affectionate"],
    story: "Daisy is a senior lady who just wants a soft bed and a warm lap. She does well in flats.",
  },
  {
    id: 8, name: "Oreo", image: "oreo", species: "Cat", breed: "Domestic Shorthair",
    age: 0.5, gender: "Male", size: "Small", goodWithKids: true,
    tags: ["Playful", "Cuddly"],
    story: "Oreo is a six month old kitten who was rescued with his siblings. He is full of energy and loves attention.",
  },
  {
    id: 9, name: "Bruno", image: "bruno", species: "Dog", breed: "Rottweiler mix",
    age: 4, gender: "Male", size: "Large", goodWithKids: false,
    tags: ["Protective", "Smart"],
    story: "Bruno is clever and eager to learn. He does best with an experienced owner who can give him training and routine.",
  },
  {
    id: 10, name: "Cleo", image: "cleo", species: "Cat", breed: "Siamese mix",
    age: 6, gender: "Female", size: "Small", goodWithKids: true,
    tags: ["Chatty", "Affectionate"],
    story: "Cleo loves to talk and will tell you all about her day. She follows her people from room to room.",
  },
];

export default PETS;
