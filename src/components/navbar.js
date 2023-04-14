import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/">
          <p className="logo">My App</p>
        </Link>
        <div className="nav-buttons">
          <Link href="/formPage">
            <p className="nav-button">Form</p>
          </Link>
          <Link href="/questionsPage">
            <p className="nav-button">Questions</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
