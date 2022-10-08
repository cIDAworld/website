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
    const category = path.dirname(
      path.relative(contentDir, node.fileAbsolutePath)
    )
    const fields = {
      category: category,
      slug:
        "/" +
        category +
        "/" +
        path.basename(node.fileAbsolutePath, ".md").replace("_", "-"),
    }

    if (category === "projects") {
      const expireDate = node.frontmatter.expireDate
        ? new Date(node.frontmatter.expireDate)
        : new Date(node.frontmatter.date)
      const hasPassed = new Date() > expireDate
      const newSlug = hasPassed ? "archive" : "whats_on"
      fields["slug"] = fields["slug"].replace("projects", newSlug)
      fields["hasPassed"] = hasPassed
    }

    for (const [name, value] of Object.entries(fields)) {
      createNodeField({ node, name, value })
    }
  }

  if (node.internal.type === "twitterStatusesUserTimelineTimeline") {
    const image_url =
      node.retweeted_status?.user?.profile_banner_url ||
      node.user.profile_banner_url

    let imageNode

    try {
      imageNode = await createRemoteFileNode({
        url: image_url,
        parentNodeId: node.id,
        store,
        getCache,
        createNode,
        createNodeId,
      })
    } catch (e) {
      console.warn("Fail to fetch twitter profile image:", e)
    }

    if (imageNode) {
      node.image___NODE = imageNode.id
    }

    // It appears that this code has to come after the image node creation for images to be created properly
    // I'm not sure why though`
    const date = new Date(node.created_at)
    createNodeField({ node, name: "date", value: date.toISOString() })
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
            fields {
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
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  queryResults.data.members.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: membersTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })

  queryResults.data.events.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: eventsTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}
