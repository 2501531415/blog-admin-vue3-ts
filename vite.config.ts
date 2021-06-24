import type {ConfigEnv,UserConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

export default ({command,mode}:ConfigEnv):UserConfig=>{
  return {
    plugins:[
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`;
            },
            resolveComponent: (name) => {
              return `element-plus/lib/${name}`;
            },
          }
        ]
      })
    ],
    css:{
      preprocessorOptions:{
        less:{
          modifyVars:{
            hack: `true; @import (reference) "${resolve('src/style/config.less')}";`,
          },
          javascriptEnabled:true
        }
      }
    },
    resolve:{
      alias:[
        {find:'@',replacement:resolve(__dirname,'src')}
      ]
    }
  }
}
