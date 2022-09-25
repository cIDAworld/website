import React, { useState, useEffect } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

// Names of navbar elements and links to pages
const navItems = [
  { name: "About", link: "/about" },
  { name: "What's on", link: "/whatson" },
  { name: "Archive", link: "/archive" },
  { name: "Publications", link: "/publications" },
  { name: "Members", link: "/members" },
]

const NavBar = props => {
  const [navTransparent, setNavTransparent] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)

  const changeTransparency = () => {
    const y = window.pageYOffset
    setNavTransparent(y < 300 ? true : false)
  }
  useEffect(() => {
    window.addEventListener("scroll", changeTransparency)
    return () => {
      window.removeEventListener("scroll", changeTransparency)
    }
  }, [])

  const data = useStaticQuery(graphql`
    {
      logo: file(relativePath: { eq: "logos/cida_logo.png" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED, height: 60)
        }
      }
    }
  `)
  return (
    <nav
      className={`navbar is-transparent is-fixed-top ${
        navTransparent ? "has-no-bg-color" : "has-background-white"
      }`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/">
          <GatsbyImage
            alt="Cida logo"
            image={data.logo.childImageSharp.gatsbyImageData}
            loading="eager"
          />
        </Link>
        <span
          role="button"
          className={`navbar-burger ${
            !mobileMenu ? "" : "is-active"
          } has-text-${navTransparent ? "light" : "dark"}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
      <div className={`navbar-menu ${!mobileMenu ? "" : "is-active"}`}>
        <div className="navbar-end">
          {navItems.map(item => {
            return (
              <Link
                to={item.link}
                key={item.name}
                className={`navbar-item has-text-${
                  navTransparent && !mobileMenu ? "light" : "dark"
                } has-border-${
                  navTransparent && !mobileMenu ? "light" : "dark"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
