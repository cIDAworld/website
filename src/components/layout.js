import React from "react"
import Footer from "./footer"
import Head from "./head"
import Hero from "./hero"

export default function Layout(props) {
  return (
    <>
      <Head title={props.title} redirect={props.redirect}></Head>
      <Hero title={props.title} />
      {props.children}
      <Footer></Footer>
    </>
  )
}
