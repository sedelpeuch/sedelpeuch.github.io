"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[9140],{93023:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>a,default:()=>o,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var t=n(85893),r=n(11151);const i={title:"Le Buffer Cache"},a=void 0,l={id:"enseirb/s7/prog_sys/3",title:"Le Buffer Cache",description:"Introduction au buffer cache",source:"@site/docs/enseirb/s7/prog_sys/3.md",sourceDirName:"enseirb/s7/prog_sys",slug:"/enseirb/s7/prog_sys/3",permalink:"/pr-preview/pr-5/docs/enseirb/s7/prog_sys/3",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Le Buffer Cache"},sidebar:"tutorialSidebar",previous:{title:"Syst\xe8me de Gestion de Fichiers",permalink:"/pr-preview/pr-5/docs/enseirb/s7/prog_sys/2"},next:{title:"La biblioth\xe8que standard",permalink:"/pr-preview/pr-5/docs/enseirb/s7/prog_sys/4"}},c={},u=[{value:"Introduction au buffer cache",id:"introduction-au-buffer-cache",level:2},{value:"Avantages et d\xe9savantages du buffer cache",id:"avantages-et-d\xe9savantages-du-buffer-cache",level:3},{value:"Le buffer cache, structures de donn\xe9es",id:"le-buffer-cache-structures-de-donn\xe9es",level:2},{value:"La liste doublement cha\xeenes des blocs libres",id:"la-liste-doublement-cha\xeenes-des-blocs-libres",level:3}];function d(e){const s={h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.h2,{id:"introduction-au-buffer-cache",children:"Introduction au buffer cache"}),"\n",(0,t.jsx)(s.p,{children:"Le buffer cache est un ensemble de structures de donn\xe9es et d'algorithme qui\npermettent de minimiser le nombre des acc\xe8s disque. Ce qui est tr\xe8s important\ncar les disque sont tr\xe8s lents relativement au CPU et un noyau qui se chargerait\nde toutes les entr\xe9es/sorties serait d'une grande lenteur et l'unit\xe9 de\ntraitement ne serait effectivement utilis\xe9 qu'\xe0 un faible pourcentage. Deux\nid\xe9es pour r\xe9duire le nombre des acc\xe8s disques :"}),"\n",(0,t.jsxs)(s.ol,{children:["\n",(0,t.jsx)(s.li,{children:"bufferiser les diff\xe9rentes commandes d'\xe9criture et de lecture de fa\xe7on \xe0\nfaire un acc\xe8s disque uniquement pour une quantit\xe9 de donn\xe9es de taille\nraisonnable"}),"\n",(0,t.jsx)(s.li,{children:"\xc9viter des \xe9critures inutiles quand les donn\xe9es peuvent encore \xeatre chang\xe9es"}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"avantages-et-d\xe9savantages-du-buffer-cache",children:"Avantages et d\xe9savantages du buffer cache"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"Un acc\xe8s uniforme au disque. Le noyau n'a pas \xe0 conna\xeetre la raison de\nl'entr\xe9e-sortie. Il copie les donn\xe9es depuis et vers des tampons (que ce\nsoient des donn\xe9es, des inodes ou le superbloc). Ce m\xe9canisme est modulaire et\ns'int\xe8gre facilement \xe0 l'ensemble du syst\xe8me qu'il rend plus facile \xe0 \xe9crire."}),"\n",(0,t.jsx)(s.li,{children:"Rend l'utilisation des entr\xe9es-sorties plus simple pour l'utilisateur qui n'ap\nas \xe0 se soucier des probl\xe8mes d'alignement, il rend les programmes portables\nsur d'autres UNIX."}),"\n",(0,t.jsx)(s.li,{children:"Il r\xe9duit le trafic disque et de ce fait augmente la capacit\xe9 du syst\xe8me."}),"\n",(0,t.jsx)(s.li,{children:"L'impl\xe9mentation du buffer cache rot\xe8ge contre certaines \xe9critures\nconcurrentes"}),"\n",(0,t.jsx)(s.li,{children:"L'\xe9criture diff\xe9r\xe9e pose un probl\xe8me dans le cas d'un crash syst\xe8me. En effet\nsi votre machine s'arr\xeate et que un blocs est marqu\xe9 \"\xe0 \xe9crire\" il n'ont pas\npas \xe9t\xe9s sauvegardes physiquement. L'int\xe9grit\xe9 des donn\xe9es n'est donc pas\nassur\xe9e en cas de crash."}),"\n",(0,t.jsx)(s.li,{children:"Le buffer cache n\xe9cessite que l'on effectue une recopie pour toute\nentr\xe9e-sortie. Dans le cas de transferts nombreux ceci ralentit les entr\xe9es\nsorties."}),"\n"]}),"\n",(0,t.jsx)(s.h2,{id:"le-buffer-cache-structures-de-donn\xe9es",children:"Le buffer cache, structures de donn\xe9es"}),"\n",(0,t.jsx)(s.p,{children:"Le statu d'un bloc cache est une combinaison des \xe9tats suivants :"}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"verrouill\xe9"})," l'acc\xe8s est r\xe9serv\xe9 \xe0 un processus"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"valide"})," (les donn\xe9es contenues dans le bloc sont valides)"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"\xe0 \xe9cire"})," les donn\xe9es du bloc doivent \xeatre \xe9crites sur disque avant de\nr\xe9allouer le bloc"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"actif"})," le noyau est en train d'\xe9crire/lire le bloc sur le disque"]}),"\n",(0,t.jsxs)(s.li,{children:[(0,t.jsx)(s.strong,{children:"attendu"})," un processus attend la lib\xe9ration du bloc"]}),"\n"]}),"\n",(0,t.jsx)(s.h3,{id:"la-liste-doublement-cha\xeenes-des-blocs-libres",children:"La liste doublement cha\xeenes des blocs libres"}),"\n",(0,t.jsx)(s.p,{children:"Les tampons libres appartiennent simultan\xe9ment \xe0 deux lites doublement\ncha\xeen\xe9es : la liste des blocs libres et la hash-liste correspondant au dernier\nbloc ayant \xe9t\xe9 contenu dans ce tampon. L'insertion dans la liste des tampons\nlibres se fait en fin de liste, la suppression se fait en d\xe9but de liste, ainsi\nle tampon allou\xe9 est le plus vieux tampon lib\xe9r\xe9. Ceci permet une r\xe9ponse\nimm\xe9diate si le bloc correspondant est r\xe9utilis\xe9 avant que le tampon ne soit\nallou\xe9 \xe0 un autre bloc."}),"\n",(0,t.jsx)("center",{children:(0,t.jsx)(s.p,{children:(0,t.jsx)(s.img,{src:n(74658).Z+"",width:"576",height:"666"})})})]})}function o(e={}){const{wrapper:s}={...(0,r.a)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},74658:(e,s,n)=>{n.d(s,{Z:()=>t});const t=n.p+"assets/images/SYS5-dbb760dbbdc51fcfd69c306e6ea41752.png"},11151:(e,s,n)=>{n.d(s,{Z:()=>l,a:()=>a});var t=n(67294);const r={},i=t.createContext(r);function a(e){const s=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),t.createElement(i.Provider,{value:s},e.children)}}}]);