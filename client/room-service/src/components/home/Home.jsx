import React, { useContext } from "react"
import MainHeader from "../layout/MainHeader"
import RoomCarousel from "../common/RoomCarousel"
import Parallax from "../common/Parallax"
import Info from "../common/Info"

const Home = () => {
	
	return (
		<section>
			
			<MainHeader />
			<div className="container">
				<Parallax />
				<RoomCarousel />
			</div>
		</section>
	)
}

export default Home