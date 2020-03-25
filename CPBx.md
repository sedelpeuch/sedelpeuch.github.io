---
layout: page
title: Cycle Préparatoire De Bordeaux - Regroupements de ressources
subtitle: Vers une transformation du Drive
hide: true
order: 3
---

<ul id="menu-demo2">
	<li><a href="/cpbx_page/cpbx_semestre_1.html">Semestre 1</a>
		<ul>
			<li><a href="/cpbx_page/cpbx_semestre_1.html#chimie">Chimie</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_1.html#informatique">Informatique</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_1.html#mathématiques">Mathématiques</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_1.html#physique">Physique</a></li>
		</ul>
	</li>
	<li><a href="/cpbx_page/cpbx_semestre_2.html">Semestre 2</a>
		<ul>
			<li><a href="/cpbx_page/cpbx_semestre_2.html#chimie">Chimie</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_2.html#mathématiques">Mathématiques</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_2.html#physique">Physique</a></li>
		</ul>
	</li>
	<li><a href="/cpbx_page/cpbx_semestre_3.html">Semestre 3</a>
		<ul>
			<li><a href="/cpbx_page/cpbx_semestre_3.html#informatique">Informatique</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_3.html#chimie">Chimie</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_3.html#mathématiques">Mathématiques</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_3.html#physique">Physique</a></li>
		</ul>
	</li>
	<li><a href="/cpbx_page/cpbx_semestre_4.html">Semestre 4</a>
		<ul>
			<li><a href="/cpbx_page/cpbx_semestre_4.html#informatique">Informatique</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_4.html#mathématiques">Mathématiques</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_4.html#physique">Physique</a></li>
			<li><a href="/cpbx_page/cpbx_semestre_4.html#projet">Projet</a></li>
		</ul>
	</li>
  <li><a href="https://drive.google.com/drive/folders/1iUi3fgIwU2xYA9xYfzsXzyWoZMD29Jyo">Annales</a></li>
</ul>


<hr> Juste une petite introduction pour vous dire que ce site `ne doit pas
remplacer vos cours`. Il vous servira de complément de cours et pour les TDs mais
votre mémoire travaillera bien mieux en écrivant en amphi… de plus n'oubliez pas
que les cours peuvent légèrement changer d'une année à l'autre, qu'il peut y
avoir des fautes de frappes (même dans des formules) où des éléments manquants
pour certaines raisons. Gardez votre esprit critique.
<hr>




## Erreurs et contribution

<div align="center"> Tu as détecté une erreur sur le site ? Un lien mort ? Une faute de frappe ?</div> 

<div align="center">Tu as envie de contribuer ? Un document à ajouter ? </div>

<div align="center"> N'hésite pas à me le dire ! </div> 

<form method="post" action="https://formspree.io/{{ site.email }}">
 <div align="center">
 <div class="row">
    <div class="6u 12u$(mobile)"><input type="text" name="name" placeholder="Nom" /></div>
    <div class="6u$ 12u$(mobile)"><input type="text" name="email" placeholder="Email" /></div>
    <div class="12u$">
      <textarea name="message" placeholder="Message"></textarea>
    </div>
    <div class="12u$">
      <input type="submit" value="Envoyer" />
    </div>
  </div>
  </div>
</form>

</footer> Crée par Delpeuch Sébastien </footer>

<style>#menu-demo2, #menu-demo2 ul{
padding:0;
margin:0;
list-style:none;
text-align:left;
}
#menu-demo2 li{
display:inline-block;
position:relative;
border-radius:8px 8px 0 0;
}
#menu-demo2 ul li{
display:inherit;
border-radius:0;
}
#menu-demo2 ul li:hover{
border-radius:0;
}
#menu-demo2 ul li:last-child{
border-radius:0 0 8px 8px;
}
#menu-demo2 ul{
position:absolute;
z-index: 1000;
max-height:0;
left: 0;
right: 0;
overflow:hidden;
-moz-transition: .8s all .3s;
-webkit-transition: .8s all .3s;
transition: .8s all .3s;
}
#menu-demo2 li:hover ul{
max-height:15em;
}
/* background des liens menus */
#menu-demo2 li:first-child{
background-color: #000000;
background-image:-webkit-linear-gradient(top, #696969 0%, #696969 100%);
background-image:linear-gradient(to bottom, #696969 0%, #696969 100%);
}
#menu-demo2 li:nth-child(2){
background-color: #729EBF;
background-image: -webkit-linear-gradient(top, #696969 0%, #696969 100%);
background-image:linear-gradient(to bottom, #696969 0%, #696969 100%);
}
#menu-demo2 li:nth-child(3){
background-color: #F6AD1A;
background-image:-webkit-linear-gradient(top, #696969 0%, #696969 100%);
background-image:linear-gradient(to bottom, #696969 0%, #696969 100%);
}
#menu-demo2 li:nth-child(4){
background-color: #CFFF6A;
background-image:-webkit-linear-gradient(top, #696969 0%, #696969 100%);
background-image:linear-gradient(to bottom, #696969 0%, #696969 100%);
}

#menu-demo2 li:last-child{
background-color: #CFFF6A;
background-image:-webkit-linear-gradient(top, #696969 0%, #696969 100%);
background-image:linear-gradient(to bottom, #696969 0%, #696969 100%);
}

/* background des liens sous menus */
#menu-demo2 li:first-child li{
background:#696969;
}
#menu-demo2 li:nth-child(2) li{
background:#696969;
}
#menu-demo2 li:nth-child(3) li{
background:#696969;
}
#menu-demo2 li:nth-child(4) li{
background:#696969;
}

#menu-demo2 li:last-child li{
background:#696969;
}

/* background des liens menus et sous menus au survol */
#menu-demo2 li:first-child:hover, #menu-demo2 li:first-child li:hover{
background:#65537A;
}
#menu-demo2 li:nth-child(2):hover, #menu-demo2 li:nth-child(2) li:hover{
background:#729EBF;
}
#menu-demo2 li:nth-child(3):hover, #menu-demo2 li:nth-child(3) li:hover{
background:#F6AD1A;
}
#menu-demo2 li:nth-child(4):hover, #menu-demo2 li:nth-child(4) li:hover{
background:#CFFF6A;
}

#menu-demo2 li:last-child:hover, #menu-demo2 li:last-child li:hover{
background:#FFFF6B;
}

/* les a href */
#menu-demo2 a{
text-decoration:none;
display:block;
padding:8px 32px;
color:#fff;
font-family:arial;
}
#menu-demo2 ul a{
padding:8px 0;
}
#menu-demo2 li:hover li a{
color:#fff;
text-transform:inherit;
}
#menu-demo2 li:hover a, #menu-demo2 li li:hover a{
color:#000;
}}</style>
