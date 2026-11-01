from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, model_validator


class RestrictionCreate(BaseModel):
    restriction_type: str = Field(
        pattern="^(allergy|intolerance|excluded)$"
    )
    name: str = Field(min_length=1, max_length=150)

    @model_validator(mode="after")
    def validate_name(self):
        self.name = self.name.strip()

        if not self.name:
            raise ValueError("Название ограничения не может быть пустым")

        return self


class RestrictionUpdate(BaseModel):
    restriction_type: str | None = Field(
        default=None,
        pattern="^(allergy|intolerance|excluded)$",
    )
    name: str | None = Field(default=None, min_length=1, max_length=150)


class RestrictionResponse(BaseModel):
    id: UUID
    restriction_type: str
    name: str

    model_config = ConfigDict(from_attributes=True)