import { getPosts } from "../../services/endpoints/posts";
import styles from "./Posts.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
import PostCard from "../../components/PostCard/PostCard";
import SelectLimit from "../../components/SelectLimit/SelectLimit";

import type { IPost } from "../../types/post";

const Posts = () => {
  // Храним page и limit в query-параметрах — так состояние сохраняется при перезагрузке
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const [posts, setPosts] = useState<IPost[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загружаем посты при изменении page/limit
  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { posts, total } = await getPosts(limit, page, controller.signal);
        setPosts(posts);
        setTotal(total);
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError("Не удалось загрузить посты");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchPosts();

    // Отменяем запрос при смене page/limit или размонтировании
    return () => controller.abort();
  }, [page, limit]);

  // Всего страниц = округление вверх (total / limit)
  const totalPages = Math.ceil(total / limit);

  // Смена страницы — обновляем query-параметры
  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage), limit: String(limit) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Смена лимита — всегда сбрасываемся на первую страницу
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ page: "1", limit: e.target.value });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Список постов</h1>
        <SelectLimit limit={limit} handleLimitChange={handleLimitChange} />
      </header>

      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <div className={styles.grid}>
            {posts.map(post => (
              <PostCard key={post.id} post={post} search={searchParams.toString()} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default Posts;
