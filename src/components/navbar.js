import React, { useState, useEffect } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const NavBar = props => {
  const [navTransparent, setNavTransparent] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [navItems, setNavItems] = useState([
    { name: "About", link: "/#about" },
    { name: "What's on", link: "/boilerplate" },
    { name: "Past Projects", link: "/past_projects" },
    { name: "Members", link: "/members" },
  ])

  const changeTransparency = e => {
    const y = e.path[1].scrollY
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
        <a
          role="button"
          className={`navbar-burger ${!mobileMenu ? "" : "is-active"}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${!mobileMenu ? "" : "is-active"}`}>
        <div className="navbar-end">
          {navItems.map(item => {
            return (
              <Link
                to={item.link}
                className={`navbar-item has-text-${
                  navTransparent ? "light" : "dark"
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
