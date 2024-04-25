import React from "react"
import { Container } from "react-bootstrap"
<style>
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
</style>

const Parallax = () => {
	return (
		<div className="parallax ">
			<Container className="text-center px-3 py-2 justify-content-center">
				<div className="animated-texts bounceIn">
					
                <h3 style={{ fontSize: "25px", color: "#e8e8e8",         fontFamily: "Libre Baskerville",
}}>
Discover exciting puzzles and adventures, perfect for team building, family activities, or an unforgettable birthday celebration. Our Live Escape Games provide you with unique challenges that put your logical thinking, teamwork, and detective skills to the test.</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax