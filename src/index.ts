import type { Dictionary } from 'dictionary-types'
import rfdc from 'rfdc'
import { reactive, readonly } from '@vue/reactivity'
import type { Ref } from '@vue/reactivity'

import { entries } from './utils'

type Commit<S> = (payload: Partial<S>) => void

type Method<S> = (...args: any[]) => any

type Nullable<T> = T | null

interface ServiceContext<S> {
  clear: () => void
  commit: Commit<S>
}

interface ServiceOptions<S> {
  name: string
  baseState: S
  methods?: (ctx: ServiceContext<S>) => Dictionary<Method<S>>
}

type State<S> = Dictionary<
  Nullable<
    Exclude<
      S[keyof S] extends NonNullable<S[keyof S]> ? never : S[keyof S],
      Ref | undefined
    >
  >
>

const createService = <S extends State<S>>({
  name,
  baseState,
  methods
}: ServiceOptions<S>) => {
  const state = reactive(rfdc()<S>(baseState)) as S

  const storageKey = (k: keyof S) => `service__${name}__${k}`

  entries<S>(state).forEach(([k]) => {
    const v = localStorage.getItem(storageKey(k))
    state[k] = JSON.parse(v ?? '') || null
  })

  const commit = (payload: Partial<S>) =>
    entries<S>(payload as S)
      .filter(x => typeof x !== 'undefined')
      .forEach(([k, v]) => {
        if (v === null) localStorage.removeItem(storageKey(k))
        else localStorage.setItem(storageKey(k), JSON.stringify(v))
        state[k] = v
      })

  const clear = () => commit(baseState)

  return readonly(
    reactive({
      ...state,
      ...(methods?.({ clear, commit }) ?? {})
    })
  )
}

export default createService
