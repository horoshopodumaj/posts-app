import { getPost } from "../../services/endpoints/posts";
import styles from "./PostDetails.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Loader from "../../components/Loader/Loader";

import type { IPost } from "../../types/post";

const PostDetails = () => {
  // id берём из URL: /posts/:id
  const { id } = useParams<{ id: string }>();

  const location = useLocation();
  // Берём сохранённый путь или падаем на "/" по умолчанию
  const backTo = (location.state as { from?: string })?.from ?? "/";

  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загружаем пост при монтировании или изменении id
  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPost(id, controller.signal);
        setPost(data);
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError("Пост не найден");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchPost();

    return () => controller.abort();
  }, [id]);

  return (
    <div className={styles.container}>
      <Link to={backTo} className={styles.back}>
        ← Назад к списку
      </Link>

      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}

      {post && !loading && (
        <article className={styles.article}>
          <span className={styles.meta}>Пост #{post.id}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.body}>{post.body}</p>
        </article>
      )}
    </div>
  );
};

export default PostDetails;
