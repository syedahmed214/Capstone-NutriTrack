import React from "react";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart.jsx";
import RecentOrders from "../../components/ecommerce/RecentOrders.jsx";

export default function Home() {
  return (
    <div className="w-full">
      <div className="col-span-full space-y-6 xl:col-span-7">
        <MonthlySalesChart />
      </div>

  
      <div className="col-span-12 xl:col-span-7 mt-5.5">
        <RecentOrders />
      </div>
    </div>
  );
}
