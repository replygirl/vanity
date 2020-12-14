# `vanity`

simple, reactive state management for any framework using [`@vue/reactivity`](https://github.com/vuejs/vue-next/tree/master/packages/reactivity#readme)

![node-current (scoped)](https://img.shields.io/node/v/@replygirl/vanity) ![GitHub top language](https://img.shields.io/github/languages/top/replygirl/vanity) [![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@replygirl/vanity)](https://libraries.io/npm/@replygirl%2Fvanity) [![Maintainability](https://api.codeclimate.com/v1/badges/99686f343cfb8ec449c1/maintainability)](https://codeclimate.com/github/replygirl/vanity/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/99686f343cfb8ec449c1/test_coverage)](https://codeclimate.com/github/replygirl/vanity/test_coverage) [![GitHub issues](https://img.shields.io/github/issues/replygirl/vanity)](https://github.com/replygirl/vanity/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/replygirl/vanity)](https://github.com/replygirl/vanity/pulls)

`vanity` keeps business logic simple by abstracting it away from application state management. It can be used as a lightweight global store, or paired with a state management pattern like [`vuex`](https://github.com/vuejs/vuex) to better separate concerns.

While `vanity` was created with [`vue`](https://github.com/vuejs/vue-next) in mind, it works out of the box with other frameworks like [`svelte`](https://github.com/sveltejs/svelte), [`react`](https://github.com/facebook/react), and [`angular`](https://github.com/angular/angular).

## Installation

```bash
yarn add @replygirl/vanity
```

## Usage

```ts
// Creating a service

import { createService } from '@replygirl/vanity'

type State = {
  bar: boolean | null
}

export default createService<State>({
  name: 'foo',
  baseState: {
    bar: null
  },
  methods: ({ clear, commit }) => ({
    setBar(bar: boolean) { commit({ bar }) },
    reset() { clear() }
  })
})
```

```ts
// Consuming a service

import { watchEffect } from '@vue/reactivity'

import foo from '@/services/foo'

watchEffect(() => console.info(foo.bar)) // null

foo.setBar(true) // true

foo.reset() // null
```

## License

[ISC (c) 2020 replygirl](https://github.com/replygirl/vanity/blob/main/LICENSE.md)
