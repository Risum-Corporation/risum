export interface PostProps {
  id: number;
  authorId?: string;
  memeUrl: string;
  likes: number;
  memeTitle: string;
  tags?: string[];
  comments: number;
  isVideo: boolean;
}

export interface CommentProps {
  id: number;
  authorId: string;
  likes: number;
  content: string;
}

export const fakePosts: PostProps[] = [
  {
    id: 1,
    authorId: "3bmAqEjKVANQH4UX97qbCasNwS33",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 43,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "comedia"],
    comments: 17,
    isVideo: false,
  },
  {
    id: 2,
    authorId: "3bmAqEjKVANQH4UX97qbCasNwS33",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "memeskk", "hurdur"],
    comments: 20,
    isVideo: false,
  },
  {
    id: 3,
    authorId: "CAke6oHbjVWKeL1o5zwnwpqVI4F2",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
    isVideo: false,
  },
  {
    id: 4,
    authorId: "CAke6oHbjVWKeL1o5zwnwpqVI4F2",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
    isVideo: false,
  },
  {
    id: 5,
    authorId: "Dh0qh7nvsZYsYOuPnluj6ygP6pr1",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,

    isVideo: false,
  },
  {
    id: 6,
    authorId: "Dh0qh7nvsZYsYOuPnluj6ygP6pr1",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
    isVideo: false,
  },
  {
    id: 7,
    authorId: "3bmAqEjKVANQH4UX97qbCasNwS33",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
    isVideo: false,
  },
  {
    id: 8,
    authorId: "3bmAqEjKVANQH4UX97qbCasNwS33",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
    isVideo: false,
  },
  {
    id: 9,
    authorId: "CAke6oHbjVWKeL1o5zwnwpqVI4F2",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
    isVideo: false,
  },
  {
    id: 10,
    authorId: "Dh0qh7nvsZYsYOuPnluj6ygP6pr1",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
    isVideo: false,
  },
];

export const comments: CommentProps[] = [
  {
    id: 1,
    authorId: "Educg550",
    likes: 59,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 2,
    authorId: "Sapeka",
    likes: 234,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 3,
    authorId: "Cacamilly",
    likes: 7657,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 4,
    authorId: "Katinho",
    likes: 34,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 5,
    authorId: "Rodsfly",
    likes: 14,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 6,
    authorId: "Dunker JeJe Niño",
    likes: 5643,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: 7,
    authorId: "Alek",
    likes: 675,
    content: "KKKKKKKKK gg dms",
  },
];
