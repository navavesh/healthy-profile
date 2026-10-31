export interface UserProfile {
  personal: {
    gender: "male" | "female" | "";
    age: number | null;
    height: number | null;
    weight: number | null;
    activity: string;

    sleepSchedule: string;
    mealSchedule: string;
    workMode: string;
  };

  nutrition: {
    goal: string;
    calories: number | null;
    proteins: number | null;
    fats: number | null;
    carbs: number | null;
  };

  restrictions: {
    allergies: string[];
    intolerances: string[];
    stopProducts: string[];
    noRestrictions: boolean;
  };

  health: {
    status: "none" | "has_details" | "prefer_not" | "";
    details: string;
  };

  preferences: {
    cuisines: string[];
    cookingTime: string;
    additionalPreferences: string;
  };
}

export const initialProfile: UserProfile = {
  personal: {
    gender: "",
    age: null,
    height: null,
    weight: null,
    activity: "",
    sleepSchedule: "",
    mealSchedule: "",
    workMode: "",
  },

  nutrition: {
    goal: "",
    calories: null,
    proteins: null,
    fats: null,
    carbs: null,
  },

  restrictions: {
    allergies: [],
    intolerances: [],
    stopProducts: [],
    noRestrictions: false,
  },

  health: {
    status: "",
    details: "",
  },

  preferences: {
    cuisines: [],
    cookingTime: "",
    additionalPreferences: "",
  },
};