"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[2871],{51330:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>u});var n=t(74848),s=t(28453),i=t(93935);const o={title:"Syst\xe8me d'exploitation "},c=void 0,a={id:"enseirb/s8/se/index",title:"Syst\xe8me d'exploitation ",description:"Ressources de cours",source:"@site/docs/enseirb/s8/se/index.md",sourceDirName:"enseirb/s8/se",slug:"/enseirb/s8/se/",permalink:"/pr-preview/pr-13/docs/enseirb/s8/se/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Syst\xe8me d'exploitation "},sidebar:"tutorialSidebar",previous:{title:"Initiation \xe0 la robotique ",permalink:"/pr-preview/pr-13/docs/enseirb/s8/robotique"},next:{title:"Introduction et Concepts G\xe9n\xe9raux",permalink:"/pr-preview/pr-13/docs/enseirb/s8/se/1"}},l={},u=[{value:"Ressources de cours",id:"ressources-de-cours",level:2},{value:"Projet",id:"projet",level:2}];function d(e){const r={a:"a",h2:"h2",li:"li",ul:"ul",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{id:"ressources-de-cours",children:"Ressources de cours"}),"\n","\n",(0,n.jsx)(i.A,{}),"\n",(0,n.jsx)(r.h2,{id:"projet",children:"Projet"}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:t(15413).A+"",children:"Rapport de mi parcours"})}),"\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:t(55475).A+"",children:"Rapport final"})}),"\n",(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{target:"_blank","data-noBrokenLinkCheck":!0,href:t(71121).A+"",children:"Archive"})}),"\n"]})]})}function p(e={}){const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},93935:(e,r,t)=>{t.d(r,{A:()=>j});t(96540);var n=t(34164),s=t(45357),i=t(14783),o=t(57824),c=t(40877),a=t(23230),l=t(85225);const u={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var d=t(74848);function p(e){var r=e.href,t=e.children;return(0,d.jsx)(i.A,{href:r,className:(0,n.A)("card padding--lg",u.cardContainer),children:t})}function f(e){var r=e.href,t=e.icon,s=e.title,i=e.description;return(0,d.jsxs)(p,{href:r,children:[(0,d.jsxs)(l.A,{as:"h2",className:(0,n.A)("text--truncate",u.cardTitle),title:s,children:[t," ",s]}),i&&(0,d.jsx)("p",{className:(0,n.A)("text--truncate",u.cardDescription),title:i,children:i})]})}function h(e){var r,t,n=e.item,i=(0,s.Nr)(n),c=(t=(0,o.W)().selectMessage,function(e){return t(e,(0,a.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:e}))});return i?(0,d.jsx)(f,{href:i,icon:"\ud83d\uddc3\ufe0f",title:n.label,description:null!=(r=n.description)?r:c(n.items.length)}):null}function m(e){var r,t,n=e.item,i=(0,c.A)(n.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",o=(0,s.cC)(null!=(r=n.docId)?r:void 0);return(0,d.jsx)(f,{href:n.href,icon:i,title:n.label,description:null!=(t=n.description)?t:null==o?void 0:o.description})}function x(e){var r=e.item;switch(r.type){case"link":return(0,d.jsx)(m,{item:r});case"category":return(0,d.jsx)(h,{item:r});default:throw new Error("unknown item type "+JSON.stringify(r))}}function v(e){var r=e.className,t=(0,s.$S)();return(0,d.jsx)(j,{items:t.items,className:r})}function j(e){var r=e.items,t=e.className;if(!r)return(0,d.jsx)(v,Object.assign({},e));var i=(0,s.d1)(r);return(0,d.jsx)("section",{className:(0,n.A)("row",t),children:i.map((function(e,r){return(0,d.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,d.jsx)(x,{item:e})},r)}))})}},57824:(e,r,t)=>{t.d(r,{W:()=>l});var n=t(96540),s=t(97639),i=["zero","one","two","few","many","other"];function o(e){return i.filter((function(r){return e.includes(r)}))}var c={locale:"en",pluralForms:o(["one","other"]),select:function(e){return 1===e?"one":"other"}};function a(){var e=(0,s.A)().i18n.currentLocale;return(0,n.useMemo)((function(){try{return r=e,t=new Intl.PluralRules(r),{locale:r,pluralForms:o(t.resolvedOptions().pluralCategories),select:function(e){return t.select(e)}}}catch(n){return console.error('Failed to use Intl.PluralRules for locale "'+e+'".\nDocusaurus will fallback to the default (English) implementation.\nError: '+n.message+"\n"),c}var r,t}),[e])}function l(){var e=a();return{selectMessage:function(r,t){return function(e,r,t){var n=e.split("|");if(1===n.length)return n[0];n.length>t.pluralForms.length&&console.error("For locale="+t.locale+", a maximum of "+t.pluralForms.length+" plural forms are expected ("+t.pluralForms.join(",")+"), but the message contains "+n.length+": "+e);var s=t.select(r),i=t.pluralForms.indexOf(s);return n[Math.min(i,n.length-1)]}(t,r,e)}}}},15413:(e,r,t)=>{t.d(r,{A:()=>n});const n=t.p+"assets/files/OS-Rapport-mid-41efc33d659bc3a411439fd5f087eb08.pdf"},55475:(e,r,t)=>{t.d(r,{A:()=>n});const n=t.p+"assets/files/OSRapportFinal-acecf7136888d96de2e538b39bc8816a.pdf"},71121:(e,r,t)=>{t.d(r,{A:()=>n});const n=t.p+"assets/files/projetSys-a14972b665f49f97b2f82da1e7878b39.zip"},28453:(e,r,t)=>{t.d(r,{R:()=>o,x:()=>c});var n=t(96540);const s={},i=n.createContext(s);function o(e){const r=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),n.createElement(i.Provider,{value:r},e.children)}}}]);