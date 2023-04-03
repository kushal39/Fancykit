import { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import {Link} from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
    // eslint-disable-next-line
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../more/Metadata.js";
import Loading from "../../more/Loader.js";
import { getAdminProduct } from "../../actions/ProductActions.js";
import { getAllOrders } from "../../actions/OrderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

const Dashboard = () => {

  const dispatch = useDispatch();

  const { products,loading } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.AllOrders);

  const { users } = useSelector((state) => state.allUsers);

   let outOfStock = 0;
     
   products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
      }, [dispatch]);    

    let totalAmount = 0;
      orders &&
        orders.forEach((item) => {
          totalAmount += item.totalPrice;
        });

    const lineState = {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
      datasets: [
          {
            label: "TOTAL AMOUNT EARNED DAILY",
            backgroundColor: ["#3BB77E"],
            hoverBackgroundColor: ["#3BB77E"],
            data: [0,1000,500,3000,3500,5000,6000, totalAmount],
          },
        ],
      };

      const lineState1 = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
              label: "TOTAL AMOUNT EARNED WEEKLY",
              backgroundColor: ["#3BB77E"],
              hoverBackgroundColor: ["#3BB77E"],
              data: [0,7000,30000,25000, totalAmount],
            },
          ],
        };

        const lineState3 = {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [
              {
                label: "TOTAL AMOUNT EARNED MONTHLY",
                backgroundColor: ["#3BB77E"],
                hoverBackgroundColor: ["#3BB77E"],
                data: [0,30000,40000,30000,12000,35000,17000,18000,50000,20000,36000,23000, totalAmount],
              },
            ],
          };

     const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

    return (
       <>
       {loading ?
       <Loading />
       :(
        <div className="dashboard">
        <MetaData title="Dashboard" />
        <Sidebar />
  
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
  
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
  
          <div className="lineChart">
            
            <Line data={lineState} />
          </div>

          <div className="lineChart">
            <Line data={lineState1} />
          </div>

          <div className="lineChart">
            <Line data={lineState3} />
          </div>

  
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
       )
       }
       </>
    );
  };
export default Dashboard
