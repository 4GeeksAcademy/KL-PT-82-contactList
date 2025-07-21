import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
			<div className="container">
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>

				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav me-auto">
						<NavLink
							to="/"
							end
							className={({ isActive }) =>
								"nav-link" + (isActive ? " active" : "")
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/contacts"
							className={({ isActive }) =>
								"nav-link" + (isActive ? " active" : "")
							}
						>
							Contacts
						</NavLink>
						<NavLink
							to="/add"
							className={({ isActive }) =>
								"nav-link" + (isActive ? " active" : "")
							}
						>
							Add Contact
						</NavLink>
					</div>
				</div>
			</div>
		</nav>
	);
};
