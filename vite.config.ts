import type {ConfigEnv,UserConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import pkg from './package.json'

export default ({command,mode}:ConfigEnv):UserConfig=>{
  const { dependencies, devDependencies, name, version } = pkg;
  const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: new Date().getTime(),
  };
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
    define:{
      '__APP_INFO__':__APP_INFO__
    },
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
      ],
      // extensions:['.vue','.tsx','.ts','js']
    }
  }
}
