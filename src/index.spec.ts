import createService from '.'

describe('createService', () => {
  it('exists', async () => !!createService)
})

// const x = createService<
//   {
//     x: boolean | null
//   },
//   {
//     setX: (x: boolean) => void
//   }
// >({
//   name: 'x',
//   baseState: {
//     x: true
//   },
//   methods: ({ commit }) => ({
//     setX: (x: boolean) => commit({ x })
//   })
// })
