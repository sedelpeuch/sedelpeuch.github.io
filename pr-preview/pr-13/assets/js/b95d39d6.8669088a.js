"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[4673],{94036:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>d,toc:()=>o});var i=s(74848),r=s(28453);const t={title:"TD3 - Mod\xe8le relationnel"},l=void 0,d={id:"enseirb/s7/bdd/td3",title:"TD3 - Mod\xe8le relationnel",description:"Le cin\xe9ma du troisi\xe8me art",source:"@site/docs/enseirb/s7/bdd/td3.md",sourceDirName:"enseirb/s7/bdd",slug:"/enseirb/s7/bdd/td3",permalink:"/pr-preview/pr-13/docs/enseirb/s7/bdd/td3",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"TD3 - Mod\xe8le relationnel"},sidebar:"tutorialSidebar",previous:{title:"TD2 - Mod\xe8lisation des donn\xe9es",permalink:"/pr-preview/pr-13/docs/enseirb/s7/bdd/td2"},next:{title:"TD4 - Normalisation",permalink:"/pr-preview/pr-13/docs/enseirb/s7/bdd/td4"}},a={},o=[{value:"Le cin\xe9ma du troisi\xe8me art",id:"le-cin\xe9ma-du-troisi\xe8me-art",level:2},{value:"Biblioth\xe8que d&#39;emprunts",id:"biblioth\xe8que-demprunts",level:2},{value:"Passage au relationnel (synth\xe8se) - Le cin\xe9ma du premier art",id:"passage-au-relationnel-synth\xe8se---le-cin\xe9ma-du-premier-art",level:2}];function c(e){const n={em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"le-cin\xe9ma-du-troisi\xe8me-art",children:"Le cin\xe9ma du troisi\xe8me art"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"Un cin\xe9ma comporte plusieurs salles d\xe9finies par un identifiant et une\ncapacit\xe9; o\xf9 diff\xe9rents films, d\xe9finis par le titre et le genre, sont projet\xe9s."})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:"On suppose que les horaires ne sont pas fixes, proposez un sch\xe9ma\nconceptuel"}),"\n",(0,i.jsx)(n.img,{src:s(22856).A+"",width:"141",height:"392"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:"Il y a t'il des modifications \xe0 apporter au sch\xe9ma pr\xe9c\xe9dent si l'on suppose\nmaintenant que les films sont projet\xe9s \xe0 des horaires pr\xe9cises ? Par exemple,\ntous les films sont projet\xe9s, soit entre 16h et 18h, soit entre 20h et 22h,\netc. Si oui, adapter le sch\xe9ma conceptuel ..."}),"\n",(0,i.jsx)(n.img,{src:s(1187).A+"",width:"401",height:"399"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:"Comment modifier le sch\xe9ma conceptuel pour indiquer qu'\xe0 une horaire donn\xe9,\nil n'y a qu'un seul film ?"}),"\n",(0,i.jsx)(n.img,{src:s(95002).A+"",width:"401",height:"412"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"biblioth\xe8que-demprunts",children:"Biblioth\xe8que d'emprunts"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"On consid\xe8re une base de donn\xe9es pour g\xe9rer une biblioth\xe8que d'emprunts.\nL'interview des biblioth\xe9caire permet de d\xe9terminer les faits suivants :"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.em,{children:"un livre est caract\xe9ris\xe9 par un num\xe9ro, un \xe9diteur et un autre"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.em,{children:"un adh\xe9rent qui s'inscrit ) la biblioth\xe8que vers une caution"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.em,{children:"les emprunts durent au maximum 8 jours"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.em,{children:"on veut pouvoir obtenir, pour chaque adh\xe9rent les emprunts qu'il a effectu\xe9\n(nombre, num\xe9ro et titre du livre, date de l'emprunt) au cours des trois\nderniers mois"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.em,{children:"toutes les semaines, on \xe9dite la liste des emprunteurs en retard : nom et\nadresse de l'adh\xe9rent, date de l'emprunt, num\xe9ro et titre du livre concern\xe9"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.em,{children:"on veut enfin pouvoir conna\xeetre pour chaque livre la date d'achat et son \xe9tat"})}),"\n"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.em,{children:"\xc9laborer un diagramme entit\xe9-association pour cette base"}),"\n",(0,i.jsx)(n.img,{src:s(63413).A+"",width:"568",height:"168"}),"\n",(0,i.jsx)(n.img,{src:s(51788).A+"",width:"553",height:"426"})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"Donner un sch\xe9ma relationnel de cette base"})}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Livres(",(0,i.jsx)(n.em,{children:"Num\xe9ro Livre"}),", Titre, Date d'achat, \xc9tat, #id_personne)"]}),"\n",(0,i.jsxs)(n.p,{children:["Personnes(",(0,i.jsx)(n.em,{children:"Num\xe9ro personne"}),", Nom, pr\xe9nom)"]}),"\n",(0,i.jsx)(n.p,{children:"Emprunter(#num_livre, #num_personne, #id_emprunt)"}),"\n",(0,i.jsxs)(n.p,{children:["Emprunts(",(0,i.jsx)(n.em,{children:"id_emprunt"}),",date)"]}),"\n",(0,i.jsx)(n.p,{children:"EtreAuteur(#num_livre,#num_personne)"}),"\n",(0,i.jsxs)(n.ol,{start:"3",children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.em,{children:"Peut-on utiliser une seule relation contenant tous les attributs ? Pourquoi ?"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"passage-au-relationnel-synth\xe8se---le-cin\xe9ma-du-premier-art",children:"Passage au relationnel (synth\xe8se) - Le cin\xe9ma du premier art"}),"\n",(0,i.jsxs)(n.p,{children:["Donner un sch\xe9ma relationnel correspondant au sch\xe9ma conceptuel suivant\n",(0,i.jsx)(n.img,{src:s(17527).A+"",width:"810",height:"770"})]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.img,{src:s(2471).A+"",width:"642",height:"508"})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},17527:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/3-d7b02aacaeb33520b1a4339a2e833883.png"},22856:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/uml11-5ce1b5e957f595055e5858039855a0ce.png"},1187:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/uml12-cbd136783e37d6e5f7038e94b72e33e7.png"},95002:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/uml13-3145876de7f444404e1da2ebe2f4cf53.png"},63413:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/uml14-61e08f64c9a1e923c01fc9d77cfd7e79.png"},51788:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/uml15-06b8d3c0fdf36696ffe7b12c643133a1.png"},2471:(e,n,s)=>{s.d(n,{A:()=>i});const i=s.p+"assets/images/uml16-a8dba5d4187cc5356a627349d0b075a3.png"},28453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>d});var i=s(96540);const r={},t=i.createContext(r);function l(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);