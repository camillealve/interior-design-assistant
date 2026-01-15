import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ marginRight: '16px' }}>Home</Link>
      <Link to="/results" style={{ marginRight: '16px' }}>Results</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
  );
}

export default Header;
