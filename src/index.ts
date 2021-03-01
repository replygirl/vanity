import type { Dictionary } from 'dictionary-types'
import rfdc from 'rfdc'
import { reactive, readonly } from '@vue/reactivity'
import type { DeepReadonly, Ref } from '@vue/reactivity'

import { entries } from './utils'

type Commit<S> = (payload: Partial<S>) => void

interface Context<S> {
  clear: () => void
  commit: Commit<S>
  state: DeepReadonly<S>
}

type Method = (...args: any[]) => any

type Methods<S, M> = M extends Dictionary<Method>
  ? (ctx: Context<S>) => M
  : never

type Nullable<T> = T | null

interface ServiceOptions<S, M extends Dictionary<Method> | undefined> {
  name: string
  baseState: S
  methods?: Methods<S, M>
}

type State<S> = Dictionary<
  Nullable<
    Exclude<
      S[keyof S] extends NonNullable<S[keyof S]> ? never : S[keyof S],
      Ref | undefined
    >
  >
>

const createService = <
  S extends State<S> = any,
  M extends Dictionary<Method> = Dictionary<Method>
>({
  name,
  baseState,
  methods
}: ServiceOptions<S, M>) => {
  const s = reactive(rfdc()<S>(baseState)) as S

  const storageKey = (k: keyof S) => `service__${name}__${k}`

  entries<S>(s).forEach(([k, v]) => {
    const x = JSON.parse(localStorage.getItem(storageKey(k)) ?? 'null')
    if (x !== null && x !== v) s[k] = x
  })

  const commit = (payload: Partial<S>) =>
    entries<S>(payload as S)
      .filter(x => typeof x !== 'undefined')
      .forEach(([k, v]) => {
        if (v === null) localStorage.removeItem(storageKey(k))
        else localStorage.setItem(storageKey(k), JSON.stringify(v))
        s[k] = v
      })

  const clear = () => commit(baseState)

  const state = readonly(s) as DeepReadonly<S>

  return readonly(
    reactive({
      ...s,
      ...((methods?.({ clear, commit, state }) as M) ?? {})
    })
  )
}

export default createService
