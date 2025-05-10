import { useForm } from "react-hook-form";
import "./Login.css";
import auth from "../../../services/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/Auth";
import LoginModel from "../../../models/user/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../common/toast/Toast";

export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModel>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { newLogin } = useContext(AuthContext)!;

  async function submit(login: LoginModel) {
    try {
      setIsLoading(true);
      const jwt = await auth.login(login);
      newLogin(jwt);
      showToast.success("logged successfully");
      navigate("/vacations");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        showToast.error(
          err.response?.data || "Something went wrong. Please try again later"
        );
      } else {
        showToast.error("An unexpected issue occurred. Please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function goToSignup() {
    navigate("/signUp");
  }

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="email"
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
              required: "You must provide an password",
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
          {isLoading ? "Hang tight, logging you in..." : "Login"}
        </button>
      </form>

      <h6>New here? Create an account</h6>
      <button onClick={goToSignup} className="btn btn-link">
        sign up
      </button>
    </div>
  );
}
