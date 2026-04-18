const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin tracing root to this project to avoid parent lockfile inference issues.
  outputFileTracingRoot: path.join(__dirname),
}

module.exports = nextConfig
