"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[7517],{21396:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>f,frontMatter:()=>s,metadata:()=>n,toc:()=>u});const n=JSON.parse('{"id":"cpbx/index","title":"CPBx","description":"","source":"@site/docs/cpbx/index.md","sourceDirName":"cpbx","slug":"/cpbx/","permalink":"/docs/cpbx/","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"CPBx"},"sidebar":"tutorialSidebar","next":{"title":"Cycle Pr\xe9paratoire De Bordeaux - Semestre 1","permalink":"/docs/cpbx/s1/"}}');var c=r(74848),o=r(28453),i=r(93935);const s={title:"CPBx"},a=void 0,l={},u=[];function d(e){return(0,c.jsx)(i.A,{})}function f(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(d,{...e})}):d()}},93935:(e,t,r)=>{r.d(t,{A:()=>v});r(96540);var n=r(34164),c=r(45357),o=r(14783),i=r(57824),s=r(40877),a=r(23230),l=r(85225);const u={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var d=r(74848);function f(e){var t=e.href,r=e.children;return(0,d.jsx)(o.A,{href:t,className:(0,n.A)("card padding--lg",u.cardContainer),children:r})}function m(e){var t=e.href,r=e.icon,c=e.title,o=e.description;return(0,d.jsxs)(f,{href:t,children:[(0,d.jsxs)(l.A,{as:"h2",className:(0,n.A)("text--truncate",u.cardTitle),title:c,children:[r," ",c]}),o&&(0,d.jsx)("p",{className:(0,n.A)("text--truncate",u.cardDescription),title:o,children:o})]})}function p(e){var t,r,n=e.item,o=(0,c.Nr)(n),s=(r=(0,i.W)().selectMessage,function(e){return r(e,(0,a.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:e}))});return o?(0,d.jsx)(m,{href:o,icon:"\ud83d\uddc3\ufe0f",title:n.label,description:null!=(t=n.description)?t:s(n.items.length)}):null}function h(e){var t,r,n=e.item,o=(0,s.A)(n.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,c.cC)(null!=(t=n.docId)?t:void 0);return(0,d.jsx)(m,{href:n.href,icon:o,title:n.label,description:null!=(r=n.description)?r:null==i?void 0:i.description})}function x(e){var t=e.item;switch(t.type){case"link":return(0,d.jsx)(h,{item:t});case"category":return(0,d.jsx)(p,{item:t});default:throw new Error("unknown item type "+JSON.stringify(t))}}function g(e){var t=e.className,r=(0,c.$S)();return(0,d.jsx)(v,{items:r.items,className:t})}function v(e){var t=e.items,r=e.className;if(!t)return(0,d.jsx)(g,Object.assign({},e));var o=(0,c.d1)(t);return(0,d.jsx)("section",{className:(0,n.A)("row",r),children:o.map((function(e,t){return(0,d.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,d.jsx)(x,{item:e})},t)}))})}},57824:(e,t,r)=>{r.d(t,{W:()=>l});var n=r(96540),c=r(97639),o=["zero","one","two","few","many","other"];function i(e){return o.filter((function(t){return e.includes(t)}))}var s={locale:"en",pluralForms:i(["one","other"]),select:function(e){return 1===e?"one":"other"}};function a(){var e=(0,c.A)().i18n.currentLocale;return(0,n.useMemo)((function(){try{return t=e,r=new Intl.PluralRules(t),{locale:t,pluralForms:i(r.resolvedOptions().pluralCategories),select:function(e){return r.select(e)}}}catch(n){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+n.message+"\n"),s}var t,r}),[e])}function l(){var e=a();return{selectMessage:function(t,r){return function(e,t,r){var n=e.split("|");if(1===n.length)return n[0];n.length>r.pluralForms.length&&console.error("For locale="+r.locale+", a maximum of "+r.pluralForms.length+" plural forms are expected ("+r.pluralForms.join(",")+"), but the message contains "+n.length+": "+e);var c=r.select(t),o=r.pluralForms.indexOf(c);return n[Math.min(o,n.length-1)]}(r,t,e)}}}},28453:(e,t,r)=>{r.d(t,{R:()=>i,x:()=>s});var n=r(96540);const c={},o=n.createContext(c);function i(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:i(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);