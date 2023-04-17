import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/">
          <p className="logo">JobH</p>
        </Link>
        <div className="nav-buttons">
          <Link href="/formPage">
            <button className="nav-button">Cover Letter Helper</button>
          </Link>
          <Link href="/questionsPage">
            <button className="nav-button">Interview Prep Questions Helper</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
