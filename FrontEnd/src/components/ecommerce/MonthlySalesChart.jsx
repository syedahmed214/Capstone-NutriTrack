import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getAllMeals } from "../../api/mealApi";

export default function MonthlyMealsChart() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    totalMeals: [],
    totalCalories: [],
    mealsByType: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: []
    }
  });
  const [activeView, setActiveView] = useState('meals'); 

  useEffect(() => {
    fetchMealsData();
  }, []);

  const fetchMealsData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllMeals();
      
      if (response.data.success) {
        const meals = response.data.data;
        processMonthlyData(meals);
      }
    } catch (error) {
      console.error("Error fetching meals data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processMonthlyData = (meals) => {
    const monthlyData = Array(12).fill(0).map(() => ({
      totalMeals: 0,
      totalCalories: 0,
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0
    }));

    meals.forEach(meal => {
      const month = new Date(meal.date).getMonth();
      monthlyData[month].totalMeals += 1;
      monthlyData[month].totalCalories += meal.calories || 0;
      
      const mealType = meal.type.toLowerCase();
      if (monthlyData[month][mealType] !== undefined) {
        monthlyData[month][mealType] += 1;
      }
    });

    setChartData({
      totalMeals: monthlyData.map(m => m.totalMeals),
      totalCalories: monthlyData.map(m => m.totalCalories),
      mealsByType: {
        breakfast: monthlyData.map(m => m.breakfast),
        lunch: monthlyData.map(m => m.lunch),
        dinner: monthlyData.map(m => m.dinner),
        snack: monthlyData.map(m => m.snack)
      }
    });
  };

  const getChartConfig = () => {
    const baseOptions = {
      chart: {
        fontFamily: "Outfit, sans-serif",
        type: "bar",
        height: 180,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: activeView === 'breakdown' ? "60%" : "39%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        width: 4,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      legend: {
        show: activeView === 'breakdown',
        position: "top",
        horizontalAlign: "left",
        fontFamily: "Outfit",
      },
      yaxis: { 
        title: { text: undefined },
        labels: {
          formatter: (val) => Math.round(val).toString()
        }
      },
      grid: {
        yaxis: {
          lines: { show: true },
        },
      },
      fill: { opacity: 1 },
      tooltip: {
        x: { show: false },
        y: {
          formatter: (val) => activeView === 'calories' ? `${val} cal` : `${val} meals`,
        },
      },
    };

    switch (activeView) {
      case 'meals':
        return {
          ...baseOptions,
          colors: ["#465fff"],
          series: [{
            name: "Total Meals",
            data: chartData.totalMeals,
          }]
        };
      
      case 'calories':
        return {
          ...baseOptions,
          colors: ["#ff6b6b"],
          series: [{
            name: "Total Calories",
            data: chartData.totalCalories,
          }]
        };
      
      case 'breakdown':
        return {
          ...baseOptions,
          colors: ["#ff9500", "#22c55e", "#3b82f6", "#a855f7"],
          series: [
            { name: "Breakfast", data: chartData.mealsByType.breakfast },
            { name: "Lunch", data: chartData.mealsByType.lunch },
            { name: "Dinner", data: chartData.mealsByType.dinner },
            { name: "Snack", data: chartData.mealsByType.snack },
          ]
        };
      
      default:
        return baseOptions;
    }
  };

  const getTotalStats = () => {
    const totalMeals = chartData.totalMeals.reduce((sum, val) => sum + val, 0);
    const totalCalories = chartData.totalCalories.reduce((sum, val) => sum + val, 0);
    const avgCaloriesPerMeal = totalMeals > 0 ? Math.round(totalCalories / totalMeals) : 0;
    
    return { totalMeals, totalCalories, avgCaloriesPerMeal };
  };

  const { totalMeals, totalCalories, avgCaloriesPerMeal } = getTotalStats();
  const config = getChartConfig();

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex items-center justify-center h-48">
          <div className="text-gray-500">Loading meals data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-y-3.5 md:flex md:flex-row items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Monthly Meals Overview
          </h3>
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1 ">
            <span>{totalMeals} total meals</span>
            <span>{totalCalories.toLocaleString()} total calories</span>
            <span>{avgCaloriesPerMeal} avg cal/meal</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('meals')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              activeView === 'meals' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            Meals
          </button>
          <button
            onClick={() => setActiveView('calories')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              activeView === 'calories' 
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            Calories
          </button>
          <button
            onClick={() => setActiveView('breakdown')}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              activeView === 'breakdown' 
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            }`}
          >
            Breakdown
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          <Chart 
            options={config} 
            series={config.series} 
            type="bar" 
            height={180} 
          />
        </div>
      </div>
    </div>
  );
}