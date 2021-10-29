export interface PostProps {
  id: number;
  authorId?: string;
  memeUrl: string;
  likes: number;
  memeTitle: string;
  tags?: string[];
  comments: number;
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
    memeUrl:
      "https://firebasestorage.googleapis.com/v0/b/risum-b1687.appspot.com/o/media%2Fmemes%2F3bmAqEjKVANQH4UX97qbCasNwS33%2FAbelardo%20-%20Ernesto?alt=media&token=8213c272-76d7-4d27-85f7-6417f8ee40da",
    likes: 43,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "comedia"],
    comments: 17,
  },
  {
    id: 2,
    authorId: "3bmAqEjKVANQH4UX97qbCasNwS33",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "memeskk", "hurdur"],
    comments: 20,
  },
  {
    id: 3,
    authorId: "CAke6oHbjVWKeL1o5zwnwpqVI4F2",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
  },
  {
    id: 4,
    authorId: "CAke6oHbjVWKeL1o5zwnwpqVI4F2",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
  },
  {
    id: 5,
    authorId: "Dh0qh7nvsZYsYOuPnluj6ygP6pr1",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
  },
  {
    id: 6,
    authorId: "Dh0qh7nvsZYsYOuPnluj6ygP6pr1",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
  },
  {
    id: 7,
    authorId: "3bmAqEjKVANQH4UX97qbCasNwS33",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
  },
  {
    id: 8,
    authorId: "3bmAqEjKVANQH4UX97qbCasNwS33",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
  },
  {
    id: 9,
    authorId: "CAke6oHbjVWKeL1o5zwnwpqVI4F2",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
  },
  {
    id: 10,
    authorId: "Dh0qh7nvsZYsYOuPnluj6ygP6pr1",
    memeUrl: "https://thispersondoesnotexist.com/image",
    likes: 1223,
    memeTitle: "Tio patinhas 👃",
    tags: ["shipost", "ggboy", "cringe"],
    comments: 20,
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
