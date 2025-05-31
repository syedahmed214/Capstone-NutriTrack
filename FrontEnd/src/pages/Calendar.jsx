import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";


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
  const calendarRef = useRef(null);
  const { isOpen, openModal, closeModal } = useModal();

  const mealTypes = {
    Breakfast: "breakfast",
    Lunch: "lunch", 
    Dinner: "dinner",
    Snack: "snack",
  };

  useEffect(() => {
    // Initialize with some sample meals
    setEvents([
      {
        id: "1",
        title: "Grilled Chicken Salad",
        start: new Date().toISOString().split("T")[0],
        extendedProps: { 
          mealType: "Lunch",
          ingredients: "Chicken breast, lettuce, tomatoes, cucumber",
          calories: "350",
          protein: "35g",
          carbs: "15g", 
          fats: "12g",
          notes: "Healthy and light meal"
        },
      },
      {
        id: "2", 
        title: "Oatmeal with Berries",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        extendedProps: { 
          mealType: "Breakfast",
          ingredients: "Oats, blueberries, strawberries, honey",
          calories: "280",
          protein: "8g",
          carbs: "55g",
          fats: "4g", 
          notes: "High fiber breakfast"
        },
      },
      {
        id: "3",
        title: "Salmon with Rice",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
        extendedProps: { 
          mealType: "Dinner",
          ingredients: "Salmon fillet, brown rice, broccoli",
          calories: "520",
          protein: "40g",
          carbs: "45g",
          fats: "18g",
          notes: "Omega-3 rich dinner"
        },
      },
    ]);
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

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      // Update existing meal
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: mealName,
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: { 
                  mealType: mealType,
                  ingredients: ingredients,
                  calories: calories,
                  protein: protein,
                  carbs: carbs,
                  fats: fats,
                  notes: notes
                },
              }
            : event
        )
      );
    } else {
      // Add new meal
      const newEvent = {
        id: Date.now().toString(),
        title: mealName,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { 
          mealType: mealType,
          ingredients: ingredients,
          calories: calories,
          protein: protein,
          carbs: carbs,
          fats: fats,
          notes: notes
        },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
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
    const mealTypeClass = `fc-bg-${eventInfo.event.extendedProps.mealType?.toLowerCase()}`;
    return (
      <div
        className={`event-fc-color flex fc-event-main ${mealTypeClass} p-1 rounded-sm`}
      >
        <div className="fc-daygrid-event-dot"></div>
        <div className="fc-event-time">{eventInfo.timeText}</div>
        <div className="fc-event-title">{eventInfo.event.title}</div>
        <div className="fc-event-meal-type text-xs opacity-75">
          {eventInfo.event.extendedProps.mealType}
        </div>
      </div>
    );
  };

  return (
    <>
     
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
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
                text: "Add Meal +" ,
                click: openModal,
              },
            }}
          />
        </div>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
            <div>
              <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                {selectedEvent ? "Edit Meal" : "Add Meal"}
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Plan your meals: add nutritional information and schedule your daily meals
              </p>
            </div>
            <div className="mt-8">
              <div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Meal Name
                  </label>
                  <input
                    id="meal-name"
                    type="text"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    placeholder="e.g., Grilled Chicken Salad"
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
                  Meal Type
                </label>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  {Object.entries(mealTypes).map(([key, value]) => (
                    <div key={key} className="n-chk">
                      <div
                        className={`form-check form-check-${value} form-check-inline`}
                      >
                        <label
                          className="flex items-center text-sm text-gray-700 form-check-label dark:text-gray-400"
                          htmlFor={`modal${key}`}
                        >
                          <span className="relative">
                            <input
                              className="sr-only form-check-input"
                              type="radio"
                              name="meal-type"
                              value={key}
                              id={`modal${key}`}
                              checked={mealType === key}
                              onChange={() => setMealType(key)}
                            />
                            <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full box dark:border-gray-700">
                              <span
                                className={`h-2 w-2 rounded-full bg-white ${
                                  mealType === key ? "block" : "hidden"
                                }`}
                              ></span>
                            </span>
                          </span>
                          {key}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Ingredients
                </label>
                <textarea
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="List main ingredients separated by commas"
                  rows={3}
                  className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Calories
                  </label>
                  <input
                    id="calories"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="350"
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Protein (g)
                  </label>
                  <input
                    id="protein"
                    type="text"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    placeholder="25g"
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Carbs (g)
                  </label>
                  <input
                    id="carbs"
                    type="text"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    placeholder="30g"
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                    Fats (g)
                  </label>
                  <input
                    id="fats"
                    type="text"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    placeholder="12g"
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes about this meal..."
                  rows={2}
                  className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Meal Date
                </label>
                <div className="relative">
                  <input
                    id="event-start-date"
                    type="date"
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              {selectedEvent && (
                <button
                  onClick={() => {
                    setEvents(events.filter(event => event.id !== selectedEvent.id));
                    closeModal();
                    resetModalFields();
                  }}
                  type="button"
                  className="flex w-full justify-center rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-700 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-900/20 sm:w-auto"
                >
                  Delete Meal
                </button>
              )}
              <button
                onClick={closeModal}
                type="button"
                className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Close
              </button>
              <button
                onClick={handleAddOrUpdateEvent}
                type="button"
                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-[#527853] px-4 py-2.5 text-sm font-medium text-white sm:w-auto"
              >
                {selectedEvent ? "Update Meal" : "Add Meal"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Calendar;