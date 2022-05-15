import React from "react"
import "./mystyles.scss"

import Layout from "../components/layout"
import About from "./about"

export default function Home() {
  return (
    <Layout>
      <About />
    </Layout>
  )
}
