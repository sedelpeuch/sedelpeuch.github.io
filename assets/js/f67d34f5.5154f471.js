"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[9816],{14631:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var r=s(74848),t=s(28453);const i={title:"Runner GitHub Self-Hosted",description:"Explication de la cr\xe9ation et de l'installation d'un nouveau runner au niveau de l'organisation",tags:["CI/CD","GitHub","Devops"]},o=void 0,a={permalink:"/blog/2024/02/11/04-ci-cd/self-host-runner",source:"@site/blog/04-ci-cd/2024-02-11-self-host-runner.md",title:"Runner GitHub Self-Hosted",description:"Explication de la cr\xe9ation et de l'installation d'un nouveau runner au niveau de l'organisation",date:"2024-02-11T00:00:00.000Z",tags:[{inline:!0,label:"CI/CD",permalink:"/blog/tags/ci-cd"},{inline:!0,label:"GitHub",permalink:"/blog/tags/git-hub"},{inline:!0,label:"Devops",permalink:"/blog/tags/devops"}],readingTime:2.35,hasTruncateMarker:!0,authors:[],frontMatter:{title:"Runner GitHub Self-Hosted",description:"Explication de la cr\xe9ation et de l'installation d'un nouveau runner au niveau de l'organisation",tags:["CI/CD","GitHub","Devops"]},unlisted:!1,prevItem:{title:"GitHub GHCR",permalink:"/blog/2024/02/18/03-containerization/ghrc"},nextItem:{title:"Actions Composites",permalink:"/blog/2024/02/04/04-ci-cd/action"}},c={authorsImageUrls:[]},l=[{value:"Cr\xe9er une action <code>self-hosted</code>",id:"cr\xe9er-une-action-self-hosted",level:2},{value:"Mettre en place le runner sous forme de service",id:"mettre-en-place-le-runner-sous-forme-de-service",level:2}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:["Un ",(0,r.jsx)(n.code,{children:"runner"})," est une machine virtuelle ou physique qui ex\xe9cute des ",(0,r.jsx)(n.code,{children:"jobs"})," dans un ",(0,r.jsx)(n.code,{children:"workflow"}),". Les ",(0,r.jsx)(n.code,{children:"runners"})," peuvent \xeatre h\xe9berg\xe9s par GitHub ou auto-h\xe9berg\xe9s. Les ",(0,r.jsx)(n.code,{children:"runners"})," h\xe9berg\xe9s par GitHub sont ex\xe9cut\xe9s dans un environnement de cloud partag\xe9 et sont g\xe9r\xe9s par GitHub et peuvent entrainer des surcouts. Les ",(0,r.jsx)(n.code,{children:"runners"})," auto-h\xe9berg\xe9s sont ex\xe9cut\xe9s sur une machine que vous poss\xe9dez et g\xe9rez."]}),"\n",(0,r.jsxs)(n.p,{children:["Pour t\xe9l\xe9charger un nouveau ",(0,r.jsx)(n.code,{children:"runner"}),", ex\xe9cutez les lignes suivantes"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:'# Create a folder\nmkdir actions-runner && cd actions-runner\n# Download the latest runner package\ncurl -o actions-runner-linux-x64-2.312.0.tar.gz -L <https://github.com/actions/runner/releases/download/v2.312.0/actions-runner-linux-x64-2.312.0.tar.gz> # ! update this documentation with the latest release\n# Optional: Validate the hash\necho "85c1bbd104d539f666a89edef70a18db2596df374a1b51670f2af1578ecbe031  actions-runner-linux-x64-2.312.0.tar.gz" | shasum -a 256 -c\n# Extract the installer\ntar xzf ./actions-runner-linux-x64-2.312.0.tar.gz\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Il est ensuite n\xe9cessaire de configurer votre ",(0,r.jsx)(n.code,{children:"runner"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"# Create the runner and start the configuration experience\n./config.sh --url <https://github.com/><org>/<repo> --token <token># Last step, run it!\n./run.sh\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsxs)(n.p,{children:["Le token est \xe0 obtenir au pr\xe8s d\u2019un ",(0,r.jsx)(n.code,{children:"owner"})," de l\u2019organisation accessible sur le lien suivant ",(0,r.jsx)(n.a,{href:"https://github.com/organizations/org/settings/actions/runners/new?arch=x64&os=linux",children:"https://github.com/organizations/"})]})}),"\n",(0,r.jsxs)(n.p,{children:["\u27a1\ufe0f Lors de la configuration, il est possible d'ajouter des ",(0,r.jsx)(n.strong,{children:"labels"})," pour identifier la machine (par exemple ",(0,r.jsx)(n.code,{children:"GPU"}),")."]}),"\n",(0,r.jsxs)(n.h2,{id:"cr\xe9er-une-action-self-hosted",children:["Cr\xe9er une action ",(0,r.jsx)(n.code,{children:"self-hosted"})]}),"\n",(0,r.jsxs)(n.p,{children:["Il n\u2019est pas possible de cr\xe9er une action visant une machine ",(0,r.jsx)(n.code,{children:"self-hosted"})," particuli\xe8re (\xe0 confirmer). Chaque ",(0,r.jsx)(n.code,{children:"repository"})," d\u2019une organisation peut acc\xe9der \xe0 :"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Toutes les machines dans le groupe ",(0,r.jsx)(n.code,{children:"D\xe9faut"})," qui sont automatiquement partag\xe9es \xe0 tous les d\xe9p\xf4ts."]}),"\n",(0,r.jsxs)(n.li,{children:["Toutes les machines dans un groupe ",(0,r.jsx)(n.code,{children:"Name"})," qui sont manuellement partag\xe9es au d\xe9p\xf4t concern\xe9 (l\u2019affectation manuelle des d\xe9p\xf4ts \xe0 des groupes de machines nous encourage \xe0 ne pas utiliser ceci sauf cas particulier)"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Parmi les machines disponibles le ",(0,r.jsx)(n.code,{children:"repository"})," peut demander d\u2019utiliser une machine en fonction de son ",(0,r.jsx)(n.code,{children:"label"})," par exemple l\u2019action ci-dessous, permettant de v\xe9rifier que le d\xe9p\xf4t est compilable sous ROS, r\xe9quisitionne une machine ayant le label ",(0,r.jsx)(n.code,{children:"Robotics"}),". Ceci est modifiable \xe0 la ligne ",(0,r.jsx)(n.code,{children:"runs-on: Robotics"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"name: CI\n\non: [pull_request]\n\njobs:\n  industrial_ci:\n    strategy:\n      matrix:\n        env:\n          - {ROS_DISTRO: melodic, ROS_REPO: main}\n    runs-on: Robotics\n    steps:\n      - uses: actions/checkout@v3\n      - uses: 'ros-industrial/industrial_ci@master'\n        env: ${{matrix.env}}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Lors de la premi\xe8re utilisation, si vous rencontrez un erreur ",(0,r.jsx)(n.code,{children:"docker"})," sp\xe9cifiant un manque de permission, il est n\xe9cessaire de taper la commande suivante sur la machine distance ",(0,r.jsx)(n.code,{children:"sudo setfacl --modify user:<user>:rw /var/run/docker.sock"}),"\nLorsqu\u2019une action est cr\xe9\xe9 en ",(0,r.jsx)(n.code,{children:"self-hosted"})," il est fortement conseill\xe9 de mettre les actions dans un ",(0,r.jsx)(n.code,{children:"container"}),". Lorsque c\u2019est impossible (comme ",(0,r.jsx)(n.code,{children:"tailscale"}),") il est n\xe9cessaire d\u2019ajouer un clean de l\u2019environnement \xe0 la fin de l\u2019action en ajoutant cette ",(0,r.jsx)(n.code,{children:"step"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"- name: Clean runner\n  if: always()\n  run: rm -rf ${{ github.workspace }}/*\n"})}),"\n",(0,r.jsx)(n.h2,{id:"mettre-en-place-le-runner-sous-forme-de-service",children:"Mettre en place le runner sous forme de service"}),"\n",(0,r.jsxs)(n.p,{children:["Dans le dossier de votre ",(0,r.jsx)(n.code,{children:"runnner"})," sur la machine, transformer le ",(0,r.jsx)(n.code,{children:"./run.sh"})," en service, tapez simplement les lignes ci-dessous pour que le ",(0,r.jsx)(n.code,{children:"runner"})," s\u2019active au d\xe9marrage de la machine."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-shell",children:"sudo ./svc.sh install\nsudo ./svc.sh start\n"})})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>a});var r=s(96540);const t={},i=r.createContext(t);function o(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);