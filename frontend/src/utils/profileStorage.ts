import { initialProfile } from "../types/profile";
import type { UserProfile } from "../types/profile";

const PROFILE_STORAGE_KEY = "healthy-profile:user-profile";

export function loadProfile(): UserProfile {
  try {
    const rawProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!rawProfile) return structuredClone(initialProfile);

    const parsed = JSON.parse(rawProfile) as Partial<UserProfile>;

    return {
      personal: { ...initialProfile.personal, ...parsed.personal },
      nutrition: { ...initialProfile.nutrition, ...parsed.nutrition },
      restrictions: { ...initialProfile.restrictions, ...parsed.restrictions },
      health: { ...initialProfile.health, ...parsed.health },
      preferences: { ...initialProfile.preferences, ...parsed.preferences },
    };
  } catch {
    return structuredClone(initialProfile);
  }
}

export function saveProfile(profile: UserProfile): void {
  window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}
