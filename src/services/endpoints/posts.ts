import type { IPost } from "../../types/post";
import api from "../api";

//Получение списка постов с пагинацией.
export const getPosts = async (
  limit: number,
  page: number,
  signal?: AbortSignal,
): Promise<{ posts: IPost[]; total: number }> => {
  const response = await api.get<IPost[]>("/posts", {
    params: { _limit: limit, _page: page },
    signal,
  });

  // JSONPlaceholder возвращает общее количество постов в заголовке x-total-count
  const total = Number(response.headers["x-total-count"]) || 0;

  return { posts: response.data, total };
};

// Получение одного поста по id
export const getPost = async (id: number | string, signal?: AbortSignal): Promise<IPost> => {
  const response = await api.get<IPost>(`/posts/${id}`, { signal });
  return response.data;
};
