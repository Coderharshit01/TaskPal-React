import { Link, useLocation } from "react-router-dom";

export default function SideBar({ isLightTheme }) {
  // Get the current URL path (like "/tasks", "/ai", etc.)
  const location = useLocation();

  // Define all the sidebar links in one place
  const links = [
    { to: "/", label: "Dashboard", icon: "📊" },
    { to: "/tasks", label: "Tasks", icon: "✅" },
    { to: "/pomodoro", label: "Pomodoro Timer", icon: "⏱️" },
    { to: "/ai", label: "AI Assistant", icon: "🤖" },
    { to: "/settings", label: "Settings", icon: "⚙️" }
  ];

  return (
    // Sidebar container with theme-aware background and text
    <aside
      className={`flex-col flex py-6 px-4 gap-4 w-64 ${
        isLightTheme ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
      }`}
    >
      {/* Loop through each link and render it */}
      {links.map(({ to, label, icon }) => {
        // Check if the current link is the active route
        const isActive = location.pathname === to;

        return (
          <Link
            key={to} // Required for list rendering
            to={to}  // Destination path for navigation
            className={`
              text-lg font-medium rounded-md text-center py-3 transition-colors
              ${isLightTheme
                ? isActive
                  ? "bg-blue-300"        // Light theme active style
                  : "bg-gray-100 hover:bg-blue-100"  // Light theme hover style
                : isActive
                ? "bg-blue-600"         // Dark theme active style
                : "bg-gray-700 hover:bg-blue-700"  // Dark theme hover style
              }
            `}
          >
            {/* Show icon and label like: 📊 Dashboard */}
            {icon} {label}
          </Link>
        );
      })}
    </aside>
  );
}
