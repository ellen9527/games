import 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

export default {
  theme: {
    options: { 
      customProperties: true, // 增加此項，才可以在style上使用
    },
    themes: {
      light: {
        'blue-grey': {
          lighten5: colors.blueGrey.lighten5,
          darken1: colors.blueGrey.darken1,
          darken2: colors.blueGrey.darken2,
        },
        amber: {
          darken4: colors.amber.darken4,
        },
        line: {
          base: colors.blue.darken3,
        },
      },
    },
  },
}
