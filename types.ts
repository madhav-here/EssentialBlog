
export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string; // Markdown content
  imageUrl: string;
  author: string;
  date: string;
}

export interface GeneratedPostData {
  title: string;
  summary: string;
  content: string; // Markdown content
  imageTheme: string;
}
