import AuthModel from "../../../components/Auth/AuthModel"
import style from './Register.module.scss';

const Register = () => {
  return (
    <AuthModel
      title="Register"
      alternateText="Already have an account?"
      alternateLink="Log in"
      alternatePath="/Login">
        <input type="text" placeholder="Full Name" className={style.inputStyle}/>
        <input type="email" placeholder="Email Address" className={style.inputStyle} />
        <input type="password" placeholder="Password" className={style.inputStyle}/>
        <button className={style.submitBtnStyle}>Sign Up</button>
    </AuthModel>
  )
}

export default Register