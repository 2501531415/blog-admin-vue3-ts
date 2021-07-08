//import hljs from 'highlight.js'
import type {App} from 'vue'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);


export const setupHighlight = (app:App)=>{
    app.directive('highlight',function (el) {
        let blocks:HTMLElement[] = el.querySelectorAll('pre code');
        blocks.forEach((block)=>{
          hljs.highlightElement(block)
        })
    })
}
