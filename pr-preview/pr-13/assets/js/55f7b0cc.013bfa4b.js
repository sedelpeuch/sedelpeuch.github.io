"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[668],{86846:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>u});var r=i(74848),t=i(28453);const s={title:"Pr\xe9sentation de Nginx",description:"Pr\xe9sentation de Nginx, son but et ses exemples d'utilisation dans la vie r\xe9elle.",tags:["Nginx","Network","Devops"]},o=void 0,l={permalink:"/pr-preview/pr-13/blog/2024/03/24/02-network/nginx",source:"@site/blog/02-network/2024-03-24-nginx.md",title:"Pr\xe9sentation de Nginx",description:"Pr\xe9sentation de Nginx, son but et ses exemples d'utilisation dans la vie r\xe9elle.",date:"2024-03-24T00:00:00.000Z",tags:[{inline:!0,label:"Nginx",permalink:"/pr-preview/pr-13/blog/tags/nginx"},{inline:!0,label:"Network",permalink:"/pr-preview/pr-13/blog/tags/network"},{inline:!0,label:"Devops",permalink:"/pr-preview/pr-13/blog/tags/devops"}],readingTime:2.55,hasTruncateMarker:!0,authors:[],frontMatter:{title:"Pr\xe9sentation de Nginx",description:"Pr\xe9sentation de Nginx, son but et ses exemples d'utilisation dans la vie r\xe9elle.",tags:["Nginx","Network","Devops"]},unlisted:!1,prevItem:{title:"Diff\xe9rence entre un proxy et un reverse proxy",permalink:"/pr-preview/pr-13/blog/2024/03/31/02-network/proxy-vs-reverse-proxy"},nextItem:{title:"Docker pratiques de production",permalink:"/pr-preview/pr-13/blog/2024/03/17/03-containerization/docker-best-practices"}},a={authorsImageUrls:[]},u=[{value:"Qu&#39;est-ce que Nginx et pourquoi a-t-il \xe9t\xe9 cr\xe9\xe9 ?",id:"quest-ce-que-nginx-et-pourquoi-a-t-il-\xe9t\xe9-cr\xe9\xe9-",level:2},{value:"Exemples d&#39;utilisation de Nginx",id:"exemples-dutilisation-de-nginx",level:3},{value:"Fonctionnalit\xe9s de Nginx",id:"fonctionnalit\xe9s-de-nginx",level:2},{value:"Configuration de Nginx",id:"configuration-de-nginx",level:2},{value:"Conclusion",id:"conclusion",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"Nginx est un serveur web open-source con\xe7u pour g\xe9rer un grand nombre de connexions simultan\xe9es. Il couvre les fonctionnalit\xe9s de Nginx telles que l'\xe9quilibrage de charge, le caching, la s\xe9curit\xe9 et la compression, ainsi que des exemples d'utilisation dans la vie r\xe9elle."}),"\n",(0,r.jsx)(n.h2,{id:"quest-ce-que-nginx-et-pourquoi-a-t-il-\xe9t\xe9-cr\xe9\xe9-",children:"Qu'est-ce que Nginx et pourquoi a-t-il \xe9t\xe9 cr\xe9\xe9 ?"}),"\n",(0,r.jsx)(n.p,{children:"Nginx est un serveur web open-source qui a \xe9t\xe9 cr\xe9\xe9 pour g\xe9rer un grand nombre de connexions simultan\xe9es. Il a \xe9t\xe9 con\xe7u pour \xeatre rapide, l\xe9ger et efficace. Nginx est souvent utilis\xe9 comme serveur web, mais il peut \xe9galement \xeatre utilis\xe9 comme proxy inverse, \xe9quilibrage de charge, et serveur de cache."}),"\n",(0,r.jsx)(n.h3,{id:"exemples-dutilisation-de-nginx",children:"Exemples d'utilisation de Nginx"}),"\n",(0,r.jsx)(n.p,{children:"Nginx est souvent utilis\xe9 pour servir des pages web statiques et dynamiques. Il est capable de g\xe9rer des milliers de connexions simultan\xe9es avec une faible utilisation de la m\xe9moire."}),"\n",(0,r.jsx)(n.p,{children:"Nginx peut agir comme un proxy inverse pour distribuer les requ\xeates des clients \xe0 plusieurs serveurs backend. Cela permet de r\xe9partir la charge et d'am\xe9liorer les performances."}),"\n",(0,r.jsx)(n.p,{children:"Nginx peut \xeatre utilis\xe9 pour r\xe9partir les requ\xeates entrantes entre plusieurs serveurs, assurant ainsi une r\xe9partition \xe9quilibr\xe9e de la charge."}),"\n",(0,r.jsx)(n.p,{children:"Nginx peut mettre en cache les r\xe9ponses des serveurs backend pour r\xe9duire la charge et am\xe9liorer les temps de r\xe9ponse."}),"\n",(0,r.jsx)(n.h2,{id:"fonctionnalit\xe9s-de-nginx",children:"Fonctionnalit\xe9s de Nginx"}),"\n",(0,r.jsx)(n.p,{children:"L'\xe9quilibrage de charge est une fonctionnalit\xe9 cl\xe9 de Nginx. Il permet de distribuer les requ\xeates entrantes entre plusieurs serveurs backend. Nginx prend en charge plusieurs algorithmes d'\xe9quilibrage de charge, tels que le round-robin, le least connections, et l'IP hash."}),"\n",(0,r.jsx)(n.p,{children:"Nginx peut mettre en cache les r\xe9ponses des serveurs backend pour r\xe9duire la charge et am\xe9liorer les temps de r\xe9ponse. Le caching est particuli\xe8rement utile pour les contenus statiques qui ne changent pas fr\xe9quemment."}),"\n",(0,r.jsx)(n.p,{children:"Nginx offre plusieurs fonctionnalit\xe9s de s\xe9curit\xe9, telles que la gestion des certificats SSL/TLS, la limitation du nombre de connexions, et la protection contre les attaques DDoS. En utilisant Nginx comme proxy inverse, vous pouvez \xe9galement masquer les d\xe9tails de votre infrastructure backend."}),"\n",(0,r.jsx)(n.p,{children:"Nginx peut compresser les r\xe9ponses avant de les envoyer aux clients. Cela permet de r\xe9duire la quantit\xe9 de donn\xe9es transf\xe9r\xe9es et d'am\xe9liorer les temps de chargement des pages. Nginx prend en charge plusieurs formats de compression, tels que gzip et brotli."}),"\n",(0,r.jsx)(n.h2,{id:"configuration-de-nginx",children:"Configuration de Nginx"}),"\n",(0,r.jsx)(n.p,{children:"La configuration de Nginx se fait \xe0 l'aide de fichiers de configuration. Voici un exemple de configuration simple pour un serveur web :"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-nginx",children:"server {\n    listen 80;\n    server_name example.com;\n\n    location / {\n        root /var/www/html;\n        index index.html index.htm;\n    }\n\n    location /images/ {\n        root /data;\n    }\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Dans cet exemple, Nginx \xe9coute sur le port 80 et sert les fichiers du r\xe9pertoire ",(0,r.jsx)(n.code,{children:"/var/www/html"})," pour les requ\xeates \xe0 la racine. Les requ\xeates pour ",(0,r.jsx)(n.code,{children:"/images/"})," sont servies \xe0 partir du r\xe9pertoire ",(0,r.jsx)(n.code,{children:"/data"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,r.jsx)(n.p,{children:"Nginx est un outil puissant et polyvalent qui peut \xeatre utilis\xe9 pour une vari\xe9t\xe9 de t\xe2ches, allant de la simple diffusion de contenu web \xe0 l'\xe9quilibrage de charge et au caching. Sa flexibilit\xe9 et ses performances en font un choix populaire pour de nombreuses entreprises et d\xe9veloppeurs."}),"\n",(0,r.jsxs)(n.p,{children:["Pour en savoir plus sur Nginx, vous pouvez consulter la ",(0,r.jsx)(n.a,{href:"https://nginx.org/en/docs/",children:"documentation officielle"}),"."]})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>l});var r=i(96540);const t={},s=r.createContext(t);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);