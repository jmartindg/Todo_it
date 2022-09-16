import { Link } from "react-router-dom";

type NavbarProps = {
  signOut: () => void;
};

const Navbar = ({ signOut }: NavbarProps) => {
  return (
    <header className="bg-white">
      <nav className="container flex items-center justify-between py-3 px-4 md:px-0">
        <p className="font-logo text-xl">Todo_it</p>
        <ul className="flex items-center space-x-5 text-sm">
          <li>
            <Link to="/add-todo" className="font-semibold transition hover:text-indigo-500">
              Add Todo
            </Link>
          </li>
          <li>
            <button
              onClick={signOut}
              className="rounded bg-indigo-600 py-2 px-4 text-sm font-medium text-gray-50 transition hover:bg-indigo-500"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
