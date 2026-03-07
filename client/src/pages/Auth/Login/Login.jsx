import AuthModel from "../../../components/Auth/AuthModel"
import style from './Login.module.scss';
const Login = () => {
  return (
    <AuthModel
        title='Login'
        alternateText="Don't have an accouunt?"
        alternateLink="Sign up"
        alternatePath="/register">
        <input type="email" placeholder="Email Address" className={style.inputStyle} />
        <input type="password" placeholder="Password" className={style.inputStyle} />
        <button className={style.submitBtnStyle}>Sign In</button>
    </AuthModel>
  );
};


export default Login