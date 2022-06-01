import React from "react"
import "../styles/mystyles.scss"

import Layout from "../components/layout"
import AboutContent from "./aboutContent"

export default function Home() {
  return (
    <Layout>
      <section className="section is-medium has-background-light" id="about">
        <AboutContent />
      </section>
    </Layout>
  )
}
