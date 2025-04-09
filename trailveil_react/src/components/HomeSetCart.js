import React from "react"
import "./HomeSetCart.css"

const HomeSetCart = () => {
	return (
		<div className="set-cart-container">
			<div className="slider-showing-text" style={{position: 'absolute', top: "-100px", width: "100%", zIndex: '2'}}>
        		<h1 className="mountain-title">Multipreview is when the image speaks instead of the catalog.</h1>
		        <p className="mountain-paragraph">
		          You’re not just seeing a jacket — you’re seeing how it lives in the look.
				  How the fabric moves, how the colors connect, how the light falls.
		        </p>
	    	</div>
	    	<div className="set-cart-img-containder">
	    	<img src="/media/set_carts1.png" className="set-cart-img"/>
	    	</div>
		</div>
	);
}

export default HomeSetCart;