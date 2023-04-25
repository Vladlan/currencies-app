export const USER_ROUTES = {
  userById: '/user/:id',
  users: '/user/list',
  user: '/user',
}

export const AUTH_ROUTES = {
  login: '/login',
}

export const CURRENCIES_ROUTES = {
  latestRates: '/currencies/latest-rates',
  currencies: '/currencies',
}

export const ROUTE_API_DOCS = '/api-docs'
export const ROUTE_API_DOCS_SWAGGER = `${ROUTE_API_DOCS}/swagger.json`

export const ROUTES = {
  main: '/',
  apiDocs: ROUTE_API_DOCS,
  apiDocsSwagger: ROUTE_API_DOCS_SWAGGER,
  ...AUTH_ROUTES,
  ...USER_ROUTES,
  ...CURRENCIES_ROUTES,
}

export const OPEN_ROUTES = [ROUTES.main, ...Object.values(AUTH_ROUTES)]
