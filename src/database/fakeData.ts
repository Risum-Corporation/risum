interface PostProps {
  id: number;
  author: string;
  memeUrl: string;
  likes: number;
  memeTitle: string;
  tags: string[];
  avatar: string;
  comments: number;
}

interface CommentProps {
  id: number;
  author: string;
  likes: number;
  content: string;
}

export const posts: PostProps[] = [
  {
    id: 1,
    author: "Sapeka",
    memeUrl: "https://source.unsplash.com/random/",
    likes: 43,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "comedia"],
    avatar: "https://source.unsplash.com/random/50x60",
    comments: 17,
  },
  {
    id: 2,
    author: "Educg550",
    memeUrl: "https://source.unsplash.com/random/",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "memeskk", "hurdur"],
    avatar: "https://source.unsplash.com/random/50x60",
    comments: 20,
  },
  {
    id: 3,
    author: "DunkerJeJeNiño",
    memeUrl: "https://source.unsplash.com/random/500x600",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    avatar: "https://source.unsplash.com/random/50x60",
    comments: 20,
  },
  {
    id: 4,
    author: "Bataton",
    memeUrl: "https://source.unsplash.com/random/",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    avatar: "https://source.unsplash.com/random/50x50",
    comments: 20,
  },
  {
    id: 5,
    author: "Jiraya",
    memeUrl: "https://source.unsplash.com/random/50x50",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    avatar: "https://source.unsplash.com/random/50x50",
    comments: 20,
  },
  {
    id: 6,
    author: "DunkerJeJeNiño",
    memeUrl: "https://source.unsplash.com/random/",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    avatar: "https://source.unsplash.com/random/50x50",
    comments: 20,
  },
  {
    id: 7,
    author: "Yudi",
    memeUrl: "https://source.unsplash.com/random/",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    avatar: "https://source.unsplash.com/random/50x50",
    comments: 20,
  },
  {
    id: 8,
    author: "DunkerJeJeNiño",
    memeUrl: "https://source.unsplash.com/random/",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    avatar: "https://source.unsplash.com/random/50x50",
    comments: 20,
  },
  {
    id: 9,
    author: "DunkerJeJeNiño",
    memeUrl: "https://source.unsplash.com/random/",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    avatar: "https://source.unsplash.com/random/50x50",
    comments: 20,
  },
  {
    id: 10,
    author: "Alek de Calcinha",
    memeUrl: "https://source.unsplash.com/random/",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    avatar: "https://source.unsplash.com/random/50x50",
    comments: 20,
  },
];

export const comments: CommentProps[] = [
  {
    id: 1,
    author: "Educg550",
    likes: 59,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 2,
    author: "Sapeka",
    likes: 234,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 3,
    author: "Cacamilly",
    likes: 7657,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 4,
    author: "Katinho",
    likes: 34,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 5,
    author: "Rodsfly",
    likes: 14,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 6,
    author: "Dunker JeJe Niño",
    likes: 5643,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 7,
    author: "Alek",
    likes: 675,
    content: "KKKKKKKKK gg dms",
  },
];
