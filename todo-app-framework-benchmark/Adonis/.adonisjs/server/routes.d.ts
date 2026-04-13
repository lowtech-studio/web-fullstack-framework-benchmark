import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'todos.index': { paramsTuple?: []; params?: {} }
    'todos.store': { paramsTuple?: []; params?: {} }
    'todos.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'todos.index': { paramsTuple?: []; params?: {} }
    'todos.destroy': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'todos.index': { paramsTuple?: []; params?: {} }
    'todos.destroy': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'todos.store': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}