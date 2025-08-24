
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/module', 'src/composables', 'src/plugin', 'src/plus-enhancer'],
  clean: true,
  declaration: true,
  rollup: { emitCJS: true },
})
