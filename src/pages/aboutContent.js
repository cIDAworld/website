import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const AboutContent = () => {
  const links = ["staff", "sponsors", "facilities"]
  const data = useStaticQuery(graphql`
    {
      about: markdownRemark(fields: { category: { eq: "home" } }) {
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
    }
  `)
  return (
    <>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-one-third">
            <GatsbyImage
              alt="cIDA logo in purple"
              image={
                data.about.frontmatter.image.childImageSharp.gatsbyImageData
              }
            />
          </div>
          <div className="column is-two-thirds text-content">
            <div dangerouslySetInnerHTML={{ __html: data.about.html }}></div>
            <div className="buttons">
              <a
                href="https://twitter.com/cida_essex?lang=en"
                target="_blank"
                className="button is-link is-large"
              >
                <span className="icon">
                  <i className="fab fa-twitter"></i>
                </span>
              </a>
              <a
                href="https://www.facebook.com/cIDA.essex/"
                target="_blank"
                className="button is-link is-large"
              >
                <span className="icon">
                  <i className="fab fa-facebook"></i>
                </span>
              </a>
              <a href="#" className="button is-link is-large">
                Master / PhD programmes
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-6">
        <div className="columns is-centered has-text-centered">
          <h1 className="is-size-2 has-text-weight-semibold">
            Associated Centres
          </h1>
        </div>
      </div>
    </>
  )
}

export default AboutContent
