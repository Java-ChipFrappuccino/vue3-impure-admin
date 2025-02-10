const url = import.meta.env.VITE_DB_BASE_URL;

import { getAllPosts } from "@/api/posts.ts";

export const getUnReadNotifications = async () => {
  const allPosts = await getAllPosts();
  // 읽지 않은 게시물만 필터링
  return allPosts.filter((post) => !post.isRead);
};
