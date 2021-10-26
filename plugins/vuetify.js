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
        },
      },
    },
  },
}
