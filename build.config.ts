import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/time',
    'src/size',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
