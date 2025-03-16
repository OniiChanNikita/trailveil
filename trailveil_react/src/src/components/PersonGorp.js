import React from 'react';

const ProductGrid = () => {
	const handleNavigation = (url) => {
    window.location.href = url;
  };

  return (
      <div className="container">
        <div className="image-container">
          <img
            src="/media/person_gorpcore.png"
            alt="Person"
            className="person"
          />

          {/* Lines and Prices */}
          <div
            className="point"
            style={{
              position: 'absolute',
              width: '7px',
              height: '7px',
              backgroundColor: '#d0d0d0',
              transformOrigin: 'top',
              top: '207px',
              left: '485px',
              pointerEvents: 'none',
            }}
          ></div>
          <div
            className="line"
            style={{
              position: 'absolute',
              width: '2px',
              height: '250px',
              backgroundColor: '#d0d0d0',
              transformOrigin: 'top',
              top: '210px',
              left: '485px',
              transform: 'rotate(-80deg)',
              pointerEvents: 'none',
            }}
          ></div>
          <div
            className="price"
            style={{
              position: 'absolute',
              fontSize: '14px',
              cursor: 'pointer',
              top: '253px',
              left: '730px',
              color: '#d0d0d0',
              transition: 'color 0.3s ease, background-color 0.3s ease',
            }}
            onClick={() => handleNavigation('https://example.com/product1')}
          >
            $120
          </div>

          <div
            className="point"
            style={{
              position: 'absolute',
              width: '7px',
              height: '7px',
              backgroundColor: '#d0d0d0',
              transformOrigin: 'top',
              top: '674px',
              left: '265px',
              pointerEvents: 'none',
            }}
          ></div>

          <div
            className="point"
            style={{
              position: 'absolute',
              width: '7px',
              height: '7px',
              backgroundColor: '#d0d0d0',
              transformOrigin: 'top',
              top: '663px',
              left: '400px',
              pointerEvents: 'none',
            }}
          ></div>

          <div
            className="line"
            style={{
              position: 'absolute',
              width: '2px',
              height: '180px',
              backgroundColor: '#d0d0d0',
              transformOrigin: 'top',
              top: '550px',
              left: '540px',
              transform: 'rotate(50deg)',
              pointerEvents: 'none',
            }}
          ></div>
          <div
            className="line"
            style={{
              position: 'absolute',
              width: '2px',
              height: '300px',
              backgroundColor: '#d0d0d0',
              transformOrigin: 'top',
              top: '550px',
              left: '540px',
              transform: 'rotate(65deg)',
              pointerEvents: 'none',
            }}
          ></div>
          <div
            className="price"
            style={{
              position: 'absolute',
              fontSize: '14px',
              cursor: 'pointer',
              top: '500px',
              left: '540px',
              color: '#d0d0d0',
              transition: 'color 0.3s ease, background-color 0.3s ease',
            }}
            onClick={() => handleNavigation('https://example.com/product2')}
          >
            $80
          </div>

          <div
            className="point"
            style={{
              position: 'absolute',
              width: '7px',
              height: '7px',
              backgroundColor: '#d0d0d0',
              transformOrigin: 'top',
              top: '467px',
              left: '403px',
              pointerEvents: 'none',
            }}
          ></div>

          <div
            className="line"
            style={{
              position: 'absolute',
              width: '2px',
              height: '250px',
              backgroundColor: '#d0d0d0',
              transformOrigin: 'top',
              top: '470px',
              left: '405px',
              transform: 'rotate(-100deg)',
              pointerEvents: 'none',
            }}
          ></div>
          <div
            className="price"
            style={{
              position: 'absolute',
              fontSize: '14px',
              cursor: 'pointer',
              top: '400px',
              left: '650px',
              color: '#d0d0d0',
              transition: 'color 0.3s ease, background-color 0.3s ease',
            }}
            onClick={() => handleNavigation('https://example.com/product3')}
          >
            $150
          </div>
        </div>
      </div>
  );
};

export default ProductGrid