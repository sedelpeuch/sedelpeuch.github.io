"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[1417],{1111:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>a,default:()=>c,frontMatter:()=>i,metadata:()=>u,toc:()=>l});var s=n(85893),r=n(11151);const i={title:"Le routage dans les r\xe9seaux"},a=void 0,u={id:"enseirb/s8/apptcp/4",title:"Le routage dans les r\xe9seaux",description:"Les r\xe9seaux sont reli\xe9s entre eux par des routeurs caract\xe9ris\xe9s par plusieurs",source:"@site/docs/enseirb/s8/apptcp/4.md",sourceDirName:"enseirb/s8/apptcp",slug:"/enseirb/s8/apptcp/4",permalink:"/pr-preview/pr-5/docs/enseirb/s8/apptcp/4",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Le routage dans les r\xe9seaux"},sidebar:"tutorialSidebar",previous:{title:"Le protocole HTTP - Le courrier \xe9lectronique",permalink:"/pr-preview/pr-5/docs/enseirb/s8/apptcp/3"},next:{title:"Calculabilit\xe9 et complexit\xe9 ",permalink:"/pr-preview/pr-5/docs/enseirb/s8/complex"}},o={},l=[{value:"Algorithme de routage",id:"algorithme-de-routage",level:2},{value:"Centralis\xe9 vs distribu\xe9",id:"centralis\xe9-vs-distribu\xe9",level:3},{value:"\xc0 la source vs saut par saut",id:"\xe0-la-source-vs-saut-par-saut",level:3},{value:"D\xe9terministe vs stochastique",id:"d\xe9terministe-vs-stochastique",level:3},{value:"\xc0 chemin unique vs \xe0 chemin multiple",id:"\xe0-chemin-unique-vs-\xe0-chemin-multiple",level:3},{value:"Statique vs dynamique",id:"statique-vs-dynamique",level:3}];function d(e){const t={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"Les r\xe9seaux sont reli\xe9s entre eux par des routeurs caract\xe9ris\xe9s par plusieurs\ninterfaces. Les routeurs sont charg\xe9s de l'acheminement des paquets IP. Les\npaquets IP portent dans leur en-t\xeate IP des adresses IP source et de\ndestination. Les routeurs d\xe9cident de la route \xe0 faire suivre aux paquets IP par\nconsultation d'une table de routage. La cr\xe9ation / MAJ des tables de routages\nest une op\xe9ration importante et cruciale dans les r\xe9seaux. La table de routage\npeut \xeatre manuelle, statique ou dynamique."}),"\n",(0,s.jsx)(t.h2,{id:"algorithme-de-routage",children:"Algorithme de routage"}),"\n",(0,s.jsx)(t.p,{children:"Le r\xf4le de l'algorithme de routage est de chosir un chemin optimal suivi par les\npaquets \xe0 acheminer en utilisant la topologie du sous-r\xe9seau et en fonction de\ncrit\xe8res donn\xe9s (m\xe9triques). L'utilisation du chemin optimal, qui n'est pas\nforc\xe9ment le plus court : il peut s'agir du chemin au d\xe9lai le plus court, du\nchemin le plus s\xe9curis\xe9, du chemin le moins cher, ou tout simplement du chemin\nutilisant le moins de sauts."}),"\n",(0,s.jsx)(t.h3,{id:"centralis\xe9-vs-distribu\xe9",children:"Centralis\xe9 vs distribu\xe9"}),"\n",(0,s.jsx)(t.p,{children:"En routage centralis\xe9, un noeud central se charge de collecter les informations\nsur chaque lien (on/off, utilisation capacit\xe9) et de calculer la table de\nroutage pour chaque noeud du r\xe9seau (envisageable lorsque le r\xe9seau est\nadministr\xe9 de fa\xe7on centralis\xe9e et qu'il n'est pas trop grand). En routage\nd\xe9centralis\xe9, les routeurs coop\xe8rent selon un protocole de routage distribu\xe9 de\nfa\xe7on \xe0 construire des tables de routages consistances. (Internet pr\xe9f\xe8re le\ndistribu\xe9 pour des raisons de taille)"}),"\n",(0,s.jsx)(t.h3,{id:"\xe0-la-source-vs-saut-par-saut",children:"\xc0 la source vs saut par saut"}),"\n",(0,s.jsx)(t.p,{children:"En routage \xe0 la source, un paquet peut transporter toute sa route (ie la liste\n\xe9ventuellement exhaustive de tous les noeuds entre sa source et sa destination).\nL'utilisation des options IPv4 et IPv6 impliquent du routage \xe0 la source. en\nroutage saut par saut, un paquet ne v\xe9hicule que l'adresse de la destination."}),"\n",(0,s.jsx)(t.h3,{id:"d\xe9terministe-vs-stochastique",children:"D\xe9terministe vs stochastique"}),"\n",(0,s.jsx)(t.p,{children:"En routage d\xe9temriniste, tous les paquets vers une m\xeame destination seront\nretransmis au m\xeame noeud suivant. En routage stochastique, chaque routeur\nmaintient plusieurs noeuds aval pour une m\xeame destination, ce qui permet de\nlimiter les oscillations de trafic. (Internet utilise le d\xe9terministe, car cela\npermet de minimiser le d\xe9s\xe9quencement des paquets)"}),"\n",(0,s.jsx)(t.h3,{id:"\xe0-chemin-unique-vs-\xe0-chemin-multiple",children:"\xc0 chemin unique vs \xe0 chemin multiple"}),"\n",(0,s.jsx)(t.p,{children:"En routage \xe0 chemin multiple, chaque routeur maintient une route principale et\ndes routes alternatives qu'il peut utiliser en cas d'indisponibilit\xe9s de la\nroute principale"}),"\n",(0,s.jsx)(t.h3,{id:"statique-vs-dynamique",children:"Statique vs dynamique"}),"\n",(0,s.jsx)(t.p,{children:"En routage dynamique le choix de la route d\xe9pend de l'actuelle mesure de l'\xe9tat\ndu r\xe9seau. LE routage dynamique peut donc aider au contr\xf4le de congestion mais\npeut aussi introduire des oscillations."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"fonction Dijkstra(G: graphe \xe0 arcs pond\xe9r\xe9s, s: sommet):(fonction V_G -> R, fonction V_G -> V_G)\n    (d,p\xe8re) = relacherInit(G,s)\n    Y = V_G\n    \n    tant que Y n'est pas l'ensemble vide faire\n        extraire un \xe9l\xe9ment u de Y de valeur d minimale\n        pour chaque successeur v de u faire\n            si v appartient \xe0 Y faire\n                relacher(u,v,G,d,p\xe8re)\n    retourner(d,p\xe8re)\n\nproc\xe9dure relacherInit(G: graphe \xe0 arcs pond\xe9r\xe9s, s: sommet):(tableau V_G -> R, tableau V_G -> V_G)\n    d = tableau indic\xe9 par V_G initialis\xe9 \xe0 l'infini\n    p\xe8re = tableau indic\xe9 par V_G initialis\xe9 \xe0 NULL\n    d[s] = 0\n    retourner (d,p\xe8re)\n    \nproc\xe9dure relacher(u:sommet, v:sommet, G:graphe \xe0 arcs pond\xe9r\xe9s, d: tableau, V_G -> R, p\xe8re : tableau V_G -> V_G)\n    si d(v) > d(u) + poids(u,v)\n        d[v] = d(u) + poids(u,v)\n        p\xe8re[v] = u\n"})}),"\n",(0,s.jsx)(t.p,{children:"O((a+n)log n) => a = nbr arcs , n = nbr sommets"}),"\n",(0,s.jsx)(t.p,{children:"(O(a + s log n)) si tas de fibo"})]})}function c(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>u,a:()=>a});var s=n(67294);const r={},i=s.createContext(r);function a(e){const t=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function u(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),s.createElement(i.Provider,{value:t},e.children)}}}]);