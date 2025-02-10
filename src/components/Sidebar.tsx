
import { Home, Search, Library, ListMusic } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="glass-effect w-64 h-screen fixed left-0 top-0 p-6 flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-music-primary rounded-full" />
        <span className="text-xl font-bold">Musiq</span>
      </div>
      
      <nav className="flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-4 text-music-subtext hover:text-music-text transition-colors">
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link to="/search" className="flex items-center gap-4 text-music-subtext hover:text-music-text transition-colors">
          <Search size={24} />
          <span>Search</span>
        </Link>
        <Link to="/library" className="flex items-center gap-4 text-music-subtext hover:text-music-text transition-colors">
          <Library size={24} />
          <span>Your Library</span>
        </Link>
        <Link to="/playlists" className="flex items-center gap-4 text-music-subtext hover:text-music-text transition-colors">
          <ListMusic size={24} />
          <span>Playlists</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
