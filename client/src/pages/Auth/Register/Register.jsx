import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import AuthModel from "../../../components/Auth/AuthModel"
import { useAuth } from "../../../context/AuthContext";
import style from './Register.module.scss';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting },} = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate('/personal-vault', { replace: true });
    } catch (err) {
      setError("root.serverError", {
        message: err?.message || "Registeration failed. Please try again.",
      })
    }
  };
  return (
    <AuthModel
      title="Register"
      alternateText="Already have an account?"
      alternateLink="Log in"
      alternatePath="/login">
        <form onSubmit={handleSubmit(onSubmit)} onValidate>
          {errors.root?.serverError && (
            <p className={style.errorText} role="alert">
              {errors.root.serverError.message}
            </p>
          )}

          <div className="fieldWrapper">
            <input type="text"
            placeholder="Full Name"
            autoComplete="name"
            className={`${style.inputStyle} ${errors.fullName ? style.inputError : ""}`}
            aria-invalid={!!errors.fullName}
            {...register("fullName", {
              required: "Full Name is required.",
              minLength: {
                value: 2,
                message: "Full name must not exceed 60 characters.",
              },
            })} />

            { errors.fullName && (
              <p>
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="fieldWrapper">
            <input type="email"
            placeholder="Email Address"
            autoComplete="email"
            className={`${style.inputStyle} ${errors.email ? style.inputError : ""}`}
            aria-invalid={!!errors.email}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: EMAIL_REGEX,
                message: "Enter a valid email address.",
              },
            })} />
            {errors.email && (
              <p className={style.errorText} role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="fieldWrapper">
            <input type="password"
            autoComplete="new-password"
            className={`${style.inputStyle} ${errors.password ? style.inputError : ""}`}
            aria-invalid={!!errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })} />

            {errors.password && (
              <p className={style.errorText} role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

        <button type="submit" className={style.submitBtnStyle} disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
        </form>
    </AuthModel>
  )
}

export default Register