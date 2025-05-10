import "./SignUp.css";
import { useForm } from "react-hook-form";
import auth from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/Auth";
import axios from "axios";
import { showToast } from "../../common/toast/Toast";
import Signup from "../../../models/user/signUp";

export default function SignUp(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>();
  const navigate = useNavigate();
  const { newLogin } = useContext(AuthContext)!;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function submit(signUp: Signup) {
    try {
      setIsLoading(true);
      const jwt = await auth.signUp(signUp);
      newLogin(jwt);
      showToast.success("Registration complete. Let’s get started");
      navigate("/vacations");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        showToast.error(
          err.response?.data || "Something went wrong. Please try again later."
        );
      } else {
        showToast.error(
          "An unexpected issue occurred. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
    }
  }

  function goToLogIn() {
    navigate("/login");
  }

  return (
    <div className="SignUp">
      <div className="form-container">
        <h3 className="form-title">Create an account</h3>
        <form onSubmit={handleSubmit(submit)}>
          <div className="form-group">
            <input
              placeholder="first name"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "Please enter a first name with at least 2 letters.",
                },
              })}
            />
            {errors.firstName && (
              <span className="error">{errors.firstName.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              placeholder="last name"
              {...register("lastName", {
                required: "last name is required",
                minLength: {
                  value: 2,
                  message: "Please enter a last name with at least 2 letters.",
                },
              })}
            />
            {errors.lastName && (
              <span className="error">{errors.lastName.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              placeholder="email"
              type="email"
              {...register("email", {
                required: "You must provide an email",
              })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <input
              placeholder="password"
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 4,
                  message: "Password should be at least 4 characters long",
                },
              })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <button disabled={isLoading}>
            {isLoading ? "Just a moment – we're signing you up..." : "Sign Up"}
          </button>
        </form>
        <h6>Already have an account? Log in here</h6>
        <button
          onClick={goToLogIn}
          className="btn btn-link"
          disabled={isLoading}
        >
          login
        </button>
      </div>
    </div>
  );
}
