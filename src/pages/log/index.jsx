import { faMoon, faSun, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formCaptureData } from "../../utils/functions";
import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import NotificationBtn from "../../Classes/NotificationBtn";

function Login() {
    return (
        <div className="flex flex-col items-center gap-6 w-full transition-all! animate-(--show-down)">
            <h2 className="text-xs text-center mb-2 font-medium">Preencha o formulário para prosseguir!</h2>
            <div className="flex flex-col w-full items-center">
                <input placeholder="email" type="email" name="email" id="email" className={`border-[2px] rounded-full border-gray-300 py-2.5 px-[15px] focus:border-red-700 dark:focus:border-white text-sm w-full max-w-[350px]`} />
            </div>
            <div className="flex flex-col w-full items-center">
                <input placeholder="senha" type="text" name="senha" id="senha" className={`border-[2px] rounded-full border-gray-300 py-2.5 px-[15px] focus:border-red-700 dark:focus:border-white text-sm w-full max-w-[350px]`} />
            </div>
            <div className="grid grid-cols-2 text-xl gap-x-5 gap-y-3">
                <p className="text-xs text-center mb-2 font-medium w-full col-span-2">ou</p>
                <FontAwesomeIcon icon={faGoogle} />
                <FontAwesomeIcon icon={faFacebook} />
            </div>
        </div>
    )
}

function CreateAcount() {
    return (
        <div className="flex flex-col items-center gap-6 w-full transition-all! animate-(--show-down)">
            <h2 className="text-xs text-center mb-2 font-medium">Preencha o formulário para prosseguir!</h2>
            <div className="flex flex-col w-full items-center">
                <input placeholder="nome" type="text" name="nome" id="nome" className="border-[2px] rounded-full border-gray-300 py-2.5 px-[15px] focus:border-red-700 dark:focus:border-white text-sm w-full max-w-[350px]" />
            </div>
            <div className="flex flex-col w-full items-center">
                <input placeholder="sobrenome" type="text" name="sobrenome" id="sobrenome" className="border-[2px] rounded-full border-gray-300 py-2.5 px-[15px] focus:border-red-700 dark:focus:border-white text-sm w-full max-w-[350px]" />
            </div>
            <div className="flex flex-col w-full items-center">
                <input placeholder="email" type="email" name="email" id="email" className="border-[2px] rounded-full border-gray-300 py-2.5 px-[15px] focus:border-red-700 dark:focus:border-white text-sm w-full max-w-[350px]" />
            </div>
            <div className="flex flex-col w-full items-center">
                <input placeholder="senha" type="text" name="senha" id="senha" className="border-[2px] rounded-full border-gray-300 py-2.5 px-[15px] focus:border-red-700 dark:focus:border-white text-sm w-full max-w-[350px]" />
            </div>
            <div className="grid grid-cols-2 text-xl gap-x-5 gap-y-3">
                <p className="text-xs text-center mb-2 font-medium w-full col-span-2">ou</p>
                <FontAwesomeIcon icon={faGoogle} />
                <FontAwesomeIcon icon={faFacebook} />
            </div>
        </div>
    )
}

export default function LogPage() {
    const { newNotification } = useContext(DataContext)
    const [form, setForm] = useState(true)
    const [darkMode, setDarkMode] = useState(true)

    const submit = (event) => {
        event.preventDefault()
        const data = formCaptureData(event.target)

        if (form && !data.email && !data.senha) {
            return
        }
        if (!form && !data.nome && !data.sobrenome && !data.email && !data.senha) {
            return
        }

        if (form) {
            newNotification(3, "Login", "Login bem sucedido!", [new NotificationBtn({
                text: "Prosseguir", tag: "button", fun: "close", color: "red"
            })])
        }
        else {
            newNotification(3, "Login", "Sua conta foi criada com sucesso!", [new NotificationBtn({
                text: "Prosseguir", tag: "button", fun: "close", color: "red"
            })])
        }

        localStorage.setItem("log-page:user", JSON.stringify(data))
    }

    return (
        <div className={`page log ${!darkMode && "dark"}`}>
            <section className={`flex items-center justify-between h-full dark:bg-gray-950 bg-red-950  p-0 md:p-8`}>
                <div className="hidden md:flex flex-col justify-center items-center h-full w-full text-white">
                    <h1 className="flex flex-col text-4xl ">
                        <FontAwesomeIcon icon={faUserCircle} className="text-8xl cursor-default! mb-2" />
                        Bem vindo!
                    </h1>
                </div>
                <div className={`flex flex-col items-center h-full w-full max-w-[700px] bg-white dark:bg-gray-800 text-red-900 dark:text-white md:rounded-md drop-shadow-2xl p-10 md:py-30 py-20 relative`}>
                    <FontAwesomeIcon icon={darkMode ? faMoon : faSun} className="absolute top-2 right-2  text-2xl" onClick={() => { setDarkMode(!darkMode); document.querySelector("html").setAttribute("data-theme", "dark") }} />

                    <form className="flex flex-col justify-center items-center h-full w-full" onSubmit={submit} autoComplete="off">
                        <h1 className="flex flex-col text-center font-medium text-[2.4rem]">
                            <FontAwesomeIcon icon={faUserCircle} className="initial! md:hidden! text-8xl cursor-default! mb-3 " />
                            Nova Conta
                        </h1>

                        {form ? <Login /> : <CreateAcount />}

                        <nav className="flex flex-col items-center gap-2.5 w-full mt-5">
                            <button className={`flex justify-center! w-full max-w-[350px] p-2.5 rounded-full! bg-red-900 dark:bg-white text-white dark:text-gray-800 font-medium text-sm`}>Confirmar</button>
                            <span className=" flex gap-1 text-xs mt-2">{form ? "Ainda não tem uma conta? " : "Já tenho uma conta?"} {form ? <p className="cursor-pointer hover:underline" onClick={() => setForm(!form)}>criar conta</p> : <p className="cursor-pointer hover:underline" onClick={() => setForm(!form)}>login</p>}</span>
                        </nav>
                    </form>
                </div>
            </section>
        </div>
    )
}