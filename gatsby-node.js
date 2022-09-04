const { graphql } = require("gatsby")
const fs = require("fs")
const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.onCreateNode = async ({
  node,
  actions,
  store,
  getCache,
  createNodeId,
}) => {
  const { createNode, createNodeField } = actions

  const contentDir = path.resolve("./src/content")

  if (node.internal.type === "MarkdownRemark") {
    const fields = {
      category: path.dirname(path.relative(contentDir, node.fileAbsolutePath)),
      slug: path.basename(node.fileAbsolutePath, ".md").replace("_", "-"),
      sortYear: node.frontmatter.year || "1970",
    }
    for (const [name, value] of Object.entries(fields)) {
      createNodeField({ node, name, value })
    }
  }

  if (node.internal.type === "twitterStatusesUserTimelineTimeline") {
    const image_url =
      node?.retweeted_status?.user?.profile_banner_url ||
      "https://pbs.twimg.com/profile_banners/926622800873484289/1516727915/1500x500"
    if (image_url) {
      await createRemoteFileNode({
        url: image_url,
        parentNodeId: node.id,
        store,
        getCache,
        createNode,
        createNodeId,
      })
        .then(fileNode => {
          node.image___NODE = fileNode.id
        })
        .catch(x => {
          console.warn("Fail to fetch twitter profile image:", x)
        })
    }
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const membersTemplate = require.resolve(`./src/templates/memberPage.js`)
  const eventsTemplate = require.resolve(`./src/templates/eventPage.js`)

  const queryResults = await graphql(`
    {
      members: allMarkdownRemark(
        filter: { fields: { category: { eq: "members" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      events: allMarkdownRemark(
        filter: { fields: { category: { eq: "projects" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  queryResults.data.members.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: membersTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })

  queryResults.data.events.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: eventsTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions, schema, getNode }) => {
  actions.createTypes([
    schema.buildObjectType({
      name: "MarkdownRemark",
      interfaces: ["Node"],
      fields: {
        hasPassed: {
          type: "Boolean!",
          resolve: s => new Date(s.frontmatter.date) < new Date(),
        },
      },
    }),
  ])
}
