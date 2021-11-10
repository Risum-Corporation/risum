export interface PostProps {
  id: string;
  authorId?: string;
  memeUrl: string;
  likes: number;
  memeTitle: string;
  tags?: string[];
  comments: number;
  isVideo: boolean;
}

export interface CommentProps {
  id: string;
  authorId: string;
  likes: number;
  content: string;
}

export const comments: CommentProps[] = [
  {
    id: "1",
    authorId: "Educg550",
    likes: 59,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: "2",
    authorId: "Sapeka",
    likes: 234,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: "3",
    authorId: "Cacamilly",
    likes: 7657,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: "4",
    authorId: "Katinho",
    likes: 34,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: "5",
    authorId: "Rodsfly",
    likes: 14,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: "6",
    authorId: "Dunker JeJe Niño",
    likes: 5643,
    content: "KKKKKKKKK gg dms",
  },
  {
    id: "7",
    authorId: "Alek",
    likes: 675,
    content: "KKKKKKKKK gg dms",
  },
];
