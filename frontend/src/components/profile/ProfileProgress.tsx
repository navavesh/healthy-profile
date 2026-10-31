import "./ProfileProgress.css";

interface ProfileProgressProps {
  currentStep: number;
}

const steps = [
  "О вас",
  "Цели и питание",
  "Ограничения",
  "Здоровье",
  "Предпочтения",
];

function ProfileProgress({ currentStep }: ProfileProgressProps) {
  return (
    <div className="profile-progress">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        return (
          <div
            className={`profile-progress-step ${
              currentStep === stepNumber ? "active" : ""
            } ${currentStep > stepNumber ? "completed" : ""}`}
            key={step}
          >
            <div className="profile-progress-number">
              {stepNumber}
            </div>

            <span>
              {stepNumber}. {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ProfileProgress;