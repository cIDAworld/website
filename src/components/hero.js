import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import NavBar from "./navbar"

const Hero = props => {
  const data = useStaticQuery(graphql`
    {
      hero: markdownRemark(fields: { category: { eq: "hero" } }) {
        html
        frontmatter {
          title
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
      logo: file(relativePath: { eq: "logos/essex_logo_white.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
  `)

  const landingHero = (
    <>
      <h1
        className="title is-1 is-size-2-mobile has-text-centered has-text-weight-bold has-text-light"
        dangerouslySetInnerHTML={{ __html: data.hero.html }}
      ></h1>
      <GatsbyImage
        className="logo my-5"
        alt="University of Essex logo"
        loading="eager"
        image={data.logo.childImageSharp.gatsbyImageData}
      />
      <Link to="/#about" className="has-text-light">
        <span className="icon is-large">
          <i className="fas fa-2x fa-circle-down"></i>
        </span>
      </Link>
    </>
  )

  const smallHero = (
    <>
      <h1 className="title is-1 is-size-2-mobile has-text-centered has-text-weight-bold has-text-light">
        {props.title}
      </h1>
    </>
  )

  return (
    <section className={`hero ${props.title ? "is-medium" : "is-fullheight"}`}>
      <div className="hero-head">
        <NavBar title={props.title || "Home"}></NavBar>
      </div>
      <GatsbyImage
        alt="An abstract stock painting that serves as the background image for the website"
        loading="eager"
        className="background"
        image={data.hero.frontmatter.image.childImageSharp.gatsbyImageData}
      />
      <div className="hero-body text-overlay is-flex-direction-column is-justify-content-center">
        {!props.title ? landingHero : smallHero}
      </div>
      <div className="hero-foot text-overlay is-flex-direction-row is-justify-content-center"></div>
    </section>
  )
}

export default Hero
