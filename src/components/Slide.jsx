import { useEffect, useRef, useState } from "react"
import styles from "./Slide.module.css"

export default function Slide({ len, children }) {
    const [position, setPosition] = useState()
    const list = useRef(null)

    const slideRoller = (value) => {
        const listSlide = document.querySelectorAll(`.${styles.list} .item`)
        const listBtns = document.querySelectorAll(`.${styles.nav} button`)

        const positions = {
            in: 0,
            to: 0,
            side: 0,
        }

        listSlide.forEach((el, index) => {
            if (el.hasAttribute("visible")) {
                positions.in = index
                if (value === "left") {
                    positions.to = index + 1
                } else {
                    positions.to = index - 1
                }
                positions.side = value
            }
        })

        listSlide[positions.in].removeAttribute("visible")
        if (positions.in + 1 === listSlide.length && value === "left") {
            positions.to = 0
            positions.side = "right"
        }

        if (value === "right" && positions.to === -1) {
            positions.to = listSlide.length - 1
            positions.side = "left"
        }

        listSlide[positions.to].setAttribute("side", positions.side)
        listSlide[positions.to].setAttribute("visible", "true")

        listBtns.forEach(el => el.removeAttribute("selected"))
        listBtns[positions.to].setAttribute("selected", "true")
    }

    useEffect(() => {
        if (list !== null) {
            const arr = Array.prototype.slice.call(list.current.children)
            arr.map((el, index) => {
                el.classList.add(styles.item)

                if (index === 0) {
                    el.setAttribute("visible", "true")
                }
            })
        }
    }, [list])

    return (
        <div className={`${styles.slide} slide-base`} onTouchStart={(event) => setPosition(event.touches[0].clientX)} onTouchEnd={(event) => {
            if (event.changedTouches[0].clientX < position - 80) {
                slideRoller("left")
            } else if (event.changedTouches[0].clientX > position + 80) {
                slideRoller("right")
            }
        }}>
            <div className={styles.list + " list"} ref={list}>
                {children}
            </div>

            <nav className={styles.nav} onClick={({ target }) => {
                const listBtns = document.querySelectorAll(`.${styles.nav} button`)
                if (target.tagName !== "BUTTON") {
                    return
                }

                listBtns.forEach(el => el.removeAttribute("selected"))
                listBtns.forEach(el => {
                    if (el.id === target.id) {
                        el.setAttribute("selected", "")
                    }
                })

                const listSlide = document.querySelectorAll(`.${styles.list} .item`)
                let actual
                listSlide.forEach((el, index) => {
                    if (el.hasAttribute("visible")) {
                        el.removeAttribute("visible")
                        actual = index
                    }
                })
                listSlide[Number(target.id)].setAttribute("visible", "true")
                if (actual < Number(target.id)) {
                    listSlide[actual + 1].setAttribute("side", "left")
                }

                if (actual > Number(target.id)) {
                    listSlide[actual - 1].setAttribute("side", "right")
                }
            }}>
                {Array.from({ length: len }).map((_, index) => {
                    return (
                        <button key={"slide-btn" + index} id={index}></button>
                    )
                })}
            </nav>
        </div>
    )
}