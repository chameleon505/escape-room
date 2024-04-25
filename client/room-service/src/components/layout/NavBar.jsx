import React, { useContext, useState } from "react"
import { NavLink, Link } from "react-router-dom"
//import Logout from "../auth/Logout"


const NavBar = () => {


	return (
		<nav className="navbar navbar-expand-lg  bg-dark px-5  mt-5 sticky-top">
			<div className="container-fluid">
				<Link to={"/"} className="whitetext navbar-brand">
					Escape Room
				</Link>


				<div className="collapse navbar-collapse" id="navbarScroll">
					<ul className=" navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
						<li className="nav-item">
							<NavLink className="nav-link whitetext" aria-current="page" to={"/browse-all-rooms"}>
								Browse all rooms
							</NavLink>
						</li>

						
					</ul>

					<ul className="d-flex navbar-nav">
						<li className="nav-item">
						<NavLink className="nav-link whitetext" aria-current="page" to={"/admin"}>
									Admin
								</NavLink>
						</li>

						
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default NavBar