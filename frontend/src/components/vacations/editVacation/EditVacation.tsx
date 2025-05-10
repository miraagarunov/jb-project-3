import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import { useForm } from "react-hook-form";
import VacationDraft from "../../../models/vacation/VacationDraft";
import VacationsService from "../../../services/auth-aware/Vacations";
import useService from "../../../hooks/useService";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { update } from "../../../redux/vacationsActions";
import LoadingButton from "../../common/loading-button/LoadingButton";
import axios from "axios";
import { showToast } from "../../common/toast/Toast";

export default function EditVacation(): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const [previewImageSrc, setPreviewImageSrc] = useState<string>("");

  const { vacationId } = useParams<"vacationId">();

  const {
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    watch,
    setValue,
  } = useForm<VacationDraft>();

  const navigate = useNavigate();
  const startingDate = watch("startingDate");
  const minEndDateString = startingDate
    ? new Date(
        new Date(startingDate).setDate(new Date(startingDate).getDate() + 1)
      )
        .toISOString()
        .split("T")[0]
    : "";

  const vacation = useAppSelector((state) =>
    state.vacations.vacations.find((v) => v.vacationId === vacationId)
  );

  const vacationsService = useService(VacationsService);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadVacationFromAPI() {
      try {
        if (vacationId) {
          const vacationData = await vacationsService.getOneVacation(
            vacationId
          );

          reset({
            destination: vacationData.destination,
            vacationDestination: vacationData.vacationDestination,
            startingDate: new Date(vacationData.startingDate)
              .toISOString()
              .split("T")[0],
            endingDate: new Date(vacationData.endingDate)
              .toISOString()
              .split("T")[0],
            price: vacationData.price,
          });

          if (vacationData.imageUrl) {
            setPreviewImageSrc(vacationData.imageUrl);
          }
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          showToast.error(
            err.response?.data || "Could not load vacation data."
          );
          navigate("/vacations");
        } else {
          showToast.error("We couldn’t load vacation data. Please try again.");
          navigate("/vacations");
        }
      } finally {
        setIsLoadingData(false);
      }
    }

    if (vacation) {
      setIsLoadingData(false);

      reset({
        destination: vacation.destination,
        vacationDestination: vacation.vacationDestination,
        startingDate: new Date(vacation.startingDate)
          .toISOString()
          .split("T")[0],
        endingDate: new Date(vacation.endingDate).toISOString().split("T")[0],
        price: vacation.price,
      });

      if (vacation.imageUrl) {
        setPreviewImageSrc(vacation.imageUrl);
      }
    } else {
      loadVacationFromAPI();
    }
  }, []);

  async function submit(draft: VacationDraft) {
    try {
      if (vacationId) {
        setIsSubmitting(true);

        const formData = new FormData();

        formData.append("destination", draft.destination);
        formData.append("vacationDestination", draft.vacationDestination);
        formData.append(
          "startingDate",
          new Date(draft.startingDate).toISOString()
        );
        formData.append("endingDate", new Date(draft.endingDate).toISOString());
        formData.append("price", draft.price.toString());

        if (draft.vacationImage && typeof draft.vacationImage !== "string") {
          const file = (draft.vacationImage as unknown as FileList)[0];
          formData.append("vacationImage", file);
        }

        const updatedVacation = await vacationsService.update(
          vacationId,
          formData
        );
        dispatch(update(updatedVacation));
        showToast.success(`Vacation to ${updatedVacation.destination} updated`);
        navigate("/vacations");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showToast.error(err.response?.data || "Something went wrong");
      } else {
        showToast.error("Something went wrong");
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
    <div className="EditVacation">
      <h2>Edit Vacation</h2>

      {isLoadingData ? (
        <div className="loading-container">
          <LoadingButton message="Loading the vacation data" />
        </div>
      ) : (
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
                  message: "Vacation Description is must",
                },
                minLength: {
                  value: 10,
                  message:
                    "vacation description must be at least 10 characters",
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
                {...register("startingDate", {
                  required: {
                    value: true,
                    message: "Start date is must",
                  },
                })}
                onChange={(e) => {
                  register("startingDate").onChange(e);

                  const currentEndDate = getValues("startingDate");

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
                {...register("endingDate", {
                  required: {
                    value: true,
                    message: "End date is a must",
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
                  message: "Price is a must",
                },
                min: {
                  value: 0,
                  message: "Price must be positive",
                },
                max: {
                  value: 200000,
                  message: "The price limit is 200,000",
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
              {...register("vacationImage")}
              onChange={previewImage}
            />

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

            {isSubmitting ? (
              <LoadingButton message={"Updating vacation"} />
            ) : (
              <button type="submit" className="btn-submit">
                Update
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
