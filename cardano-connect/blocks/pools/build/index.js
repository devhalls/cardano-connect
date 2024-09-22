(()=>{"use strict";var e,s={116:()=>{const e=window.wp.blocks,s=window.wp.i18n,o=window.wp.components,l=window.wp.blockEditor,t=window.ReactJSXRuntime,i=JSON.parse('{"UU":"cardano-connect/pools"}');(0,e.registerBlockType)(i.UU,{attributes:{whitelist:{type:"string"},per_page:{type:"number",default:10},not_found:{type:"string"}},edit:function({attributes:e,setAttributes:i,isSelected:r}){return(0,t.jsx)("div",{...(0,l.useBlockProps)(),children:(0,t.jsx)("div",{className:"pools-control",children:r?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.TextareaControl,{label:(0,s.__)("Whitelist Pool ID(s)"),help:(0,s.__)("(Filter the list of pools by one or more pool ID(s). Enter one Pool ID per line)"),value:e.whitelist,onChange:e=>i({whitelist:e})}),(0,t.jsx)(o.__experimentalNumberControl,{label:(0,s.__)("Pools per page"),help:(0,s.__)("(Set to 0 to disable pagination, max 100)"),value:e.per_page,min:0,max:100,step:1,onChange:e=>i({per_page:parseInt(e)})}),(0,t.jsx)("br",{}),(0,t.jsx)(o.TextareaControl,{label:(0,s.__)("Not found text"),help:(0,s.__)("(Replaces default options not found text with a custom message for this block)"),value:e.not_found,onChange:e=>i({not_found:e})})]}):(0,t.jsxs)(t.Fragment,{children:[e.whitelist?(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"pools-title",children:[(0,t.jsx)("div",{className:"pools-image"}),(0,t.jsx)("div",{className:"pools-text",children:(0,s.__)("Filtered Pools by ID(s)")})]}),(0,t.jsx)("div",{className:"pools-attribute",children:e.whitelist})]}):(0,t.jsxs)("div",{className:"pools-title",children:[(0,t.jsx)("div",{className:"pools-image"}),(0,t.jsx)("div",{className:"pools-text",children:(0,s.__)("All pools")})]}),(0,t.jsx)("div",{className:"pools-placeholder"}),(0,t.jsx)("div",{className:"pools-placeholder"})]})})})},icon:{src:(0,t.jsxs)("svg",{id:"Layer_1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 100 100",children:[(0,t.jsx)("g",{opacity:.5,children:(0,t.jsx)("path",{fill:"#096",d:"M89.46,31.24c.2.41.48.78.83,1.08.34.3.74.54,1.18.68.43.15.89.21,1.35.18.46-.03.9-.15,1.32-.35.41-.2.78-.48,1.08-.83.3-.34.54-.74.68-1.18.15-.43.21-.89.18-1.35s-.15-.9-.35-1.32l-6.26,3.07ZM92.93,58.55c-3.99,19.65-21.51,34.47-42.55,34.47v6.98c24.38,0,44.74-17.19,49.39-40.06l-6.84-1.39ZM50.38,93.02c-24,0-43.41-19.29-43.41-43.02H0C0,77.64,22.58,100,50.38,100v-6.98ZM6.98,50C6.98,26.27,26.38,6.98,50.38,6.98V0C22.58,0,0,22.36,0,50h6.98ZM87.9,46.51h-23.45v6.98h23.45v-6.98ZM50.38,6.98c17.19,0,32.04,9.91,39.08,24.26l6.26-3.07c-4.16-8.47-10.62-15.6-18.64-20.58C69.07,2.61,59.82-.02,50.38,0v6.98ZM99.77,59.94c1.56-7.71-5.04-13.43-11.87-13.43v6.98c3.53,0,5.52,2.7,5.03,5.06l6.84,1.39Z"})}),(0,t.jsx)("path",{fill:"#096",d:"M66.83,50c0,2.22-.43,4.39-1.28,6.45-.85,2.06-2.08,3.89-3.65,5.46s-3.4,2.8-5.46,3.65c-2.06.85-4.23,1.28-6.45,1.28h-.93c-1.76,0-3.42-.69-4.67-1.93-1.25-1.25-1.94-2.91-1.94-4.67v-20.46c0-1.77.69-3.43,1.94-4.67,1.24-1.25,2.9-1.93,4.67-1.93h.93c2.22,0,4.39.43,6.45,1.28,2.05.85,3.89,2.08,5.46,3.65,1.57,1.57,2.79,3.41,3.65,5.46.85,2.05,1.28,4.22,1.28,6.44ZM48.23,60.23c0,.22.09.43.24.59.16.16.37.24.59.24h.93c1.46,0,2.89-.28,4.24-.84,1.35-.56,2.55-1.37,3.59-2.4,1.03-1.03,1.84-2.24,2.4-3.59,1.11-2.7,1.12-5.77,0-8.47-.56-1.36-1.37-2.56-2.4-3.59-1.03-1.03-2.24-1.84-3.59-2.4-1.35-.56-2.78-.84-4.24-.84h-.93c-.23,0-.44.09-.59.25s-.24.37-.24.59v20.46Z"}),(0,t.jsx)("path",{fill:"#096",d:"M48.23,43.02c0,1.59-1.29,2.88-2.88,2.88h-9.3c-1.59,0-2.88-1.29-2.88-2.88s1.29-2.88,2.88-2.88h9.3c1.59,0,2.88,1.29,2.88,2.88ZM48.23,56.98c0,1.59-1.29,2.88-2.88,2.88h-9.3c-1.59,0-2.88-1.29-2.88-2.88s1.29-2.88,2.88-2.88h9.3c1.59,0,2.88,1.29,2.88,2.88Z"})]})}})}},o={};function l(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return s[e](i,i.exports,l),i.exports}l.m=s,e=[],l.O=(s,o,t,i)=>{if(!o){var r=1/0;for(p=0;p<e.length;p++){for(var[o,t,i]=e[p],a=!0,n=0;n<o.length;n++)(!1&i||r>=i)&&Object.keys(l.O).every((e=>l.O[e](o[n])))?o.splice(n--,1):(a=!1,i<r&&(r=i));if(a){e.splice(p--,1);var c=t();void 0!==c&&(s=c)}}return s}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[o,t,i]},l.o=(e,s)=>Object.prototype.hasOwnProperty.call(e,s),(()=>{var e={57:0,350:0};l.O.j=s=>0===e[s];var s=(s,o)=>{var t,i,[r,a,n]=o,c=0;if(r.some((s=>0!==e[s]))){for(t in a)l.o(a,t)&&(l.m[t]=a[t]);if(n)var p=n(l)}for(s&&s(o);c<r.length;c++)i=r[c],l.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return l.O(p)},o=globalThis.webpackChunkcardano_connect_blocks=globalThis.webpackChunkcardano_connect_blocks||[];o.forEach(s.bind(null,0)),o.push=s.bind(null,o.push.bind(o))})();var t=l.O(void 0,[350],(()=>l(116)));t=l.O(t)})();