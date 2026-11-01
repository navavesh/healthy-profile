from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, model_validator


class PreferenceCreate(BaseModel):
    preference_type: str = Field(min_length=1, max_length=50)
    value: str = Field(min_length=1, max_length=255)

    @model_validator(mode="after")
    def validate_values(self):
        self.preference_type = self.preference_type.strip()
        self.value = self.value.strip()

        if not self.preference_type or not self.value:
            raise ValueError("Поля не должны быть пустыми")

        return self


class PreferenceUpdate(BaseModel):
    preference_type: str | None = Field(
        default=None,
        min_length=1,
        max_length=50,
    )
    value: str | None = Field(
        default=None,
        min_length=1,
        max_length=255,
    )


class PreferenceResponse(BaseModel):
    id: UUID
    preference_type: str
    value: str

    model_config = ConfigDict(from_attributes=True)