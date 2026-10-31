import { useState } from "react";
import { initialProfile } from "../types/profile";
import type { UserProfile } from "../types/profile";

import ProfileProgress from "../components/profile/ProfileProgress";
import ProfileStepOne from "../components/profile/ProfileStepOne";
import ProfileStepTwo from "../components/profile/ProfileStepTwo";
import ProfileStepThree from "../components/profile/ProfileStepThree";
import ProfileStepFour from "../components/profile/ProfileStepFour";
import ProfileStepFive from "../components/profile/ProfileStepFive";

import "./ProfileSetupPage.css";

function ProfileSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [profileData, setProfileData] =
  useState<UserProfile>(initialProfile);

  const updatePersonalData = (
    data: Partial<UserProfile["personal"]>
  ) => {
    setProfileData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...data,
      },
    }));
  };

  const updateNutritionData = (
    data: Partial<UserProfile["nutrition"]>
  ) => {
    setProfileData((prev) => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        ...data,
      },
    }));
  };

  const updateRestrictionsData = (
    data: Partial<UserProfile["restrictions"]>
  ) => {
    setProfileData((prev) => ({
      ...prev,
      restrictions: {
        ...prev.restrictions,
        ...data,
      },
    }));
  };

  const updateHealthData = (
    data: Partial<UserProfile["health"]>
  ) => {
    setProfileData((prev) => ({
      ...prev,
      health: {
        ...prev.health,
        ...data,
      },
    }));
  };

  const updatePreferencesData = (
    data: Partial<UserProfile["preferences"]>
  ) => {
    setProfileData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...data,
      },
    }));
  };

  const isCurrentStepValid = (): boolean => {
    switch (currentStep) {
      case 1: {
        const { personal } = profileData;

        return (
          personal.gender !== "" &&
          personal.age !== null &&
          personal.age >= 14 &&
          personal.age <= 100 &&
          personal.height !== null &&
          personal.height >= 100 &&
          personal.height <= 250 &&
          personal.weight !== null &&
          personal.weight >= 20 &&
          personal.weight <= 300 &&
          personal.activity !== "" &&
          personal.sleepSchedule !== "" &&
          personal.mealSchedule !== "" &&
          personal.workMode !== ""
        );
      }

      case 2: {
        const { nutrition } = profileData;

        return (
          nutrition.goal !== "" &&
          (nutrition.calories === null ||
            (nutrition.calories >= 500 &&
              nutrition.calories <= 10000)) &&
          (nutrition.proteins === null ||
            (nutrition.proteins >= 0 &&
              nutrition.proteins <= 1000)) &&
          (nutrition.fats === null ||
            (nutrition.fats >= 0 &&
              nutrition.fats <= 1000)) &&
          (nutrition.carbs === null ||
            (nutrition.carbs >= 0 &&
              nutrition.carbs <= 1000))
        );
      }

      case 3: {
        const { restrictions } = profileData;

        return (
          restrictions.noRestrictions ||
          restrictions.allergies.length > 0 ||
          restrictions.intolerances.length > 0 ||
          restrictions.stopProducts.length > 0
        );
      }

      case 4: {
        const { health } = profileData;

        if (health.status === "") return false;

        if (health.status === "has_details") {
          return health.details.trim().length > 0;
        }

        return true;
      }

      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) return;

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="profile-setup-page">
      <header className="profile-setup-topbar">
        {currentStep > 1 && (
          <button
            type="button"
            className="profile-back-button"
            onClick={handleBack}
          >
            <span>←</span>
            Назад
          </button>
        )}

        <ProfileProgress currentStep={currentStep} />
      </header>

      <main className="profile-setup-content">
        <div
          className={
            currentStep === 1
              ? "profile-step-container"
              : "profile-step-container hidden"
          }
        >
          <ProfileStepOne
            data={profileData.personal}
            onChange={updatePersonalData}
          />
        </div>

        <div
          className={
            currentStep === 2
              ? "profile-step-container"
              : "profile-step-container hidden"
          }
        >
          <ProfileStepTwo
            data={profileData.nutrition}
            onChange={updateNutritionData}
          />
        </div>

        <div
          className={
            currentStep === 3
              ? "profile-step-container"
              : "profile-step-container hidden"
          }
        >
          <ProfileStepThree
            data={profileData.restrictions}
            onChange={updateRestrictionsData}
          />
        </div>

        <div
          className={
            currentStep === 4
              ? "profile-step-container"
              : "profile-step-container hidden"
          }
        >
          <ProfileStepFour
            data={profileData.health}
            onChange={updateHealthData}
          />
        </div>

        <div
          className={
            currentStep === 5
              ? "profile-step-container"
              : "profile-step-container hidden"
          }
        >
          <ProfileStepFive
            data={profileData.preferences}
            onChange={updatePreferencesData}
          />
        </div>
      </main>

      <footer className="profile-setup-footer">
        {currentStep === 2 && (
          <button
            type="button"
            className="profile-skip-button"
            onClick={() => {
              setProfileData((prev) => ({
                ...prev,
                nutrition: {
                  goal: "",
                  calories: null,
                  proteins: null,
                  fats: null,
                  carbs: null,
                },
              }));

              setCurrentStep((prev) => prev + 1);
            }}
          >
            Пропустить
          </button>
        )}

        <button
          type="button"
          className="profile-next-button"
          onClick={handleNext}
          disabled={currentStep !== 5 && !isCurrentStepValid()}
        >
          {currentStep === 5
            ? "Завершить"
            : currentStep === 3
              ? "Продолжить"
              : "Продолжить →"}
        </button>
      </footer>
    </div>
  );
}

export default ProfileSetupPage;