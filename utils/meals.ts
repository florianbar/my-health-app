import { Meal, OrganizedMeals } from "../types/meals";
import { TIMESLOTS, TIMESLOT_LABELS } from "../constants/timeslots";

export function getMealsByDateAndTime(meals: Meal[]): OrganizedMeals[] {
  if (!meals) {
    return [];
  }

  const organizedMeals = [];
  const mealsByDate = {};

  meals.forEach((meal: Meal) => {
    const consumedAt = new Date(meal.consumed_at);
    const dateString = consumedAt.toISOString().split("T")[0];
    const time = consumedAt.toISOString().split("T")[1];
    const hour = parseInt(time.split(":")[0], 10);

    let closestSlot = TIMESLOT_LABELS[0]; // Default to the first slot (e.g., breakfast)

    for (let i = 0; i < TIMESLOT_LABELS.length; i++) {
      const slotName = TIMESLOT_LABELS[i];
      const slotHour = parseInt(TIMESLOTS[slotName].split(":")[0], 10);

      if (hour < slotHour) {
        // Assign to the previous slot if the current hour is less than the slot hour
        closestSlot = TIMESLOT_LABELS[Math.max(0, i - 1)];
        break;
      }

      // If it's the last slot, assign it to the last slot
      if (i === TIMESLOT_LABELS.length - 1) {
        closestSlot = slotName;
      }
    }

    if (!mealsByDate[dateString]) {
      mealsByDate[dateString] = {
        [TIMESLOT_LABELS[0]]: [],
        [TIMESLOT_LABELS[1]]: [],
        [TIMESLOT_LABELS[2]]: [],
        [TIMESLOT_LABELS[3]]: [],
        [TIMESLOT_LABELS[4]]: [],
      };
    }

    mealsByDate[dateString][closestSlot].push(meal);
  });

  for (const date in mealsByDate) {
    for (const slot in mealsByDate[date]) {
      mealsByDate[date][slot].sort((mealA: Meal, mealB: Meal) => {
        const idA = String(mealA?.id || "");
        const idB = String(mealB?.id || "");
        return idA.localeCompare(idB);
      });
    }
  }

  for (const date in mealsByDate) {
    organizedMeals.push({
      date,
      meals: Object.values(mealsByDate[date]),
    });
  }

  return organizedMeals;
}
