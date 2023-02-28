import React, { useEffect } from "react";
import "./Home.css";
import Carousel from "react-material-ui-carousel";
import bg2 from "../../Assets/background.webp";
import bg5 from "../../Assets/background2.jpeg";
import bg from "../../Assets/background3.jpeg";
import bg4 from "../../Assets/background4.webp";
import bg3 from "../../Assets/background5.webp";
import ProductCard from "../Products/ProductCard";
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Header from "./Header";
import MetaData from "../../more/Metadata";
import Footer from "../../Footer";
import BottomTab from "../../more/BottomTab";
import Loading from "../../more/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error])

  return (
    <>
      {loading ? (
        <Loading />
      )
        : (
          <>
            <MetaData title="Home" />
            <Header />
            {/* Carousel */}
            <div className="banner">
              <Carousel>
                <img src={bg} className="bgImg" />
                <img src={bg2} className="bgImg" />
                <img src={bg3} className="bgImg" />
                <img src={bg4} className="bgImg" />
                <img src={bg5} className="bgImg" />
              </Carousel>
              <div className="home__content">
                <div style={{
                  display: "flex",
                  alignItems: "center",
                }}>

                  {/* <a href="#container">
                 <button type="submit"
                 className="button"
                 >SHOP NOW</button>
                 </a> */}
                </div>
              </div>
            </div>


            <h2 className="homeHeading">Featured Products</h2>
            <div className="container" id="container">
              {products && products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <h2 className="homeHeading">Trending</h2>
            <div className="container" id="container">
              {
                products && [...products].sort((a, b) => b.rating - a.rating).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))

              }

            </div>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <h2 className="homeHeading">New Arrival</h2>
            <div className="container" id="container">
              {products && products.slice().reverse().map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Footer />
            <BottomTab />
          </>
        )}
    </>
  );
};

export default Home;
