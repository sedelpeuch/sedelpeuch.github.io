"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[2717],{10193:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>u});var r=n(74848),i=n(28453),o=n(93935);const s={title:"Interactions homme robot"},a=void 0,c={id:"enseirb/s9/Interaction/index",title:"Interactions homme robot",description:"Ce cours est une initiation \xe0 la probl\xe9matique de l'interaction, de la perception \xe0 l'action en",source:"@site/docs/enseirb/s9/Interaction/index.md",sourceDirName:"enseirb/s9/Interaction",slug:"/enseirb/s9/Interaction/",permalink:"/pr-preview/pr-13/docs/enseirb/s9/Interaction/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Interactions homme robot"},sidebar:"tutorialSidebar",previous:{title:"Deep Learning",permalink:"/pr-preview/pr-13/docs/enseirb/s9/Imagerie/7"},next:{title:"Introduction \xe0 la cobotique",permalink:"/pr-preview/pr-13/docs/enseirb/s9/Interaction/1"}},l={},u=[{value:"Cours",id:"cours",level:2}];function d(e){const t={h2:"h2",p:"p",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"Ce cours est une initiation \xe0 la probl\xe9matique de l'interaction, de la perception \xe0 l'action en\npassant par l'attention, la communication, la robotique sociale et d\xe9veloppementale. Le robot humano\xefde NAO sera exploit\xe9."}),"\n",(0,r.jsx)(t.h2,{id:"cours",children:"Cours"}),"\n","\n",(0,r.jsx)(o.A,{})]})}function p(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},93935:(e,t,n)=>{n.d(t,{A:()=>g});n(96540);var r=n(34164),i=n(45357),o=n(14783),s=n(57824),a=n(40877),c=n(23230),l=n(85225);const u={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var d=n(74848);function p(e){var t=e.href,n=e.children;return(0,d.jsx)(o.A,{href:t,className:(0,r.A)("card padding--lg",u.cardContainer),children:n})}function m(e){var t=e.href,n=e.icon,i=e.title,o=e.description;return(0,d.jsxs)(p,{href:t,children:[(0,d.jsxs)(l.A,{as:"h2",className:(0,r.A)("text--truncate",u.cardTitle),title:i,children:[n," ",i]}),o&&(0,d.jsx)("p",{className:(0,r.A)("text--truncate",u.cardDescription),title:o,children:o})]})}function f(e){var t,n,r=e.item,o=(0,i.Nr)(r),a=(n=(0,s.W)().selectMessage,function(e){return n(e,(0,c.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:e}))});return o?(0,d.jsx)(m,{href:o,icon:"\ud83d\uddc3\ufe0f",title:r.label,description:null!=(t=r.description)?t:a(r.items.length)}):null}function h(e){var t,n,r=e.item,o=(0,a.A)(r.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",s=(0,i.cC)(null!=(t=r.docId)?t:void 0);return(0,d.jsx)(m,{href:r.href,icon:o,title:r.label,description:null!=(n=r.description)?n:null==s?void 0:s.description})}function v(e){var t=e.item;switch(t.type){case"link":return(0,d.jsx)(h,{item:t});case"category":return(0,d.jsx)(f,{item:t});default:throw new Error("unknown item type "+JSON.stringify(t))}}function x(e){var t=e.className,n=(0,i.$S)();return(0,d.jsx)(g,{items:n.items,className:t})}function g(e){var t=e.items,n=e.className;if(!t)return(0,d.jsx)(x,Object.assign({},e));var o=(0,i.d1)(t);return(0,d.jsx)("section",{className:(0,r.A)("row",n),children:o.map((function(e,t){return(0,d.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,d.jsx)(v,{item:e})},t)}))})}},57824:(e,t,n)=>{n.d(t,{W:()=>l});var r=n(96540),i=n(97639),o=["zero","one","two","few","many","other"];function s(e){return o.filter((function(t){return e.includes(t)}))}var a={locale:"en",pluralForms:s(["one","other"]),select:function(e){return 1===e?"one":"other"}};function c(){var e=(0,i.A)().i18n.currentLocale;return(0,r.useMemo)((function(){try{return t=e,n=new Intl.PluralRules(t),{locale:t,pluralForms:s(n.resolvedOptions().pluralCategories),select:function(e){return n.select(e)}}}catch(r){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+r.message+"\n"),a}var t,n}),[e])}function l(){var e=c();return{selectMessage:function(t,n){return function(e,t,n){var r=e.split("|");if(1===r.length)return r[0];r.length>n.pluralForms.length&&console.error("For locale="+n.locale+", a maximum of "+n.pluralForms.length+" plural forms are expected ("+n.pluralForms.join(",")+"), but the message contains "+r.length+": "+e);var i=n.select(t),o=n.pluralForms.indexOf(i);return r[Math.min(o,r.length-1)]}(n,t,e)}}}},28453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>a});var r=n(96540);const i={},o=r.createContext(i);function s(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);