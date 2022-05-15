import React from "react"
import Footer from "./footer"
import Head from "./head"
import Hero from "./hero"
import NavBar from "./navbar"

export default function Layout(props) {
  const { brightNavbar = false } = props
  return (
    <>
      <Head title={props.title} redirect={props.redirect}></Head>
      <Hero title={props.title} />
      {props.children}
      <Footer></Footer>
    </>
  )
}
