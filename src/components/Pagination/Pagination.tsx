import styles from "./Pagination.module.css";

interface IPaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onChange }: IPaginationProps) => {
  if (totalPages <= 1) return null;

  // Формируем массив элементов пагинации
  const buildPages = (): (number | "...")[] => {
    const delta = 2; // сколько страниц показывать вокруг текущей
    const range: (number | "...")[] = [];
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    range.push(1);
    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) range.push(i);

    if (right < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  return (
    <nav className={styles.pagination}>
      <button className={styles.btn} disabled={page === 1} onClick={() => onChange(page - 1)}>
        ←
      </button>

      {buildPages().map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className={styles.dots}>
            …
          </span>
        ) : (
          <button key={p} className={`${styles.btn} ${p === page ? styles.active : ""}`} onClick={() => onChange(p)}>
            {p}
          </button>
        ),
      )}

      <button className={styles.btn} disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        →
      </button>
    </nav>
  );
};

export default Pagination;
