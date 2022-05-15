import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      cidaLogo: file(relativePath: { eq: "logos/cida_logo.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
      uniLogo: file(relativePath: { eq: "logos/essex_logo_white.png" }) {
        childImageSharp {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
  `)
  return (
    <footer className="footer has-background-dark">
      <div className="container">
        <div className="columns is-centered">
          <div
            className="column is-one-quarter is-flex is-flex-direction-column is-align-content-center is-justify-content-center"
            id="footer-address"
          >
            <GatsbyImage
              className="logo"
              alt="cida logo"
              image={data.cidaLogo.childImageSharp.gatsbyImageData}
            />
            Department of Government
            <br />
            University of Essex
            <br />
            Wivenhoe Park
            <br />
            Colchester CO4 3SQ
          </div>
          <div
            className="column is-one-quarter is-flex is-flex-direction-column is-align-content-center is-justify-content-center"
            id="footer-contact"
          >
            <p>
              <strong>General Enquiries:</strong>
            </p>
            <p>Tel: +44 (0) 1206 873333</p>
            <p>
              <a href="mailto:enquiries@essex.ac.uk">
                Email: enquiries@essex.ac.uk
              </a>
            </p>
          </div>
          <div
            className="column is-one-quarter is-flex is-flex-direction-column is-align-content-center is-justify-content-center"
            id="footer-uni-logo"
          >
            <GatsbyImage
              className="logo"
              alt="cida logo"
              image={data.uniLogo.childImageSharp.gatsbyImageData}
            />
          </div>
          <div
            className="column is-one-quarter is-flex is-flex-direction-column is-align-content-center is-justify-content-center"
            id="footer-credit"
          >
            <p>Website design:</p>
            <p>
              <a
                href="http://www.sebastianlobbers.com"
                target="_blank"
                rel="noreferrer"
              >
                Sebastian L&ouml;bbers
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
