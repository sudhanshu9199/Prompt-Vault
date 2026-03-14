import { useNavigate } from "react-router";
import AuthModel from "../../../components/Auth/AuthModel";
import { useAuth } from "../../../context/AuthContext";
import style from "./Login.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  // const [isSubmitting, setisSubmitting] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    seterror,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/personal-vault", { replace: true });
    } catch (err) {
      seterror("roor.serverError", {
        message: err?.message || "Login failed. Please try again.",
      });
    }
  };
  return (
    <AuthModel
      title="Login"
      alternateText="Don't have an accouunt?"
      alternateLink="Sign up"
      alternatePath="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} onValidate>
        {errors.root?.serverError && (
          <p className={style.errorText} role="alert">
            {errors.root.serverError.message}
          </p>
        )}

        <div className="fieldWrapper">
          <input
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            className={`${style.inputStyle} ${errors.email ? style.inputError : ""}`}
            aria-invalid={!errors.email}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: EMAIL_REGEX,
                message: "Enter a valid email address.",
              },
            })}
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          {errors.email && (
            <p className={style.errorText} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="fieldWrapper">
          <input
            type="password"
            placeholder="Password"
            autoComplete={`${style.inputStyle} ${errors.password ? style.inputError : ""}`}
            aria-invalid={!!errors.password}
            {...register("Password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must  be at least 8 characters.",
              },
            })}
          />
          {errors.password && (
            <p className={style.errorText} role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={style.submitBtnStyle}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </AuthModel>
  );
};

export default Login;
