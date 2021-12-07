export interface PostProps {
  id: string;
  authorId: string;
  memeUrl: string;
  likes: number;
  memeTitle: string;
  tags?: string[];
  comments: number;
  isVideo: boolean;
}

export interface ReducedPostProps {
  id: string;
  authorId: string;
  memeUrl: string;
  likes: number;
  comments: number;
  isVideo: boolean;
}

export interface CommentProps {
  id: string;
  memeId: string;
  authorId: string;
  likes: number;
  content: string;
}

export interface HyenaClanProps {
  id: string;
  name: string; // Nome da alcateia
  shield?: string | null; // Foto da alcateia
  cover?: string | null; // Wallpaper de fundo da alcateia
  members: string[]; // Array com os IDs de todos os membros
}
