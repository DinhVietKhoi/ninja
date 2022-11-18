import React, { useRef } from 'react'
import { ref, set} from 'firebase/database'
import db  from '../data/Firebase'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import '../sass/register.scss'
import toast from 'react-hot-toast'

function Register({ listAccount, handleCheckNoti, idAccounrCurrent }) {
    //get ELement
    const inputUsernameRegister = useRef(null);
    const inputPasswordRegister = useRef(null);
    const inputRePasswordRegister = useRef(null);
    const formik = useFormik({
        initialValues: {
        userName: "",
        passWord: "",
        rePassWord: "",
    },
    validationSchema: Yup.object({
    userName: Yup.string()
        .required("Không được bỏ trống!")
        .min(4, "Phải có 4 ký tự trở lên")
        .max(16, "Phải bé hơn 16 ký tự")
        .matches(/^[a-z0-9]+$/, "Tài khoản chứa ký tự đặc biệt!")
    ,
    passWord: Yup.string()
        .required("Không được bỏ trống!")
        .min(6, "Phải có 6 ký tự trở lên")
        .max(16, "Phải bé hơn 16 ký tự")
        .matches(/^[a-zA-Z0-9]+$/,"Mật khẩu chứa ký tự đặc biệt!")
    ,
    rePassWord: Yup.string()
        .required("Không được bỏ trống!")
        .oneOf([Yup.ref('passWord'), null], 'Mật khẩu không trùng khớp!')
    }),
    onSubmit: (values, { resetForm }) => {
        resetForm()
        inputUsernameRegister.current.value = "";
        inputPasswordRegister.current.value = "";
        inputRePasswordRegister.current.value = "";
        const checkRegister = listAccount.filter(user => {
            return user.username === values.userName
        })
        if (values.userName.search('admin') !== -1) {
            handleCheckNoti()
            }
        else {
            if (checkRegister.length < 1 || checkRegister === undefined) {
                toast.success('Đăng ký thành công!')
                set(ref(db, `account/listAccount/${idAccounrCurrent.idCurrent}`), {
                    username: values.userName,
                    password: values.passWord,
                    id: idAccounrCurrent.idCurrent++,
                })
                set(ref(db, `account/idAccount`), {
                    idCurrent: idAccounrCurrent.idCurrent++,
                })
                
            }
            else {
                handleCheckNoti()
            }
        }
    },
})
    return (
        <div className='dashBoard__register'>
            <form className='register' onSubmit={formik.handleSubmit}>
                <div className='register__group'>
                    <span>Nhập tài khoản:</span>
                    <input
                    ref={inputUsernameRegister}
                    type="text"
                    placeholder='Tài khoản'
                    name="userName"
                    id="userName"
                    onChange={formik.handleChange}
                    autoComplete="off"
                    ></input>
                    {
                    formik.errors.userName && (
                        <p className="register__group__error">{formik.errors.userName}</p>
                    )
                    }
                </div>
                <div className='register__group'>
                    <span>Nhập mật khẩu:</span>
                    <input
                    type='password'
                    ref={inputPasswordRegister}
                    placeholder='Mật khẩu'
                    name="passWord"
                    id="passWord"
                    onChange={formik.handleChange}
                    ></input>
                    {
                    formik.errors.passWord && (
                        <p className="register__group__error">{formik.errors.passWord}</p>
                    )
                    }
                </div>
                <div className='register__group'>
                    <span>Nhập lại mật khẩu:</span>
                    <input
                    type='password'
                    ref={inputRePasswordRegister}
                    placeholder='Nhập lại mật khẩu'
                    name="rePassWord"
                    id="rePassWord"
                    onChange={formik.handleChange}
                    ></input>
                    {
                    formik.errors.rePassWord && (
                        <p className="register__group__error">{formik.errors.rePassWord}</p>
                    )
                    }
                </div>
                <button type="submit">Đăng Ký</button>
            </form>
        </div>
    )
}

export default Register