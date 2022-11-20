import React, { useRef } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import '../sass/login.scss'
import toast from 'react-hot-toast';
          
function Login({listAccount,handleCheckNoti,handleChoose,handleIdAccount}) {
    const inputUsernameLogin = useRef(null);
    const inputPasswordLogin = useRef(null);
    const formik = useFormik({
        initialValues: {
        userName: "",
        passWord: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
          .required("Không được bỏ trống!") 
      ,
      passWord: Yup.string()
          .required("Không được bỏ trống nha!")
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm()
      inputUsernameLogin.current.value = "";
      inputPasswordLogin.current.value = "";
      const checkLogin = listAccount.filter(user => {
          return user.username === values.userName && user.password === values.passWord
      })
      if (checkLogin.length < 1 || checkLogin === undefined) {
        handleCheckNoti()
      }
      else {
        listAccount.map(user => {
          user.username===values.userName&&handleIdAccount(user.id);
        })
        toast.success('Đăng nhập thành công!')
        handleChoose();
      }
},
  })
  return (
    <div className='dashBoard__login'>
      <form
        className='login'
        onSubmit={formik.handleSubmit}
      >
        <div className='login__group'>
          <span>Tài khoản:</span>
          <input
            ref={inputUsernameLogin}
            type="text"
            placeholder='Tài khoản'
            name="userName"
            id="userName"
            onChange={formik.handleChange}
          ></input>
          {
            formik.errors.userName && (
              <p className="login__group__error">{formik.errors.userName}</p>
            )
          }
        </div>
        <div className='login__group'>
          <span>Mật khẩu:</span>
          <input
            type='password'
            ref={inputPasswordLogin}
            placeholder='Mật khẩu'
            name="passWord"
            id="passWord"
            onChange={formik.handleChange}
          ></input>
          {
            formik.errors.passWord && (
              <p className="login__group__error">{formik.errors.passWord}</p>
            )
          }
        </div>
        <button type="submit">Đăng Nhập</button>
      </form>
    </div>
  )
}

export default Login