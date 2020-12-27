const domainName = 'http://localhost/wordpress/'
const projectName = 'wordpress_api/'
const endPointName = 'wp-json/wp/v2/'
const authName = 'wp-json/jwt-auth/v1/token'

export const POSTS_URL = `${domainName}${projectName}${endPointName}posts`
export const CATEGORIES_URL = `${domainName}${projectName}${endPointName}categories`
export const EMBEDD_URL = `?_embed=1`
export const AUTH_LOGIN = `${domainName}${projectName}${authName}`