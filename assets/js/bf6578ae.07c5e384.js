"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[4599],{60369:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>a,frontMatter:()=>d,metadata:()=>r,toc:()=>o});const r=JSON.parse('{"id":"enseirb/s7/prog_sys/5","title":"Appels syst\xe8me du Syst\xe8me de Gestion de Fichier","description":"Les appels syst\xe8me d\'entr\xe9es-sorties ou entr\xe9es-sorties de bas niveau sont","source":"@site/docs/enseirb/s7/prog_sys/5.md","sourceDirName":"enseirb/s7/prog_sys","slug":"/enseirb/s7/prog_sys/5","permalink":"/docs/enseirb/s7/prog_sys/5","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{"title":"Appels syst\xe8me du Syst\xe8me de Gestion de Fichier"},"sidebar":"tutorialSidebar","previous":{"title":"La biblioth\xe8que standard","permalink":"/docs/enseirb/s7/prog_sys/4"},"next":{"title":"Les processus","permalink":"/docs/enseirb/s7/prog_sys/6"}}');var i=s(74848),l=s(28453);const d={title:"Appels syst\xe8me du Syst\xe8me de Gestion de Fichier"},t=void 0,c={},o=[{value:"<code>open</code>",id:"open",level:2},{value:"D\xe9roulement interne d&#39;un appel de <code>open</code>",id:"d\xe9roulement-interne-dun-appel-de-open",level:3},{value:"<code>creat</code>",id:"creat",level:2},{value:"<code>read</code>",id:"read",level:2},{value:"<code>write</code>",id:"write",level:2},{value:"<code>lseek</code>",id:"lseek",level:2},{value:"<code>dup</code> et <code>dup2</code>",id:"dup-et-dup2",level:2},{value:"<code>close</code>",id:"close",level:2}];function u(e){const n={code:"code",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Les appels syst\xe8me d'entr\xe9es-sorties ou entr\xe9es-sorties de bas niveau sont\nrudimentaires mais polymorphes, en effet c'est eux qui permettent d'\xe9crire des\nprogrammes ind\xe9pendamment des supports physiques sur lesquels se font les\nentr\xe9es/sorties et de pouvoir facilement changer les supports physiques associ\xe9s\na une entr\xe9e-sortie. Les appels syst\xe8me du syst\xe8me de gestion de fichier sont :"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"open/creat"})," ouverture/cr\xe9ation d'un fichier"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"read/write"})," lecture/\xe9criture sur un fichier ouvert"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"lseek"})," d\xe9placement du pointeur de fichier"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"dup,dup2"})," copie d'ouverture de fichier"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"close"})," fermeture d'un fichier"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"mount"})," changement d'un disque"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"mknode"})," cr\xe9ation d'un inode de fichier sp\xe9cial"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"pipe"})," cr\xe9ation d'un tube"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"fcntl"})," manipulation des caract\xe9ristiques des ouvertures de fichiers"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Les appels syst\xe8me sont r\xe9alis\xe9s par le noyau et retournent -1 en cas d'erreur."}),"\n",(0,i.jsx)(n.h2,{id:"open",children:(0,i.jsx)(n.code,{children:"open"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-c",children:"#include <fcntl.h>\nint open(char *ref, int mode, int perm);\n"})}),"\n",(0,i.jsx)(n.p,{children:'Ouverture du fichier de r\xe9f\xe9rence (absolue ou relative \xe0 "."). Le mode\nd\'ouverture est une conjonction des masques suivants :'}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-c",children:"O_RDONLY\nO_WRONLY\nO_RDWR\nO_NDELAY\nO_APPEND\nO_CREAT\nO_TRUNC\nO_EXCL\n"})}),"\n",(0,i.jsxs)(n.p,{children:["La param\xe8tre permission n'a de sens qu'\xe0 la cr\xe9ation du fichier, il permet de\npositionner les valeurs du champ ",(0,i.jsx)(n.code,{children:"mode"})," de l'inode. Les droits effectivement\npositionn\xe9s d\xe9pendant de la valeur umask, gr\xe2ce \xe0 la formule ",(0,i.jsx)(n.code,{children:"droit = perm & ~ umask"}),". La valeur par d\xe9faut de umask est 066. La valeur de retour de ",(0,i.jsx)(n.code,{children:"open"})," est\nle num\xe9ro dans la table de descripteur du processus qui a \xe9t\xe9 utilis\xe9 par\n",(0,i.jsx)(n.code,{children:"open"}),". Ce num\xe9ro est appel\xe9 descripteur de l'ouverture. Ce descripteur est\nutilis\xe9 dans les autres appels syst\xe8me pour sp\xe9cifier l'ouverture de fichier sur\nlaquelle on veut travailler et -1 en cas d'\xe9chec de l'ouverture."]}),"\n",(0,i.jsxs)(n.h3,{id:"d\xe9roulement-interne-dun-appel-de-open",children:["D\xe9roulement interne d'un appel de ",(0,i.jsx)(n.code,{children:"open"})]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Le syst\xe8me d\xe9termine l'inode du fichier r\xe9f\xe9rence"}),"\n",(0,i.jsx)(n.li,{children:"Soit l'inode est dans la table des inodes en m\xe9moire. Soit il alloue une\nentr\xe9e et recopie l'inode du disque."}),"\n",(0,i.jsx)(n.li,{children:"Le syst\xe8me v\xe9rifie les droits d'acc\xe8s dans le mode demand\xe9."}),"\n",(0,i.jsxs)(n.li,{children:["Il alloue une entr\xe9e dans la table des fichiers ouverts du syst\xe8me, et\npositionne le curseur de lecture \xe9criture dans le fichier (offset = 0, sauf\ndans le cas du mode ",(0,i.jsx)(n.code,{children:"O_APPEND"})," offset= taille du fichier)."]}),"\n",(0,i.jsxs)(n.li,{children:["Le syst\xe8me alloue une place dans la table des descripteurs ",(0,i.jsx)(n.code,{children:"_iob"})," du fichier."]}),"\n",(0,i.jsxs)(n.li,{children:["Il renvoie au processus le num\xe9ro de descripteur, c'est \xe0 dire le num\xe9ro de\nl'entr\xe9e qu'il vient d'allouer dans le table ",(0,i.jsx)(n.code,{children:"_iob"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Si l'op\xe9ration a \xe9chou\xe9 dans une des \xe9tapes le syst\xe8m\xe9 renvoie -1."}),"\n",(0,i.jsx)(n.h2,{id:"creat",children:(0,i.jsx)(n.code,{children:"creat"})}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ation d'un fichier et ouverture en \xe9criture ",(0,i.jsx)(n.code,{children:"int creat(char* reference, int permissions);"}),". Le syst\xe8me d\xe9termine l'inode du catalogue o\xf9 l'on demande la\ncr\xe9ation du fichier."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Si il existe d\xe9j\xe0 une inode pour le fichier","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Le noyau lit l'inode en question (allocation dans la table des inodes en\nm\xe9moire), v\xe9rifie que c'est une fichier ordinaire autoris\xe9 en \xe9criture par\nles propri\xe9taire effectif du processus, sinon \xe9chec."}),"\n",(0,i.jsx)(n.li,{children:"Le syst\xe8me lib\xe8re les blocs de donn\xe9es et r\xe9duit la taille du fichier \xe0\nz\xe9ro, il ne modifie pas les droits qu'avait le fichier ant\xe9rieurement"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Si n'existait pas d'inode pour le fichier","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Le syst\xe8me teste les droit en \xe9criture sur le catalogue"}),"\n",(0,i.jsx)(n.li,{children:"Il alloue une nouvelle inode"}),"\n",(0,i.jsx)(n.li,{children:"Il alloue une nouvelle entr\xe9e dans la table des inodes en m\xe9moire"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"read",children:(0,i.jsx)(n.code,{children:"read"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:"int nbcharlus = read(int d, char* tampon, int nbalire)"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"descripteur"})," entr\xe9e de la table des descripteurs correspondante au fichier\ndans lequel doit \xeatre effectu\xe9e la lecture (fourni par ",(0,i.jsx)(n.code,{children:"open"}),")"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"nbalire"})," nombre de caract\xe8re \xe0 lire dans le fichier"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"tampon"})," un tableau de caract\xe8res allou\xe9 par l'utilisateur. Les caract\xe8res\nlus sont plac\xe9s dans ce tampon"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"nbcharlus"})," nombre de caract\xe8res effectivement lus, ou -1 en cas d'\xe9chec de\nl'appel syst\xe8me, la fin de fichier est atteinte quand le nombre de caract\xe8res\nlus est inf\xe9rieur au nombre de caract\xe8res demand\xe9s."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"D\xe9roulement :"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"V\xe9rification du descripteur -> acc\xe8s aux tables syst\xe8me"}),"\n",(0,i.jsx)(n.li,{children:"Droits (mode ad\xe9quat)"}),"\n",(0,i.jsx)(n.li,{children:"Gr\xe2ce \xe0 l'inode le syst\xe8me obtient les adresses du bloc contenant les donn\xe9es\n\xe0 lire. Le syst\xe8me effectue la lecture de ces blocs"}),"\n",(0,i.jsx)(n.li,{children:"Le syst\xe8me recopie les donn\xe9es du buffer cache vers le tampon de\nl'utilisateur"}),"\n",(0,i.jsx)(n.li,{children:"Le curseur dans le fichier est remit \xe0 jour dans l'entr\xe9e de la table des\nfichiers ouverts"}),"\n",(0,i.jsx)(n.li,{children:"Le syst\xe8me renvoie le nombre de caract\xe8res effectivement lus"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"write",children:(0,i.jsx)(n.code,{children:"write"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"int nbcecrits = write(int desc, char* tampon, int nbaecrire);"})," M\xeame d\xe9roulement\nque ",(0,i.jsx)(n.code,{children:"read"})," mais avec une allocation \xe9ventuelle de bloc-disque dans le cas d'un\najout au-del\xe0 de la fin du fihcier. Dans le cas o\xf9 l'appel concerne une\np\xe9riph\xe9rique en mode caract\xe8re : le syst\xe8me active la fonction ",(0,i.jsx)(n.code,{children:"write"}),"\n(r\xe9ciproquement ",(0,i.jsx)(n.code,{children:"read"})," pour une lecture) du p\xe9riph\xe9rique qui utilise directement\nl'adresse du tampon utilisateur."]}),"\n",(0,i.jsxs)(n.p,{children:["Remarquons ici encore le polymorphisme de ces deux appels syst\xe8me qui permet de\nlire et d'\xe9crire sur une grande vari\xe9t\xe9 de p\xe9riph\xe9riques en utilisant une seule\nsyntaxe. Le code C utilisant l'appel syst\xe8me marchera donc indiff\xe9remment sur\ntous les types de p\xe9riph\xe9riques qui sont d\xe9finis dans le syst\xe8me de fichier. Par\nexemple, il existe deux p\xe9riph\xe9riques \"logiques\" qui sont ",(0,i.jsx)(n.code,{children:"/dev/null"})," et\n",(0,i.jsx)(n.code,{children:"/dev/zero"})," (que l'on ne trouve pas sur toutes les machines). Le premier est\ntoujours vide en lecture et les \xe9critures n'ont aucun effet (il est donc\npossible de d\xe9verser n'importe quoi sur ce p\xe9riph\xe9rique). Le deuxi\xe8me fournit en\nlecture une infinit\xe9 de z\xe9ro et n'accepte pas l'\xe9criture."]}),"\n",(0,i.jsx)(n.h2,{id:"lseek",children:(0,i.jsx)(n.code,{children:"lseek"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"off_t lseek(int d, off_t offset, int direction)"})," ",(0,i.jsx)(n.code,{children:"lseek"})," permet de d\xe9placer le\ncurseur de fichier dans la ",(0,i.jsx)(n.strong,{children:"table des fichiers ouverts"})," du syst\xe8me, offset est\nun d\xe9placement en octets, d est le descripteur et direction une des trois macros\n",(0,i.jsx)(n.code,{children:"L_SET, L_INCR, L_XTND"}),"."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"L_SET"})," la nouvelle position est offset sauf si offset est sup\xe9rieur \xe0 la\ntaille du fichier, auquel cas la position est \xe9gale \xe0 la taille du fichier. Si\nl'offset est n\xe9gatif, alors la position est z\xe9ro."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"L_INCR"})," la position courante est incr\xe9ment\xe9e de ",(0,i.jsx)(n.code,{children:"offset"})," place"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"L_XTND"})," d\xe9placement par rapport \xe0 la fin du fichier, cette option permet\nd'augmenter la taille du fichier"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["La valeur de retour de ",(0,i.jsx)(n.code,{children:"lseek"})," est la nouvelle position du curseur dans le\nfichier ou -1 si l'appel a \xe9chou\xe9."]}),"\n",(0,i.jsxs)(n.h2,{id:"dup-et-dup2",children:[(0,i.jsx)(n.code,{children:"dup"})," et ",(0,i.jsx)(n.code,{children:"dup2"})]}),"\n",(0,i.jsxs)(n.p,{children:["Les appls ",(0,i.jsx)(n.code,{children:"dup"})," et ",(0,i.jsx)(n.code,{children:"dup2"})," permettent de dupliquer des entr\xe9es de la table des\ndescripteurs du processus. ",(0,i.jsx)(n.code,{children:"int descripteur2 = dup(int descripteur1);"})]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"v\xe9rification que descripteur est le num\xe9ro d'une entr\xe9e non nulle"}),"\n",(0,i.jsx)(n.li,{children:"recopie dans la premi\xe8re entr\xe9e libre du table des descriptuers l'entr\xe9e\ncorrespondant \xe0 descripteur1."}),"\n",(0,i.jsx)(n.li,{children:"le compteur de descripteurs de l'entr\xe9e associ\xe9e \xe0 descripteur1 dans la table\ndes ouvertures de fichiers est incr\xe9ment\xe9"}),"\n",(0,i.jsx)(n.li,{children:"renvoi de l'indice dans la table des descripteurs de l'entr\xe9e nouvellement\nallou\xe9e."}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"close",children:(0,i.jsx)(n.code,{children:"close"})}),"\n",(0,i.jsxs)(n.p,{children:["Fermeture d'un fichier ",(0,i.jsx)(n.code,{children:"int ok = close(descripteur);"})]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"si descripteur n'est pas un descripteur valide retour -1"}),"\n",(0,i.jsx)(n.li,{children:"l'entr\xe9e d'indice descripteur de la table est lib\xe9r\xe9e"}),"\n",(0,i.jsx)(n.li,{children:"le compteur de l'entr\xe9e de la table des fichiers ouvert associ\xe9 \xe0 descripteur\nest d\xe9cr\xe9ment\xe9."}),"\n"]})]})}function a(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>t});var r=s(96540);const i={},l=r.createContext(i);function d(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);