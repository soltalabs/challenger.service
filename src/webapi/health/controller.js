import { path } from 'ramda'
import { isFunction } from 'ramda-adjunct'

export async function getVersion(ctx) {
  ctx.body = {
    name: path(['env', 'npm_package_name'])(process),
    version: path(['env', 'npm_package_version'])(process),
  }
}

export async function getHealth(ctx) {
  const result = { server: true }
  if (isFunction(ctx.methods.health)) {
    const extra = await ctx.methods.health()
    Object.assign(result, extra)
  }

  ctx.body = result
}
