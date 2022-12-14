import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const AboutContent = () => {
  const data = useStaticQuery(graphql`
    {
      about: markdownRemark(fields: { category: { eq: "about" } }) {
        html
        frontmatter {
          title
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
          centre_logos {
            logo {
              id
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 200)
              }
            }
            link
            logo_alt
          }
        }
      }
    }
  `)

  const [showParagraph, setShowParagraph] = useState(false)
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
            <div
              className={
                showParagraph ? undefined : "only-show-first-paragraph"
              }
              dangerouslySetInnerHTML={{ __html: data.about.html }}
            ></div>
            <button
              className="looks-like-link"
              onClick={() => setShowParagraph(!showParagraph)}
            >
              {showParagraph ? "Show less" : "Read more"}
            </button>

            <div className="buttons mt-6">
              <a
                href="https://twitter.com/cida_essex?lang=en"
                target="_blank"
                rel="noreferrer noopener"
                className="button is-link is-large"
              >
                <span className="icon">
                  <i className="fab fa-twitter"></i>
                </span>
              </a>
              <a
                href="https://www.facebook.com/cIDA.essex/"
                target="_blank"
                rel="noreferrer noopener"
                className="button is-link is-large"
              >
                <span className="icon">
                  <i className="fab fa-facebook"></i>
                </span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCwemasspu9Mr4TuMR4Fj4uA"
                target="_blank"
                rel="noreferrer noopener"
                className="button is-link is-large"
              >
                <span className="icon">
                  <i className="fab fa-youtube"></i>
                </span>
              </a>

              <a
                href="https://www.essex.ac.uk/centres-and-institutes/ideology-and-discourse-analysis"
                target="_blank"
                rel="noreferrer noopener"
                className="button is-link is-large"
              >
                <span className="icon">
                  <i className="fa fa-globe"></i>
                </span>
              </a>

              <a
                href="https://www.essex.ac.uk/courses/pr00914/1/phd-government"
                target="_blank"
                rel="noreferrer noopener"
                className="button is-link is-large"
              >
                PhD programme
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
        <div className="columns is-justify-content-space-around is-flex is-full mt-3">
          {data.about.frontmatter.centre_logos.map(logoData => (
            <a href={logoData.link} target="_blank" rel="noreferrer noopener">
              <GatsbyImage
                alt={logoData.logo_alt}
                image={logoData.logo.childImageSharp.gatsbyImageData}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default AboutContent
