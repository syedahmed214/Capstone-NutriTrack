import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table/index.jsx";
import Badge from "../ui/badge/Badge.jsx";
import { getAllMeals } from "../../api/mealApi"; 
export default function MealsTable() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMealsData();
  }, []);

  const fetchMealsData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllMeals();
      
      if (response.data.success) {
        const mealsData = response.data.data;
        setMeals(mealsData);
      }
    } catch (error) {
      console.error("Error fetching meals data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Memoized meal type badge color mapping for performance
  const getBadgeColor = useMemo(() => {
    const colorMap = {
      "Breakfast": "success",
      "Lunch": "warning", 
      "Dinner": "error",
      "Snack": "info"
    };
    return (type) => colorMap[type] || "default";
  }, []);

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Memoized processed meals data to avoid recalculation on re-renders
  const processedMeals = useMemo(() => {
    return meals.map(meal => ({
      ...meal,
      formattedDate: formatDate(meal.date),
      badgeColor: getBadgeColor(meal.type)
    }));
  }, [meals, getBadgeColor]);

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500 dark:text-gray-400">Loading meals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                Meal Details
              </TableCell>
              <TableCell className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                Type
              </TableCell>
              <TableCell className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                Nutrition
              </TableCell>
              <TableCell className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                Date
              </TableCell>
              <TableCell className="py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400">
                Calories
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {processedMeals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No meals found
                </TableCell>
              </TableRow>
            ) : (
              processedMeals.map((meal) => (
                <TableRow key={meal._id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-[50px] w-[50px] overflow-hidden rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {meal.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90 line-clamp-1">
                          {meal.name}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {meal.ingredients}
                        </span>
                        {meal.notes && (
                          <span className="text-xs text-gray-400 dark:text-gray-500 italic line-clamp-1">
                            {meal.notes}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge
                      size="sm"
                      color={meal.badgeColor}
                    >
                      {meal.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="space-y-1">
                      <div className="flex gap-2 text-xs">
                        <span>P: {meal.protein}</span>
                        <span>C: {meal.carbs}</span>
                        <span>F: {meal.fats}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-gray-500 dark:text-gray-400">
                    {meal.formattedDate}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {meal.calories}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        kcal
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}