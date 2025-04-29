import { getMealsByDateAndTime } from "../../utils/meals";
import { Meal } from "../../types/meals";

describe("getMealsByDateAndTime", () => {
  const mockMeals: Meal[] = [
    {
      id: 396,
      quantity: 1,
      consumed_at: "2025-04-29T04:00:00.000Z",
      food: {
        id: 5,
        name: "Apple",
        healthy: true,
      },
    },
    {
      id: 397,
      quantity: 1,
      consumed_at: "2025-04-29T07:00:00.000Z",
      food: {
        id: 8,
        name: "Banana",
        healthy: true,
      },
    },
    {
      id: 398,
      quantity: 1,
      consumed_at: "2025-04-29T10:00:00.000Z",
      food: {
        id: 6,
        name: "Egg",
        healthy: true,
      },
    },
    {
      id: 399,
      quantity: 1,
      consumed_at: "2025-04-29T13:00:00.000Z",
      food: {
        id: 15,
        name: "Blueberry",
        healthy: true,
      },
    },
    {
      id: 400,
      quantity: 1,
      consumed_at: "2025-04-29T16:00:00.000Z",
      food: {
        id: 15,
        name: "Blueberry",
        healthy: true,
      },
    },
    {
      id: 401,
      quantity: 1,
      consumed_at: "2025-04-30T04:30:00.000Z",
      food: {
        id: 10,
        name: "Oats",
        healthy: true,
      },
    },
    {
      id: 402,
      quantity: 1,
      consumed_at: "2025-04-30T19:00:00.000Z",
      food: {
        id: 22,
        name: "Salmon",
        healthy: true,
      },
    },
  ];

  it("should return an empty array if no meals are provided", () => {
    expect(getMealsByDateAndTime(null as unknown as Meal[])).toEqual([]);
    expect(getMealsByDateAndTime([])).toEqual([]);
  });

  it("should organize meals by date and time slot", () => {
    const organizedMeals = getMealsByDateAndTime(mockMeals);

    expect(organizedMeals).toEqual([
      {
        date: "2025-04-29",
        meals: [
          [mockMeals[0]],
          [mockMeals[1]],
          [mockMeals[2]],
          [mockMeals[3]],
          [mockMeals[4]],
        ],
      },
      {
        date: "2025-04-30",
        meals: [[mockMeals[5]], [], [], [], [mockMeals[6]]],
      },
    ]);
  });

  it("should handle meals consumed exactly at the timeslot", () => {
    const exactTimeMeals: Meal[] = [
      { ...mockMeals[1], consumed_at: "2025-05-01T04:00:00.000Z" },
      { ...mockMeals[2], consumed_at: "2025-05-01T07:00:00.000Z" },
      { ...mockMeals[3], consumed_at: "2025-05-01T10:00:00.000Z" },
      { ...mockMeals[4], consumed_at: "2025-05-01T13:00:00.000Z" },
      { ...mockMeals[6], consumed_at: "2025-05-01T16:00:00.000Z" },
    ];
    const organizedMeals = getMealsByDateAndTime(exactTimeMeals);
    expect(organizedMeals[0].meals[0]).toEqual([exactTimeMeals[0]]);
    expect(organizedMeals[0].meals[1]).toEqual([exactTimeMeals[1]]);
    expect(organizedMeals[0].meals[2]).toEqual([exactTimeMeals[2]]);
    expect(organizedMeals[0].meals[3]).toEqual([exactTimeMeals[3]]);
    expect(organizedMeals[0].meals[4]).toEqual([exactTimeMeals[4]]);
  });

  it("should handle a single meal", () => {
    const singleMeal: Meal[] = [mockMeals[0]];
    const organizedMeals = getMealsByDateAndTime(singleMeal);
    expect(organizedMeals).toEqual([
      {
        date: "2025-04-29",
        meals: [[singleMeal[0]], [], [], [], []],
      },
    ]);
  });

  it("should handle multiple meals on the same date within the same timeslot", () => {
    const sameSlotMeals: Meal[] = [
      { ...mockMeals[0], consumed_at: "2025-05-02T06:00:00.000Z" },
      { ...mockMeals[1], consumed_at: "2025-05-02T06:15:00.000Z" },
      { ...mockMeals[2], consumed_at: "2025-05-02T11:00:00.000Z" },
      { ...mockMeals[3], consumed_at: "2025-05-02T11:15:00.000Z" },
    ];
    const organizedMeals = getMealsByDateAndTime(sameSlotMeals);
    expect(organizedMeals).toEqual([
      {
        date: "2025-05-02",
        meals: [
          [sameSlotMeals[0], sameSlotMeals[1]],
          [],
          [sameSlotMeals[2], sameSlotMeals[3]],
          [],
          [],
        ],
      },
    ]);
  });
});
