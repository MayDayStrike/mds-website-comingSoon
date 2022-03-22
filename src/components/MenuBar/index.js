import React, { useState, useEffect } from "react"
import Hamburger from "hamburger-react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import * as MenuBarStyles from "./menuBar.module.css"

/**
 * @typedef {Object} WindowSize
 * @property {number} width - The window inner width in pixels
 * @property {number} height - The window inner height in pixels
 */

/**
 * Thank you, @joshcawthorne!
 * https://gist.github.com/joshcawthorne/0a518b164658510f4eed74d0c4e8d003
 *
 * @returns {WindowSize}
 * */
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}

const mobileWidth = 670

const MenuBar = ({ emitHeightChange }) => {
  const [isOpen, setOpen] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    const headerHeight =
      document.querySelector("header#header-container")?.getBoundingClientRect()
        .height ?? 0

    emitHeightChange(headerHeight)
  }, [isOpen])

  return (
    <nav className={MenuBarStyles.menuBarContainer}>
      {width <= mobileWidth && (
        <div className={MenuBarStyles.hamburger}>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={34}
            duration={0.5}
            color="#E9DFAC"
            label="Show MenuBar"
          />
        </div>
      )}
      {(width > mobileWidth || isOpen) && (
        <ul className={MenuBarStyles.menuBarList}>
          <li>
            <Link className={MenuBarStyles.menuBarItemLink} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className={MenuBarStyles.menuBarItemLink} to="/faq">
              FAQ
            </Link>
          </li>
          <li>
            <Link className={MenuBarStyles.menuBarItemLink} to="/events">
              Events
            </Link>
          </li>
          <li>
            <Link className={MenuBarStyles.menuBarItemLink} to="/resources">
              Resources
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

MenuBar.propTypes = {
  emitHeightChange: PropTypes.func.isRequired,
}

export default MenuBar
