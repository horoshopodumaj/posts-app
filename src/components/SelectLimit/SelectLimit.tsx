import { LIMIT_OPTIONS } from "../../consts";
import styles from "./SelectLimit.module.css";

interface ISelectLimitProps {
  limit: number;
  handleLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectLimit = ({ limit, handleLimitChange }: ISelectLimitProps) => {
  return (
    <div className={styles.limitControl}>
      <label htmlFor="limit">Показывать по:</label>
      <select id="limit" value={limit} onChange={handleLimitChange}>
        {LIMIT_OPTIONS.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLimit;
