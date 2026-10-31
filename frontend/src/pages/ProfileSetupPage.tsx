import { useState } from "react";

import ProfileProgress from "../components/profile/ProfileProgress";
import ProfileStepOne from "../components/profile/ProfileStepOne";
import ProfileStepTwo from "../components/profile/ProfileStepTwo";
import ProfileStepThree from "../components/profile/ProfileStepThree";
import ProfileStepFour from "../components/profile/ProfileStepFour";
import ProfileStepFive from "../components/profile/ProfileStepFive";

import "./ProfileSetupPage.css";

function ProfileSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
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
          <ProfileStepOne />
        </div>

        <div
          className={
            currentStep === 2
              ? "profile-step-container"
              : "profile-step-container hidden"
          }
        >
          <ProfileStepTwo />
        </div>

        <div
          className={
            currentStep === 3
              ? "profile-step-container"
              : "profile-step-container hidden"
          }
        >
          <ProfileStepThree />
        </div>

        <div
          className={
            currentStep === 4
              ? "profile-step-container"
              : "profile-step-container hidden"
          }
        >
          <ProfileStepFour />
        </div>

        <div
          className={
            currentStep === 5
              ? "profile-step-container"
              : "profile-step-container hidden"
          }
        >
          <ProfileStepFive />
        </div>
      </main>

      <footer className="profile-setup-footer">
        {(currentStep === 2 || currentStep === 4) && (
          <button
            type="button"
            className="profile-skip-button"
            onClick={handleNext}
          >
            Пропустить
          </button>
        )}

        <button
          type="button"
          className="profile-next-button"
          onClick={handleNext}
          disabled={currentStep === 5}
        >
          {currentStep === 3 ? "Продолжить" : "Продолжить →"}
        </button>
      </footer>
    </div>
  );
}

export default ProfileSetupPage;