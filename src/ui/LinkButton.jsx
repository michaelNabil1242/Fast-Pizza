import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const className = "text-sm text-blue-400 hover:text-blue-500 hover:underline";
  const navigate = useNavigate();
  if (to === -1)
    return (
      <button className={className} onClick={() => navigate(to)}>
        {children}
      </button>
    );
  return (
    <Link className={className} to={to}>
      {children}
    </Link>
  );
}

export default LinkButton;
