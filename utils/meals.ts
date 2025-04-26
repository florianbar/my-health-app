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
    const hour = consumedAt.getHours();

    let closestSlot = null;
    let minDifference = Infinity;

    for (const slotName of TIMESLOT_LABELS) {
      const slotHour = TIMESLOTS[slotName];
      const difference = Math.abs(hour - slotHour);

      if (difference < minDifference) {
        minDifference = difference;
        closestSlot = slotName;
      } else if (difference === minDifference) {
        // If the difference is the same, round to the later time slot
        if (Math.abs(hour - TIMESLOTS[closestSlot]) < difference) {
          closestSlot = slotName;
        }
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
    organizedMeals.push({
      date,
      meals: Object.values(mealsByDate[date]),
    });
  }

  return organizedMeals;
}
