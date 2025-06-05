
import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { HelmetProvider } from "react-helmet-async";
import { Modal } from "../components/ui/Modal/index.jsx";
import { useModal } from "../hooks/useModal.js";
import { addMeal, getAllMeals, deleteMeal, updateMeal } from "../api/mealApi";

export const AppWrapper = ({ children }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");
  const [notes, setNotes] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const calendarRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal();

  const mealTypes = {
    Breakfast: "breakfast",
    Lunch: "lunch",
    Dinner: "dinner",
    Snack: "snack",
  };

  // Fetch meals from API
  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllMeals();
      
      if (response.data.success) {
        const mealsData = response.data.data;
        
        // Transform API data to FullCalendar events format
        const calendarEvents = mealsData.map((meal) => ({
          id: meal._id,
          title: meal.name,
          start: meal.date.split('T')[0], // Extract date part only
          allDay: true,
          extendedProps: {
            mealType: meal.type,
            ingredients: meal.ingredients,
            calories: meal.calories.toString(),
            protein: meal.protein,
            carbs: meal.carbs,
            fats: meal.fats,
            notes: meal.notes,
          },
        }));
        
        setEvents(calendarEvents);
      } else {
        setError("Failed to fetch meals");
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
      setError("Failed to load meals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load meals on component mount
  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDateSelect = (selectInfo) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event;
    setSelectedEvent(event);
    setMealName(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    setMealType(event.extendedProps.mealType || "");
    setIngredients(event.extendedProps.ingredients || "");
    setCalories(event.extendedProps.calories || "");
    setProtein(event.extendedProps.protein || "");
    setCarbs(event.extendedProps.carbs || "");
    setFats(event.extendedProps.fats || "");
    setNotes(event.extendedProps.notes || "");
    openModal();
  };

  const handleAddOrUpdateEvent = async () => {
    const mealPayload = {
      name: mealName,
      date: eventStartDate,
      type: mealType,
      ingredients,
      calories: parseInt(calories) || 0,
      protein,
      carbs,
      fats,
      notes,
    };

    try {
      if (selectedEvent) {
        // Update existing meal via API
        const response = await updateMeal(selectedEvent.id, mealPayload);
        
        if (response.data.success) {
          const updatedMeal = response.data.data;
          
          // Update the event in local state
          setEvents((prev) =>
            prev.map((event) =>
              event.id === selectedEvent.id
                ? {
                  ...event,
                  title: updatedMeal.name,
                  start: updatedMeal.date.split('T')[0],
                  extendedProps: {
                    mealType: updatedMeal.type,
                    ingredients: updatedMeal.ingredients,
                    calories: updatedMeal.calories.toString(),
                    protein: updatedMeal.protein,
                    carbs: updatedMeal.carbs,
                    fats: updatedMeal.fats,
                    notes: updatedMeal.notes,
                  },
                }
                : event
            )
          );
        } else {
          setError("Failed to update meal. Please try again.");
          return;
        }
      } else {
        // Add new meal
        const response = await addMeal(mealPayload);
        
        if (response.data.success) {
          const newMeal = response.data.data;
          
          const newEvent = {
            id: newMeal._id,
            title: newMeal.name,
            start: newMeal.date.split('T')[0],
            allDay: true,
            extendedProps: {
              mealType: newMeal.type,
              ingredients: newMeal.ingredients,
              calories: newMeal.calories.toString(),
              protein: newMeal.protein,
              carbs: newMeal.carbs,
              fats: newMeal.fats,
              notes: newMeal.notes,
            },
          };

          setEvents((prev) => [...prev, newEvent]);
        } else {
          setError("Failed to add meal. Please try again.");
          return;
        }
      }

      closeModal();
      resetModalFields();
    } catch (error) {
      console.error("Failed to add/update meal", error);
      setError("Failed to save meal. Please try again.");
    }
  };

  const handleDeleteMeal = async () => {
    if (!selectedEvent) return;

    try {
      const response = await deleteMeal(selectedEvent.id);
      
      if (response.data.success) {
        // Remove the meal from local state
        setEvents((prev) =>
          prev.filter((event) => event.id !== selectedEvent.id)
        );
        
        closeModal();
        resetModalFields();
      } else {
        setError("Failed to delete meal. Please try again.");
      }
    } catch (error) {
      console.error("Failed to delete meal", error);
      setError("Failed to delete meal. Please try again.");
    }
  };

  const resetModalFields = () => {
    setMealName("");
    setMealType("");
    setIngredients("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFats("");
    setNotes("");
    setEventStartDate("");
    setEventEndDate("");
    setSelectedEvent(null);
  };

  const renderEventContent = (eventInfo) => {
    const mealType = eventInfo.event.extendedProps.mealType;
    const mealTitle = eventInfo.event.title;
    
    const getMealTypeColor = (type) => {
      switch(type?.toLowerCase()) {
        case 'breakfast': return 'bg-orange-100 text-orange-700 border-orange-200';
        case 'lunch': return 'bg-green-100 text-green-700 border-green-200';
        case 'dinner': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'snack': return 'bg-purple-100 text-purple-700 border-purple-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
      }
    };

    return (
      <div className="event-fc-color fc-event-main p-2 rounded-sm overflow-hidden">
        <div className="flex items-center justify-between gap-1 mb-1">
          <div className="fc-event-time text-xs opacity-75">{eventInfo.timeText}</div>
          {mealType && (
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border ${getMealTypeColor(mealType)} whitespace-nowrap`}>
              {mealType}
            </span>
          )}
        </div>
        <div className="fc-event-title font-medium text-sm leading-tight">
          {mealTitle}
        </div>
        {eventInfo.event.extendedProps.calories && (
          <div className="text-xs text-gray-600 mt-1">
            {eventInfo.event.extendedProps.calories} cal
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading meals...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">{error}</div>
          <button 
            onClick={fetchMeals}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next addEventButton",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            customButtons={{
              addEventButton: {
                text: "Add Meal +",
                click: openModal,
              },
            }}
          />
        </div>

        {/* ✅ Full Modal Meal Form */}
        <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] p-6 lg:p-10">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {selectedEvent ? "Edit Meal" : "Add Meal"}
            </h2>

            <input
              type="text"
              placeholder="Meal Name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="w-full border rounded p-2"
            />

            <div className="flex gap-4 flex-wrap">
              {Object.entries(mealTypes).map(([label, value]) => (
                <label key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="mealType"
                    value={label}
                    checked={mealType === label}
                    onChange={() => setMealType(label)}
                  />
                  {label}
                </label>
              ))}
            </div>

            <textarea
              placeholder="Ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full border rounded p-2"
              rows={2}
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <input
                placeholder="Calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="border rounded p-2"
              />
              <input
                placeholder="Protein"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="border rounded p-2"
              />
              <input
                placeholder="Carbs"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="border rounded p-2"
              />
              <input
                placeholder="Fats"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                className="border rounded p-2"
              />
            </div>

            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded p-2"
              rows={2}
            />

            <input
              type="date"
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
              className="w-full border rounded p-2"
            />

            <div className="flex gap-3 justify-end pt-4">
              {selectedEvent && (
                <button
                  onClick={handleDeleteMeal}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              )}
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateEvent}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                {selectedEvent ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Calendar;