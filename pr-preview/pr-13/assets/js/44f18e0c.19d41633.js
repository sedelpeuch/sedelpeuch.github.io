"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[4894],{67371:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>i,metadata:()=>t,toc:()=>d});var r=n(74848),o=n(28453);const i={title:"Docker Compose",description:"Explication de Docker Compose",tags:["Docker","Docker Compose","Devops","Containerization"]},c=void 0,t={permalink:"/pr-preview/pr-13/blog/2024/04/07/03-containerization/docker-compose",source:"@site/blog/03-containerization/2024-04-07-docker-compose.md",title:"Docker Compose",description:"Explication de Docker Compose",date:"2024-04-07T00:00:00.000Z",tags:[{inline:!0,label:"Docker",permalink:"/pr-preview/pr-13/blog/tags/docker"},{inline:!0,label:"Docker Compose",permalink:"/pr-preview/pr-13/blog/tags/docker-compose"},{inline:!0,label:"Devops",permalink:"/pr-preview/pr-13/blog/tags/devops"},{inline:!0,label:"Containerization",permalink:"/pr-preview/pr-13/blog/tags/containerization"}],readingTime:9.87,hasTruncateMarker:!0,authors:[],frontMatter:{title:"Docker Compose",description:"Explication de Docker Compose",tags:["Docker","Docker Compose","Devops","Containerization"]},unlisted:!1,prevItem:{title:"FastAPI",permalink:"/pr-preview/pr-13/blog/2024/08/26/09-scripting/fastapi"},nextItem:{title:"Diff\xe9rence entre un proxy et un reverse proxy",permalink:"/pr-preview/pr-13/blog/2024/03/31/02-network/proxy-vs-reverse-proxy"}},l={authorsImageUrls:[]},d=[{value:"Qu&#39;est-ce que Docker Compose ?",id:"quest-ce-que-docker-compose-",level:2},{value:"Exemple de fichier Docker Compose",id:"exemple-de-fichier-docker-compose",level:2},{value:"Commandes Docker Compose",id:"commandes-docker-compose",level:2},{value:"Sch\xe9ma explicatif",id:"sch\xe9ma-explicatif",level:2},{value:"D\xe9monstration pratique",id:"d\xe9monstration-pratique",level:2},{value:"Avantages cl\xe9s de Docker Compose",id:"avantages-cl\xe9s-de-docker-compose",level:2},{value:"Environnements de d\xe9veloppement",id:"environnements-de-d\xe9veloppement",level:3},{value:"Environnements de test automatis\xe9s",id:"environnements-de-test-automatis\xe9s",level:3},{value:"D\xe9ploiements sur un seul h\xf4te",id:"d\xe9ploiements-sur-un-seul-h\xf4te",level:3},{value:"Utilisation des secrets avec Docker Compose",id:"utilisation-des-secrets-avec-docker-compose",level:2},{value:"Support des GPU avec Docker Compose",id:"support-des-gpu-avec-docker-compose",level:2},{value:"Utilisation de la surveillance des fichiers avec Docker Compose",id:"utilisation-de-la-surveillance-des-fichiers-avec-docker-compose",level:2},{value:"R\xe9seau dans Compose",id:"r\xe9seau-dans-compose",level:2},{value:"Mise \xe0 jour des conteneurs sur le r\xe9seau",id:"mise-\xe0-jour-des-conteneurs-sur-le-r\xe9seau",level:3},{value:"R\xe9seau multi-h\xf4te",id:"r\xe9seau-multi-h\xf4te",level:3},{value:"Sp\xe9cifier des r\xe9seaux personnalis\xe9s",id:"sp\xe9cifier-des-r\xe9seaux-personnalis\xe9s",level:3},{value:"Configurer le r\xe9seau par d\xe9faut",id:"configurer-le-r\xe9seau-par-d\xe9faut",level:3},{value:"Utiliser un r\xe9seau pr\xe9existant",id:"utiliser-un-r\xe9seau-pr\xe9existant",level:3},{value:"Conclusion",id:"conclusion",level:2}];function a(e){const s={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.p,{children:"Docker Compose est un outil puissant qui permet de d\xe9finir et de g\xe9rer des applications multi-conteneurs Docker. Il utilise un fichier YAML pour configurer les services de l'application. Ensuite, avec une seule commande, vous pouvez cr\xe9er et d\xe9marrer tous les services \xe0 partir de votre configuration."}),"\n",(0,r.jsx)(s.h2,{id:"quest-ce-que-docker-compose-",children:"Qu'est-ce que Docker Compose ?"}),"\n",(0,r.jsx)(s.p,{children:"Docker Compose est un outil qui permet de d\xe9finir et de g\xe9rer des applications multi-conteneurs Docker. Il utilise un fichier YAML pour configurer les services de l'application. Ensuite, avec une seule commande, vous pouvez cr\xe9er et d\xe9marrer tous les services \xe0 partir de votre configuration."}),"\n",(0,r.jsx)(s.h2,{id:"exemple-de-fichier-docker-compose",children:"Exemple de fichier Docker Compose"}),"\n",(0,r.jsxs)(s.p,{children:["Voici un exemple de fichier ",(0,r.jsx)(s.code,{children:"docker-compose.yml"})," pour une application web simple avec un service web et une base de donn\xe9es :"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"version: '3'\nservices:\n  web:\n    image: nginx:alpine\n    ports:\n      - \"80:80\"\n  db:\n    image: postgres:alpine\n    environment:\n      POSTGRES_DB: exampledb\n      POSTGRES_USER: exampleuser\n      POSTGRES_PASSWORD: examplepass\n"})}),"\n",(0,r.jsxs)(s.p,{children:["Dans cet exemple, nous avons deux services : ",(0,r.jsx)(s.code,{children:"web"})," et ",(0,r.jsx)(s.code,{children:"db"}),". Le service ",(0,r.jsx)(s.code,{children:"web"})," utilise l'image ",(0,r.jsx)(s.code,{children:"nginx:alpine"})," et mappe le port 80 du conteneur au port 80 de l'h\xf4te. Le service ",(0,r.jsx)(s.code,{children:"db"})," utilise l'image ",(0,r.jsx)(s.code,{children:"postgres:alpine"})," et d\xe9finit quelques variables d'environnement pour configurer la base de donn\xe9es."]}),"\n",(0,r.jsx)(s.h2,{id:"commandes-docker-compose",children:"Commandes Docker Compose"}),"\n",(0,r.jsx)(s.p,{children:"Voici quelques commandes Docker Compose couramment utilis\xe9es :"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"docker-compose up"})," : Cr\xe9e et d\xe9marre les conteneurs d\xe9finis dans le fichier ",(0,r.jsx)(s.code,{children:"docker-compose.yml"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"docker-compose down"})," : Arr\xeate et supprime les conteneurs, les r\xe9seaux et les volumes cr\xe9\xe9s par ",(0,r.jsx)(s.code,{children:"docker-compose up"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"docker-compose ps"})," : Affiche l'\xe9tat des conteneurs d\xe9finis dans le fichier ",(0,r.jsx)(s.code,{children:"docker-compose.yml"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"docker-compose logs"})," : Affiche les logs des conteneurs."]}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"sch\xe9ma-explicatif",children:"Sch\xe9ma explicatif"}),"\n",(0,r.jsx)(s.p,{children:"Voici un sch\xe9ma expliquant comment Docker Compose fonctionne :"}),"\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.img,{src:"https://www.biaudelle.fr/wp-content/uploads/2021/07/docker-compose-archi.png",alt:"Sch\xe9ma Docker Compose"})}),"\n",(0,r.jsx)(s.h2,{id:"d\xe9monstration-pratique",children:"D\xe9monstration pratique"}),"\n",(0,r.jsx)(s.p,{children:"Pour mieux comprendre l'utilisation de Docker Compose, voici une d\xe9monstration pratique :"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"docker network create mynetwork\ndocker-compose up -d\ndocker-compose ps\n"})}),"\n",(0,r.jsxs)(s.p,{children:["Ouvrez votre navigateur et acc\xe9dez \xe0 ",(0,r.jsx)(s.code,{children:"http://localhost"}),"."]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-bash",children:"docker-compose down\n"})}),"\n",(0,r.jsx)(s.h2,{id:"avantages-cl\xe9s-de-docker-compose",children:"Avantages cl\xe9s de Docker Compose"}),"\n",(0,r.jsx)(s.p,{children:"L'utilisation de Docker Compose offre plusieurs avantages qui simplifient le d\xe9veloppement, le d\xe9ploiement et la gestion des applications conteneuris\xe9es :"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Contr\xf4le simplifi\xe9"})," : Docker Compose vous permet de d\xe9finir et de g\xe9rer des applications multi-conteneurs dans un seul fichier YAML. Cela simplifie la t\xe2che complexe d'orchestrer et de coordonner divers services, rendant plus facile la gestion et la r\xe9plication de votre environnement applicatif."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Collaboration efficace"})," : Les fichiers de configuration Docker Compose sont faciles \xe0 partager, facilitant la collaboration entre les d\xe9veloppeurs, les \xe9quipes d'exploitation et les autres parties prenantes. Cette approche collaborative conduit \xe0 des flux de travail plus fluides, une r\xe9solution des probl\xe8mes plus rapide et une efficacit\xe9 globale accrue."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"D\xe9veloppement rapide d'applications"})," : Compose met en cache la configuration utilis\xe9e pour cr\xe9er un conteneur. Lorsque vous red\xe9marrez un service qui n'a pas chang\xe9, Compose r\xe9utilise les conteneurs existants. La r\xe9utilisation des conteneurs signifie que vous pouvez apporter des modifications \xe0 votre environnement tr\xe8s rapidement."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Portabilit\xe9 entre les environnements"})," : Compose prend en charge les variables dans le fichier Compose. Vous pouvez utiliser ces variables pour personnaliser votre composition pour diff\xe9rents environnements ou diff\xe9rents utilisateurs."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.strong,{children:"Communaut\xe9 et support \xe9tendus"})," : Docker Compose b\xe9n\xe9ficie d'une communaut\xe9 dynamique et active, ce qui signifie des ressources abondantes, des tutoriels et un support. Cet \xe9cosyst\xe8me communautaire contribue \xe0 l'am\xe9lioration continue de Docker Compose et aide les utilisateurs \xe0 r\xe9soudre efficacement les probl\xe8mes."]}),"\n"]}),"\n",(0,r.jsx)(s.p,{children:"Compose peut \xeatre utilis\xe9 de nombreuses mani\xe8res diff\xe9rentes. Voici quelques cas d'utilisation courants."}),"\n",(0,r.jsx)(s.h3,{id:"environnements-de-d\xe9veloppement",children:"Environnements de d\xe9veloppement"}),"\n",(0,r.jsx)(s.p,{children:"Lorsque vous d\xe9veloppez des logiciels, la capacit\xe9 \xe0 ex\xe9cuter une application dans un environnement isol\xe9 et \xe0 interagir avec elle est cruciale. L'outil en ligne de commande Compose peut \xeatre utilis\xe9 pour cr\xe9er l'environnement et interagir avec lui."}),"\n",(0,r.jsxs)(s.p,{children:["Le fichier Compose fournit un moyen de documenter et de configurer toutes les d\xe9pendances de service de l'application (bases de donn\xe9es, files d'attente, caches, API de services web, etc.). En utilisant l'outil en ligne de commande Compose, vous pouvez cr\xe9er et d\xe9marrer un ou plusieurs conteneurs pour chaque d\xe9pendance avec une seule commande (",(0,r.jsx)(s.code,{children:"docker compose up"}),")."]}),"\n",(0,r.jsx)(s.p,{children:'Ensemble, ces fonctionnalit\xe9s offrent un moyen pratique de d\xe9marrer un projet. Compose peut r\xe9duire un "guide de d\xe9marrage pour les d\xe9veloppeurs" de plusieurs pages \xe0 un seul fichier Compose lisible par machine et quelques commandes.'}),"\n",(0,r.jsx)(s.h3,{id:"environnements-de-test-automatis\xe9s",children:"Environnements de test automatis\xe9s"}),"\n",(0,r.jsx)(s.p,{children:"Une partie importante de tout processus de d\xe9ploiement continu ou d'int\xe9gration continue est la suite de tests automatis\xe9s. Les tests automatis\xe9s de bout en bout n\xe9cessitent un environnement dans lequel ex\xe9cuter les tests. Compose fournit un moyen pratique de cr\xe9er et de d\xe9truire des environnements de test isol\xe9s pour votre suite de tests. En d\xe9finissant l'environnement complet dans un fichier Compose, vous pouvez cr\xe9er et d\xe9truire ces environnements en quelques commandes seulement."}),"\n",(0,r.jsx)(s.h3,{id:"d\xe9ploiements-sur-un-seul-h\xf4te",children:"D\xe9ploiements sur un seul h\xf4te"}),"\n",(0,r.jsx)(s.p,{children:"Compose a traditionnellement \xe9t\xe9 ax\xe9 sur les flux de travail de d\xe9veloppement et de test, mais \xe0 chaque nouvelle version, nous progressons sur des fonctionnalit\xe9s plus orient\xe9es vers la production."}),"\n",(0,r.jsxs)(s.p,{children:["Pour plus de d\xe9tails sur l'utilisation des fonctionnalit\xe9s orient\xe9es production, consultez ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/compose/production/",children:"Compose en production"}),"."]}),"\n",(0,r.jsx)(s.h2,{id:"utilisation-des-secrets-avec-docker-compose",children:"Utilisation des secrets avec Docker Compose"}),"\n",(0,r.jsx)(s.p,{children:"Docker Compose permet \xe9galement de g\xe9rer les secrets de mani\xe8re s\xe9curis\xe9e. Les secrets sont des informations sensibles telles que des mots de passe, des cl\xe9s API, etc., qui ne doivent pas \xeatre expos\xe9es dans le code source."}),"\n",(0,r.jsxs)(s.p,{children:["Voici un exemple de configuration de secrets dans un fichier ",(0,r.jsx)(s.code,{children:"docker-compose.yml"})," :"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"version: '3.7'\nservices:\n  web:\n    image: nginx:alpine\n    secrets:\n      - my_secret\nsecrets:\n  my_secret:\n    file: ./my_secret.txt\n"})}),"\n",(0,r.jsxs)(s.p,{children:["Dans cet exemple, le service ",(0,r.jsx)(s.code,{children:"web"})," utilise un secret nomm\xe9 ",(0,r.jsx)(s.code,{children:"my_secret"})," qui est d\xe9fini dans le fichier ",(0,r.jsx)(s.code,{children:"my_secret.txt"}),"."]}),"\n",(0,r.jsx)(s.h2,{id:"support-des-gpu-avec-docker-compose",children:"Support des GPU avec Docker Compose"}),"\n",(0,r.jsx)(s.p,{children:"Docker Compose prend \xe9galement en charge l'utilisation des GPU pour les applications n\xe9cessitant des capacit\xe9s de calcul intensif, telles que l'apprentissage automatique et le traitement d'images."}),"\n",(0,r.jsx)(s.p,{children:"Voici un exemple de configuration pour utiliser un GPU avec Docker Compose :"}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"version: '3.8'\nservices:\n  gpu_service:\n    image: nvidia/cuda:10.2-base\n    deploy:\n      resources:\n        reservations:\n          devices:\n            - capabilities: [gpu]\n"})}),"\n",(0,r.jsxs)(s.p,{children:["Dans cet exemple, le service ",(0,r.jsx)(s.code,{children:"gpu_service"})," utilise l'image ",(0,r.jsx)(s.code,{children:"nvidia/cuda:10.2-base"})," et r\xe9serve un GPU pour le conteneur."]}),"\n",(0,r.jsx)(s.h2,{id:"utilisation-de-la-surveillance-des-fichiers-avec-docker-compose",children:"Utilisation de la surveillance des fichiers avec Docker Compose"}),"\n",(0,r.jsx)(s.p,{children:"Docker Compose permet \xe9galement de surveiller les modifications des fichiers et de red\xe9marrer automatiquement les services concern\xe9s. Cela est particuli\xe8rement utile pour les environnements de d\xe9veloppement."}),"\n",(0,r.jsxs)(s.p,{children:["Voici un exemple de configuration de surveillance des fichiers dans un fichier ",(0,r.jsx)(s.code,{children:"docker-compose.yml"})," :"]}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-yaml",children:"version: '3.8'\nservices:\n  web:\n    image: nginx:alpine\n    volumes:\n      - ./src:/usr/share/nginx/html\n    command: sh -c \"nginx -g 'daemon off;'\"\n    file_watch:\n      watch: ./src\n      action: restart\n"})}),"\n",(0,r.jsxs)(s.p,{children:["Dans cet exemple, le service ",(0,r.jsx)(s.code,{children:"web"})," surveille les modifications dans le r\xe9pertoire ",(0,r.jsx)(s.code,{children:"./src"})," et red\xe9marre automatiquement le service lorsque des modifications sont d\xe9tect\xe9es."]}),"\n",(0,r.jsx)(s.h2,{id:"r\xe9seau-dans-compose",children:"R\xe9seau dans Compose"}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Important"})}),"\n",(0,r.jsx)(s.p,{children:"La documentation de Docker se r\xe9f\xe8re et d\xe9crit les fonctionnalit\xe9s de Compose V2."}),"\n",(0,r.jsxs)(s.p,{children:["\xc0 partir de juillet 2023, Compose V1 a cess\xe9 de recevoir des mises \xe0 jour et n'est plus inclus dans les nouvelles versions de Docker Desktop. Compose V2 l'a remplac\xe9 et est maintenant int\xe9gr\xe9 dans toutes les versions actuelles de Docker Desktop. Pour plus d'informations, consultez ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/compose/migrate",children:"Migrer vers Compose V2"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Par d\xe9faut, Compose configure un seul ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/reference/cli/docker/network/create/",children:"r\xe9seau"})," pour votre application. Chaque conteneur pour un service rejoint le r\xe9seau par d\xe9faut et est \xe0 la fois accessible par d'autres conteneurs sur ce r\xe9seau et d\xe9couvrable par le nom du service."]}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Remarque"})}),"\n",(0,r.jsxs)(s.p,{children:['Le r\xe9seau de votre application re\xe7oit un nom bas\xe9 sur le "nom du projet", qui est bas\xe9 sur le nom du r\xe9pertoire dans lequel il se trouve. Vous pouvez remplacer le nom du projet avec soit le ',(0,r.jsxs)(s.a,{href:"https://docs.docker.com/reference/",children:["flag ",(0,r.jsx)(s.code,{children:"--project-name"})]})," soit la ",(0,r.jsxs)(s.a,{href:"https://docs.docker.com/compose/environment-variables/envvars/#compose_project_name",children:["variable d'environnement ",(0,r.jsx)(s.code,{children:"COMPOSE_PROJECT_NAME"})]}),"."]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Par exemple, supposons que votre application se trouve dans un r\xe9pertoire appel\xe9 ",(0,r.jsx)(s.code,{children:"myapp"}),", et que votre ",(0,r.jsx)(s.code,{children:"compose.yml"})," ressemble \xe0 ceci :"]}),"\n",(0,r.jsxs)(s.p,{children:["Lorsque vous ex\xe9cutez ",(0,r.jsx)(s.code,{children:"docker compose up"}),", les actions suivantes se produisent :"]}),"\n",(0,r.jsxs)(s.ol,{children:["\n",(0,r.jsxs)(s.li,{children:["Un r\xe9seau appel\xe9 ",(0,r.jsx)(s.code,{children:"myapp_default"})," est cr\xe9\xe9."]}),"\n",(0,r.jsxs)(s.li,{children:["Un conteneur est cr\xe9\xe9 en utilisant la configuration de ",(0,r.jsx)(s.code,{children:"web"}),". Il rejoint le r\xe9seau ",(0,r.jsx)(s.code,{children:"myapp_default"})," sous le nom ",(0,r.jsx)(s.code,{children:"web"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:["Un conteneur est cr\xe9\xe9 en utilisant la configuration de ",(0,r.jsx)(s.code,{children:"db"}),". Il rejoint le r\xe9seau ",(0,r.jsx)(s.code,{children:"myapp_default"})," sous le nom ",(0,r.jsx)(s.code,{children:"db"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(s.p,{children:["Chaque conteneur peut maintenant rechercher le nom du service ",(0,r.jsx)(s.code,{children:"web"})," ou ",(0,r.jsx)(s.code,{children:"db"})," et obtenir l'adresse IP appropri\xe9e du conteneur. Par exemple, le code de l'application de ",(0,r.jsx)(s.code,{children:"web"})," pourrait se connecter \xe0 l'URL ",(0,r.jsx)(s.code,{children:"postgres://db:5432"})," et commencer \xe0 utiliser la base de donn\xe9es Postgres."]}),"\n",(0,r.jsxs)(s.p,{children:["Il est important de noter la distinction entre ",(0,r.jsx)(s.code,{children:"HOST_PORT"})," et ",(0,r.jsx)(s.code,{children:"CONTAINER_PORT"}),". Dans l'exemple ci-dessus, pour ",(0,r.jsx)(s.code,{children:"db"}),", le ",(0,r.jsx)(s.code,{children:"HOST_PORT"})," est ",(0,r.jsx)(s.code,{children:"8001"})," et le port du conteneur est ",(0,r.jsx)(s.code,{children:"5432"})," (par d\xe9faut pour postgres). La communication de service \xe0 service en r\xe9seau utilise le ",(0,r.jsx)(s.code,{children:"CONTAINER_PORT"}),". Lorsque ",(0,r.jsx)(s.code,{children:"HOST_PORT"})," est d\xe9fini, le service est \xe9galement accessible en dehors du swarm."]}),"\n",(0,r.jsxs)(s.p,{children:["Dans le conteneur ",(0,r.jsx)(s.code,{children:"web"}),", votre cha\xeene de connexion \xe0 ",(0,r.jsx)(s.code,{children:"db"})," ressemblerait \xe0 ",(0,r.jsx)(s.code,{children:"postgres://db:5432"}),", et depuis la machine h\xf4te, la cha\xeene de connexion ressemblerait \xe0 ",(0,r.jsx)(s.code,{children:"postgres://{DOCKER_IP}:8001"}),", par exemple ",(0,r.jsx)(s.code,{children:"postgres://localhost:8001"})," si votre conteneur s'ex\xe9cute localement."]}),"\n",(0,r.jsx)(s.h3,{id:"mise-\xe0-jour-des-conteneurs-sur-le-r\xe9seau",children:"Mise \xe0 jour des conteneurs sur le r\xe9seau"}),"\n",(0,r.jsxs)(s.p,{children:["Si vous apportez une modification de configuration \xe0 un service et ex\xe9cutez ",(0,r.jsx)(s.code,{children:"docker compose up"})," pour le mettre \xe0 jour, l'ancien conteneur est supprim\xe9 et le nouveau rejoint le r\xe9seau sous une adresse IP diff\xe9rente mais avec le m\xeame nom. Les conteneurs en cours d'ex\xe9cution peuvent rechercher ce nom et se connecter \xe0 la nouvelle adresse, mais l'ancienne adresse cesse de fonctionner."]}),"\n",(0,r.jsx)(s.p,{children:"Si des conteneurs ont des connexions ouvertes vers l'ancien conteneur, elles sont ferm\xe9es. Il incombe au conteneur de d\xe9tecter cette condition, de rechercher \xe0 nouveau le nom et de se reconnecter."}),"\n",(0,r.jsxs)(s.blockquote,{children:["\n",(0,r.jsx)(s.p,{children:(0,r.jsx)(s.strong,{children:"Astuce"})}),"\n",(0,r.jsx)(s.p,{children:"R\xe9f\xe9rencez les conteneurs par nom, et non par IP, chaque fois que possible. Sinon, vous devrez constamment mettre \xe0 jour l'adresse IP que vous utilisez."}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"r\xe9seau-multi-h\xf4te",children:"R\xe9seau multi-h\xf4te"}),"\n",(0,r.jsxs)(s.p,{children:["Lors du d\xe9ploiement d'une application Compose sur un moteur Docker avec ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/engine/swarm/",children:"le mode Swarm activ\xe9"}),", vous pouvez utiliser le pilote int\xe9gr\xe9 ",(0,r.jsx)(s.code,{children:"overlay"})," pour activer la communication multi-h\xf4te."]}),"\n",(0,r.jsxs)(s.p,{children:["Les r\xe9seaux overlay sont toujours cr\xe9\xe9s comme ",(0,r.jsx)(s.code,{children:"attachable"}),". Vous pouvez \xe9ventuellement d\xe9finir la propri\xe9t\xe9 ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/reference/compose-file/networks/#attachable",children:(0,r.jsx)(s.code,{children:"attachable"})})," sur ",(0,r.jsx)(s.code,{children:"false"}),"."]}),"\n",(0,r.jsxs)(s.p,{children:["Consultez la ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/engine/swarm/",children:"section mode Swarm"})," pour savoir comment configurer un cluster Swarm, et le ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/engine/network/tutorials/overlay/",children:"guide de d\xe9marrage avec le r\xe9seau multi-h\xf4te"})," pour en savoir plus sur les r\xe9seaux overlay multi-h\xf4te."]}),"\n",(0,r.jsx)(s.h3,{id:"sp\xe9cifier-des-r\xe9seaux-personnalis\xe9s",children:"Sp\xe9cifier des r\xe9seaux personnalis\xe9s"}),"\n",(0,r.jsxs)(s.p,{children:["Au lieu d'utiliser simplement le r\xe9seau d'application par d\xe9faut, vous pouvez sp\xe9cifier vos propres r\xe9seaux avec la cl\xe9 de niveau sup\xe9rieur ",(0,r.jsx)(s.code,{children:"networks"}),". Cela vous permet de cr\xe9er des topologies plus complexes et de sp\xe9cifier des ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/engine/extend/plugins_network/",children:"pilotes de r\xe9seau personnalis\xe9s"})," et des options. Vous pouvez \xe9galement l'utiliser pour connecter des services \xe0 des r\xe9seaux cr\xe9\xe9s en externe qui ne sont pas g\xe9r\xe9s par Compose."]}),"\n",(0,r.jsxs)(s.p,{children:["Chaque service peut sp\xe9cifier \xe0 quels r\xe9seaux se connecter avec la cl\xe9 de niveau service ",(0,r.jsx)(s.code,{children:"networks"}),", qui est une liste de noms r\xe9f\xe9rencant des entr\xe9es sous la cl\xe9 de niveau sup\xe9rieur ",(0,r.jsx)(s.code,{children:"networks"}),"."]}),"\n",(0,r.jsxs)(s.p,{children:["L'exemple suivant montre un fichier Compose qui d\xe9finit deux r\xe9seaux personnalis\xe9s. Le service ",(0,r.jsx)(s.code,{children:"proxy"})," est isol\xe9 du service ",(0,r.jsx)(s.code,{children:"db"}),", car ils ne partagent pas de r\xe9seau en commun. Seul ",(0,r.jsx)(s.code,{children:"app"})," peut parler aux deux."]}),"\n",(0,r.jsxs)(s.p,{children:["Les r\xe9seaux peuvent \xeatre configur\xe9s avec des adresses IP statiques en d\xe9finissant l'",(0,r.jsx)(s.a,{href:"https://docs.docker.com/reference/compose-file/services/#ipv4_address-ipv6_address",children:"adresse ipv4 et/ou ipv6"})," pour chaque r\xe9seau attach\xe9."]}),"\n",(0,r.jsxs)(s.p,{children:["Les r\xe9seaux peuvent \xe9galement recevoir un ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/reference/compose-file/networks/#name",children:"nom personnalis\xe9"})," :"]}),"\n",(0,r.jsx)(s.h3,{id:"configurer-le-r\xe9seau-par-d\xe9faut",children:"Configurer le r\xe9seau par d\xe9faut"}),"\n",(0,r.jsxs)(s.p,{children:["Au lieu de, ou en plus de, sp\xe9cifier vos propres r\xe9seaux, vous pouvez \xe9galement modifier les param\xe8tres du r\xe9seau par d\xe9faut de l'application en d\xe9finissant une entr\xe9e sous ",(0,r.jsx)(s.code,{children:"networks"})," nomm\xe9e ",(0,r.jsx)(s.code,{children:"default"})," :"]}),"\n",(0,r.jsx)(s.h3,{id:"utiliser-un-r\xe9seau-pr\xe9existant",children:"Utiliser un r\xe9seau pr\xe9existant"}),"\n",(0,r.jsxs)(s.p,{children:["Si vous souhaitez que vos conteneurs rejoignent un r\xe9seau pr\xe9existant, utilisez l'option ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/reference/compose-file/networks/#external",children:(0,r.jsx)(s.code,{children:"external"})})]}),"\n",(0,r.jsxs)(s.p,{children:["Au lieu de tenter de cr\xe9er un r\xe9seau appel\xe9 ",(0,r.jsx)(s.code,{children:"[projectname]_default"}),", Compose recherche un r\xe9seau appel\xe9 ",(0,r.jsx)(s.code,{children:"my-pre-existing-network"})," et connecte les conteneurs de votre application \xe0 celui-ci."]}),"\n",(0,r.jsx)(s.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,r.jsx)(s.p,{children:"Docker Compose est un outil puissant pour g\xe9rer des applications multi-conteneurs. Il simplifie la configuration, l'isolation des environnements et la portabilit\xe9 des applications. En utilisant Docker Compose, vous pouvez facilement d\xe9finir et g\xe9rer des environnements de d\xe9veloppement, de test et de mise en sc\xe8ne, ainsi que des d\xe9ploiements de production simples."}),"\n",(0,r.jsxs)(s.p,{children:["Pour en savoir plus sur Docker Compose, vous pouvez consulter la ",(0,r.jsx)(s.a,{href:"https://docs.docker.com/compose/",children:"documentation officielle"}),"."]})]})}function u(e={}){const{wrapper:s}={...(0,o.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},28453:(e,s,n)=>{n.d(s,{R:()=>c,x:()=>t});var r=n(96540);const o={},i=r.createContext(o);function c(e){const s=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function t(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),r.createElement(i.Provider,{value:s},e.children)}}}]);