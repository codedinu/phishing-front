import { Link } from 'react-router-dom';

const Header = () => {
  const user = localStorage.getItem('user');
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Website safety checker</h1>
        <nav>
          <Link to="/" className="mr-4">Home</Link>
          
          {user ? (
            <>
            <Link to="/history" className="mr-4">History</Link>
            <Link to="/login" onClick={() => localStorage.clear()} className="bg-black text-white px-4 py-2 rounded">
              Log Out
            </Link>
            </>
          ) : (
            <Link to="/login" className="bg-black text-white px-4 py-2 rounded">
              Log In
            </Link>
          )}

        </nav>
      </div>
    </header>
  )
}

export default Header;