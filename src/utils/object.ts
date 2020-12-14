import type { Dictionary } from 'dictionary-types'

export type Entry<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

export const entries = <T = Dictionary<any>>(x: T) =>
  Object.entries(x) as Entry<T>[]
