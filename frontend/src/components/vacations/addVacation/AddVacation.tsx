import { useForm } from "react-hook-form";
import "./AddVacation.css";
import { ChangeEvent, useState } from "react";
import VacationDraft from "../../../models/vacation/VacationDraft";
import VacationsService from "../../../services/auth-aware/Vacations";
import useService from "../../../hooks/useService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { newVacation } from "../../../redux/vacationsActions";
import axios from "axios";
import { showToast } from "../../common/toast/Toast";

export default function AddVacation(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    getValues,
    watch,
    setValue,
  } = useForm<VacationDraft>();

  const [previewImageSrc, setPreviewImageSrc] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const vacationsService = useService(VacationsService);

  const today = new Date().toISOString().split("T")[0];

  const startingDate = watch("startingDate");

  const minEndDateString = startingDate
    ? new Date(
        new Date(startingDate).setDate(new Date(startingDate).getDate() + 1)
      )
        .toISOString()
        .split("T")[0]
    : today;

  async function submit(draft: VacationDraft) {
    try {
      setIsSubmitting(true);

      if (draft.vacationImage) {
        draft.vacationImage = (draft.vacationImage as unknown as FileList)[0];
      }

      const newVacationFromServer = await vacationsService.create(draft);
      dispatch(newVacation(newVacationFromServer));

      reset();
      setPreviewImageSrc("");

      showToast.success(
        `vacation  ${newVacationFromServer.destination} successfully added`
      );
      navigate("/vacations");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        showToast.error(err.response?.data || "Failed to create vacation.");
      } else {
        showToast.error("Vacation creation failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  function previewImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files && event.currentTarget.files[0];
    if (file) {
      const imageSource = URL.createObjectURL(file);
      setPreviewImageSrc(imageSource);
    }
  }

  return (
    <div className="AddVacation">
      <h2>Add Vacation</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-group">
          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            placeholder="Enter destination"
            {...register("destination", {
              required: {
                value: true,
                message: "destination is must",
              },
              minLength: {
                value: 2,
                message: "destination need to be at least 2 characters",
              },
              maxLength: {
                value: 60,
                message: "destination need to be less than 60 characters",
              },
            })}
          />
          {formState.errors.destination && (
            <span className="error">
              {formState.errors.destination.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="vacationDestination">Vacation Description</label>
          <textarea
            id="vacationDestination"
            placeholder="Enter vacation vacation Description"
            {...register("vacationDestination", {
              required: {
                value: true,
                message: "vacation description is must",
              },
              minLength: {
                value: 10,
                message: "vacation description must be at least 10 characters",
              },
            })}
          />
          {formState.errors.vacationDestination && (
            <span className="error">
              {formState.errors.vacationDestination.message}
            </span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startingDate">Start on</label>
            <input
              id="startingDate"
              type="date"
              min={today}
              {...register("startingDate", {
                required: {
                  value: true,
                  message: "start date is must",
                },
              })}
              onChange={(e) => {
                register("startingDate").onChange(e);
                const currentEndDate = getValues("endingDate");
                if (
                  currentEndDate &&
                  new Date(currentEndDate) <= new Date(e.target.value)
                ) {
                  setValue("endingDate", "");
                }
              }}
            />
            {formState.errors.startingDate && (
              <span className="error">
                {formState.errors.startingDate.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="endingDate">End on</label>
            <input
              id="endingDate"
              type="date"
              min={minEndDateString}
              disabled={!startingDate}
              {...register("endingDate", {
                required: {
                  value: true,
                  message: "end date is must",
                },
                validate: (value) => {
                  const startingDate = new Date(getValues().startingDate);
                  const endingDate = new Date(value);
                  return (
                    endingDate > startingDate ||
                    "The end date must come after the start date."
                  );
                },
              })}
            />
            {formState.errors.endingDate && (
              <span className="error">
                {formState.errors.endingDate.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="number"
            placeholder="$"
            {...register("price", {
              required: {
                value: true,
                message: "price is a must",
              },
              min: {
                value: 0,
                message: "price must be positive",
              },
              max: {
                value: 200000,
                message: "The price limit is 200,000.",
              },
            })}
          />
          {formState.errors.price && (
            <span className="error">{formState.errors.price.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="vacationImage">Cover Image</label>
          <input
            id="vacationImage"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            {...register("vacationImage", {
              required: {
                value: true,
                message: "Please upload an image for the vacation..",
              },
            })}
            onChange={previewImage}
          />
          {formState.errors.vacationImage && (
            <span className="error">
              {formState.errors.vacationImage.message}
            </span>
          )}

          {previewImageSrc && (
            <div className="image-preview">
              <img src={previewImageSrc} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/vacations")}
            className="btn-cancel"
          >
            Cancel
          </button>

          <button type="submit" disabled={isSubmitting} className="btn-submit">
            {isSubmitting ? "Vacation is being created..." : "Add Vacation"}
          </button>
        </div>
      </form>
    </div>
  );
}
