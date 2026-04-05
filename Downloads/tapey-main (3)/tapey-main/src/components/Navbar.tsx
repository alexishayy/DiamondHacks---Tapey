import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Start", path: "/start" },
  { label: "More Info", path: "/more-info" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav style={{backgroundColor: 'hsl(var(--navbar))' }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-1 md:px-2 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-2xl font-bold tracking-wide text-foreground">
          TAPEY
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`text-xs tracking-[0.2em] uppercase font-body transition-colors ${
                location.pathname === item.path
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block text-xs tracking-[0.2em] uppercase font-body ${
                location.pathname === item.path ? "text-foreground font-semibold" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
