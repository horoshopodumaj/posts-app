import styles from "./PostCard.module.css";
import { Link } from "react-router-dom";

import type { IPost } from "../../types/post";

interface IPostCardProps {
  post: IPost;
  search?: string;
}
const PostCard = ({ post, search }: IPostCardProps) => {
  return (
    <Link to={`/posts/${post.id}`} className={styles.card} state={{ from: `/?${search}` }}>
      <span className={styles.id}>#{post.id}</span>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.body}>{post.body}</p>
    </Link>
  );
};

export default PostCard;
