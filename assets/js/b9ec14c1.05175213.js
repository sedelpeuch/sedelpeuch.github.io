"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[4699],{90724:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>u,contentTitle:()=>l,default:()=>d,frontMatter:()=>r,metadata:()=>t,toc:()=>c});var t=n(89733),i=n(74848),o=n(28453);const r={title:"Introduction \xe0 GitHub Actions",description:"D\xe9couvrez comment GitHub Actions peut automatiser vos workflows de d\xe9veloppement et de d\xe9ploiement.",tags:["CI/CD","GitHub","Devops"]},l=void 0,u={authorsImageUrls:[]},c=[{value:"Qu&#39;est-ce que GitHub Actions ?",id:"quest-ce-que-github-actions-",level:3},{value:"Pourquoi utiliser GitHub Actions ?",id:"pourquoi-utiliser-github-actions-",level:3},{value:"Marketplace et r\xe9utilisation",id:"marketplace-et-r\xe9utilisation",level:3},{value:"Concepts de base de GitHub Actions",id:"concepts-de-base-de-github-actions",level:2},{value:"\xc9v\xe9nements",id:"\xe9v\xe9nements",level:3},{value:"Actions",id:"actions",level:3},{value:"Workflows",id:"workflows",level:3},{value:"Exemple de workflow GitHub Actions",id:"exemple-de-workflow-github-actions",level:2},{value:"Les runners GitHub Actions",id:"les-runners-github-actions",level:2},{value:"Conclusion",id:"conclusion",level:2}];function a(e){const s={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.p,{children:"Dans le monde du d\xe9veloppement logiciel, l'automatisation est devenue une n\xe9cessit\xe9 pour am\xe9liorer l'efficacit\xe9 et r\xe9duire les erreurs humaines. GitHub Actions est une plateforme puissante qui permet d'automatiser les workflows de d\xe9veloppement et de d\xe9ploiement. Dans cet article, nous allons explorer les concepts de base de GitHub Actions, ses avantages, et fournir des exemples concrets pour vous aider \xe0 d\xe9marrer."}),"\n",(0,i.jsx)(s.h3,{id:"quest-ce-que-github-actions-",children:"Qu'est-ce que GitHub Actions ?"}),"\n",(0,i.jsx)(s.p,{children:"GitHub Actions est une plateforme d'automatisation des workflows de d\xe9veloppement et de d\xe9ploiement. Elle permet aux d\xe9veloppeurs d'automatiser des t\xe2ches r\xe9p\xe9titives, telles que les tests, les builds et les d\xe9ploiements, en utilisant des fichiers de configuration YAML."}),"\n",(0,i.jsx)(s.h3,{id:"pourquoi-utiliser-github-actions-",children:"Pourquoi utiliser GitHub Actions ?"}),"\n",(0,i.jsx)(s.p,{children:"GitHub Actions offre plusieurs avantages pour les d\xe9veloppeurs et les \xe9quipes DevOps :"}),"\n",(0,i.jsxs)(s.ol,{children:["\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Automatisation des workflows"})," : GitHub Actions permet d'automatiser les t\xe2ches r\xe9p\xe9titives, ce qui r\xe9duit les erreurs humaines et am\xe9liore l'efficacit\xe9."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Int\xe9gration continue (CI)"})," : Les workflows peuvent \xeatre configur\xe9s pour s'ex\xe9cuter automatiquement \xe0 chaque commit, garantissant que le code est toujours test\xe9 et pr\xeat \xe0 \xeatre d\xe9ploy\xe9."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"D\xe9ploiement continu (CD)"})," : GitHub Actions facilite le d\xe9ploiement automatique des applications sur diff\xe9rents environnements, tels que les serveurs de production, les environnements de test et les conteneurs Docker."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Flexibilit\xe9"})," : Les workflows peuvent \xeatre personnalis\xe9s pour r\xe9pondre aux besoins sp\xe9cifiques de chaque projet, en utilisant des actions pr\xe9d\xe9finies ou en cr\xe9ant des actions personnalis\xe9es."]}),"\n",(0,i.jsxs)(s.li,{children:[(0,i.jsx)(s.strong,{children:"Communaut\xe9 et \xe9cosyst\xe8me"})," : GitHub Actions b\xe9n\xe9ficie d'une large communaut\xe9 de d\xe9veloppeurs et d'un \xe9cosyst\xe8me riche en actions pr\xe9d\xe9finies, ce qui facilite l'int\xe9gration avec d'autres outils et services."]}),"\n"]}),"\n",(0,i.jsx)(s.h3,{id:"marketplace-et-r\xe9utilisation",children:"Marketplace et r\xe9utilisation"}),"\n",(0,i.jsx)(s.p,{children:"Le GitHub Marketplace est une ressource pr\xe9cieuse pour trouver des actions pr\xe9d\xe9finies cr\xe9\xe9es par la communaut\xe9. Vous pouvez r\xe9utiliser ces actions dans vos workflows pour automatiser des t\xe2ches courantes sans avoir \xe0 les coder vous-m\xeame. Cela permet de gagner du temps et de b\xe9n\xe9ficier des meilleures pratiques de la communaut\xe9."}),"\n",(0,i.jsx)(s.h2,{id:"concepts-de-base-de-github-actions",children:"Concepts de base de GitHub Actions"}),"\n",(0,i.jsx)(s.h3,{id:"\xe9v\xe9nements",children:"\xc9v\xe9nements"}),"\n",(0,i.jsx)(s.p,{children:"Les \xe9v\xe9nements sont des d\xe9clencheurs qui activent l'ex\xe9cution des workflows. Les \xe9v\xe9nements courants incluent les commits, les pull requests, les issues et les releases. Par exemple, un workflow peut \xeatre configur\xe9 pour s'ex\xe9cuter \xe0 chaque commit sur la branche principale."}),"\n",(0,i.jsx)(s.h3,{id:"actions",children:"Actions"}),"\n",(0,i.jsx)(s.p,{children:"Les actions sont des t\xe2ches individuelles qui composent un workflow. Elles peuvent \xeatre pr\xe9d\xe9finies ou personnalis\xe9es. Les actions pr\xe9d\xe9finies sont disponibles dans le GitHub Marketplace et couvrent une large gamme de t\xe2ches, telles que l'installation de d\xe9pendances, l'ex\xe9cution de tests et le d\xe9ploiement d'applications."}),"\n",(0,i.jsx)(s.h3,{id:"workflows",children:"Workflows"}),"\n",(0,i.jsxs)(s.p,{children:["Les workflows sont des fichiers de configuration YAML qui d\xe9finissent les actions \xe0 ex\xe9cuter en r\xe9ponse \xe0 des \xe9v\xe9nements sp\xe9cifiques. Un workflow peut contenir plusieurs jobs, chacun compos\xe9 de plusieurs \xe9tapes. Les workflows sont stock\xe9s dans le r\xe9pertoire ",(0,i.jsx)(s.code,{children:".github/workflows"})," du d\xe9p\xf4t."]}),"\n",(0,i.jsx)(s.h2,{id:"exemple-de-workflow-github-actions",children:"Exemple de workflow GitHub Actions"}),"\n",(0,i.jsx)(s.p,{children:"Voici un exemple de workflow GitHub Actions pour une application Node.js. Ce workflow s'ex\xe9cute \xe0 chaque commit sur la branche principale, installe les d\xe9pendances, ex\xe9cute les tests et d\xe9ploie l'application sur un serveur de production."}),"\n",(0,i.jsx)(s.pre,{children:(0,i.jsx)(s.code,{className:"language-yaml",children:"name: CI/CD Pipeline\n\non:\n  push:\n    branches:\n      - main\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout code\n        uses: actions/checkout@v2\n\n      - name: Set up Node.js\n        uses: actions/setup-node@v2\n        with:\n          node-version: '14'\n\n      - name: Install dependencies\n        run: npm install\n\n      - name: Run tests\n        run: npm test\n\n      - name: Deploy to production\n        run: |\n          ssh user@server 'cd /path/to/app && git pull && npm install && pm2 restart app'\n"})}),"\n",(0,i.jsx)(s.h2,{id:"les-runners-github-actions",children:"Les runners GitHub Actions"}),"\n",(0,i.jsx)(s.p,{children:"Les runners sont des machines virtuelles ou physiques qui ex\xe9cutent les jobs d\xe9finis dans les workflows. GitHub propose des runners h\xe9berg\xe9s, mais vous pouvez \xe9galement configurer vos propres runners auto-h\xe9berg\xe9s pour r\xe9pondre \xe0 des besoins sp\xe9cifiques. Les runners auto-h\xe9berg\xe9s offrent plus de contr\xf4le sur l'environnement d'ex\xe9cution et peuvent \xeatre utilis\xe9s pour des t\xe2ches n\xe9cessitant des ressources sp\xe9cifiques."}),"\n",(0,i.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(s.p,{children:"GitHub Actions est un outil puissant pour automatiser les workflows de d\xe9veloppement et de d\xe9ploiement. En utilisant des fichiers de configuration YAML, les d\xe9veloppeurs peuvent cr\xe9er des workflows personnalis\xe9s pour r\xe9pondre aux besoins sp\xe9cifiques de leurs projets. Avec GitHub Actions, les \xe9quipes DevOps peuvent am\xe9liorer l'efficacit\xe9, r\xe9duire les erreurs humaines et acc\xe9l\xe9rer le cycle de d\xe9veloppement."}),"\n",(0,i.jsxs)(s.p,{children:["Pour en savoir plus sur GitHub Actions, consultez la ",(0,i.jsx)(s.a,{href:"https://docs.github.com/en/actions",children:"documentation officielle"}),"."]})]})}function d(e={}){const{wrapper:s}={...(0,o.R)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>r,x:()=>l});var t=n(96540);const i={},o=t.createContext(i);function r(e){const s=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(o.Provider,{value:s},e.children)}},89733:e=>{e.exports=JSON.parse('{"permalink":"/blog/2024/02/22/04-ci-cd/github-actions","source":"@site/blog/04-ci-cd/2024-02-22-github-actions.md","title":"Introduction \xe0 GitHub Actions","description":"D\xe9couvrez comment GitHub Actions peut automatiser vos workflows de d\xe9veloppement et de d\xe9ploiement.","date":"2024-02-22T00:00:00.000Z","tags":[{"inline":true,"label":"CI/CD","permalink":"/blog/tags/ci-cd"},{"inline":true,"label":"GitHub","permalink":"/blog/tags/git-hub"},{"inline":true,"label":"Devops","permalink":"/blog/tags/devops"}],"readingTime":3.44,"hasTruncateMarker":true,"authors":[],"frontMatter":{"title":"Introduction \xe0 GitHub Actions","description":"D\xe9couvrez comment GitHub Actions peut automatiser vos workflows de d\xe9veloppement et de d\xe9ploiement.","tags":["CI/CD","GitHub","Devops"]},"unlisted":false,"prevItem":{"title":"Workflows","permalink":"/blog/2024/03/17/04-ci-cd/workflow"},"nextItem":{"title":"Diff\xe9rence entre un proxy et un reverse proxy","permalink":"/blog/2024/02/01/02-network/proxy-vs-reverse-proxy"}}')}}]);