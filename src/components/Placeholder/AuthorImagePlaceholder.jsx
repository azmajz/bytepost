import { AiOutlineUser } from "react-icons/ai";
import './AuthorImagePlaceholder.css';

export default function AuthorImagePlaceholder({ className = '' }) {
  return (
    <div className={`author-placeholder ${className}`}>
      <div className="author-icon">
        <AiOutlineUser size={32} />
      </div>
    </div>
  );
} 