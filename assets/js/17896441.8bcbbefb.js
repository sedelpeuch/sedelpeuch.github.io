"use strict";(self.webpackChunksedelpeuch_net=self.webpackChunksedelpeuch_net||[]).push([[7918],{90247:(e,t,n)=>{n.r(t),n.d(t,{default:()=>xe});var a=n(67294),s=n(35463),o=n(58755),i=n(85893),r=a.createContext(null);function l(e){var t=e.children,n=function(e){return(0,a.useMemo)((function(){return{metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc}}),[e])}(e.content);return(0,i.jsx)(r.Provider,{value:n,children:t})}function c(){var e=(0,a.useContext)(r);if(null===e)throw new o.i6("DocProvider");return e}function d(){var e,t=c(),n=t.metadata,a=t.frontMatter,o=t.assets;return(0,i.jsx)(s.d,{title:n.title,description:n.description,keywords:a.keywords,image:null!=(e=o.image)?e:a.image})}var u=n(90512),m=n(13488),h=n(97325),p=n(34791);function b(e){var t=e.permalink,n=e.title,a=e.subLabel,s=e.isNext;return(0,i.jsxs)(p.Z,{className:(0,u.Z)("pagination-nav__link",s?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[a&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:a}),(0,i.jsx)("div",{className:"pagination-nav__label",children:n})]})}function g(e){var t=e.previous,n=e.next;return(0,i.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,h.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,i.jsx)(b,Object.assign({},t,{subLabel:(0,i.jsx)(h.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})})),n&&(0,i.jsx)(b,Object.assign({},n,{subLabel:(0,i.jsx)(h.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0}))]})}function x(){var e=c().metadata;return(0,i.jsx)(g,{previous:e.previous,next:e.next})}var v=n(39962),j=n(30868),f=n(23702),N=n(86409),k=n(58801);var C={unreleased:function(e){var t=e.siteTitle,n=e.versionMetadata;return(0,i.jsx)(h.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,i.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){var t=e.siteTitle,n=e.versionMetadata;return(0,i.jsx)(h.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,i.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function _(e){var t=C[e.versionMetadata.banner];return(0,i.jsx)(t,Object.assign({},e))}function Z(e){var t=e.versionLabel,n=e.to,a=e.onClick;return(0,i.jsx)(h.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,i.jsx)("b",{children:(0,i.jsx)(p.Z,{to:n,onClick:a,children:(0,i.jsx)(h.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function B(e){var t,n=e.className,a=e.versionMetadata,s=(0,v.Z)().siteConfig.title,o=(0,j.gA)({failfast:!0}).pluginId,r=(0,N.J)(o).savePreferredVersionName,l=(0,j.Jo)(o),c=l.latestDocSuggestion,d=l.latestVersionSuggestion,m=null!=c?c:(t=d).docs.find((function(e){return e.id===t.mainDocId}));return(0,i.jsxs)("div",{className:(0,u.Z)(n,f.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,i.jsx)("div",{children:(0,i.jsx)(_,{siteTitle:s,versionMetadata:a})}),(0,i.jsx)("div",{className:"margin-top--md",children:(0,i.jsx)(Z,{versionLabel:d.label,to:m.path,onClick:function(){return r(d.name)}})})]})}function L(e){var t=e.className,n=(0,k.E)();return n.banner?(0,i.jsx)(B,{className:t,versionMetadata:n}):null}function y(e){var t=e.className,n=(0,k.E)();return n.badge?(0,i.jsx)("span",{className:(0,u.Z)(t,f.k.docs.docVersionBadge,"badge badge--secondary"),children:(0,i.jsx)(h.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}function T(e){var t=e.lastUpdatedAt,n=e.formattedLastUpdatedAt;return(0,i.jsx)(h.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,i.jsx)("b",{children:(0,i.jsx)("time",{dateTime:new Date(1e3*t).toISOString(),children:n})})},children:" on {date}"})}function w(e){var t=e.lastUpdatedBy;return(0,i.jsx)(h.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,i.jsx)("b",{children:t})},children:" by {user}"})}function I(e){var t=e.lastUpdatedAt,n=e.formattedLastUpdatedAt,a=e.lastUpdatedBy;return(0,i.jsxs)("span",{className:f.k.common.lastUpdated,children:[(0,i.jsx)(h.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?(0,i.jsx)(T,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:a?(0,i.jsx)(w,{lastUpdatedBy:a}):""},children:"Last updated{atDate}{byUser}"}),!1]})}var U=n(63366);const A={iconEdit:"iconEdit_Z9Sw"};var O=["className"];function E(e){var t=e.className,n=(0,U.Z)(e,O);return(0,i.jsx)("svg",Object.assign({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,u.Z)(A.iconEdit,t),"aria-hidden":"true"},n,{children:(0,i.jsx)("g",{children:(0,i.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})}))}function M(e){var t=e.editUrl;return(0,i.jsxs)(p.Z,{to:t,className:f.k.common.editThisPage,children:[(0,i.jsx)(E,{}),(0,i.jsx)(h.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}var P=n(14898);const S={tags:"tags_jXut",tag:"tag_QGVx"};function V(e){var t=e.tags;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("b",{children:(0,i.jsx)(h.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,i.jsx)("ul",{className:(0,u.Z)(S.tags,"padding--none","margin-left--sm"),children:t.map((function(e){var t=e.label,n=e.permalink;return(0,i.jsx)("li",{className:S.tag,children:(0,i.jsx)(P.Z,{label:t,permalink:n})},n)}))})]})}const F={lastUpdated:"lastUpdated_vwxv"};function R(e){return(0,i.jsx)("div",{className:(0,u.Z)(f.k.docs.docFooterTagsRow,"row margin-bottom--sm"),children:(0,i.jsx)("div",{className:"col",children:(0,i.jsx)(V,Object.assign({},e))})})}function W(e){var t=e.editUrl,n=e.lastUpdatedAt,a=e.lastUpdatedBy,s=e.formattedLastUpdatedAt;return(0,i.jsxs)("div",{className:(0,u.Z)(f.k.docs.docFooterEditMetaRow,"row"),children:[(0,i.jsx)("div",{className:"col",children:t&&(0,i.jsx)(M,{editUrl:t})}),(0,i.jsx)("div",{className:(0,u.Z)("col",F.lastUpdated),children:(n||a)&&(0,i.jsx)(I,{lastUpdatedAt:n,formattedLastUpdatedAt:s,lastUpdatedBy:a})})]})}function H(){var e=c().metadata,t=e.editUrl,n=e.lastUpdatedAt,a=e.formattedLastUpdatedAt,s=e.lastUpdatedBy,o=e.tags,r=o.length>0,l=!!(t||n||s);return r||l?(0,i.jsxs)("footer",{className:(0,u.Z)(f.k.docs.docFooter,"docusaurus-mt-lg"),children:[r&&(0,i.jsx)(R,{tags:o}),l&&(0,i.jsx)(W,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:s,formattedLastUpdatedAt:a})]}):null}var D=n(54639),G=n(2728);const z={tocCollapsibleButton:"tocCollapsibleButton_TO0P",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_MG3E"};var q=["collapsed"];function J(e){var t=e.collapsed,n=(0,U.Z)(e,q);return(0,i.jsx)("button",Object.assign({type:"button"},n,{className:(0,u.Z)("clean-btn",z.tocCollapsibleButton,!t&&z.tocCollapsibleButtonExpanded,n.className),children:(0,i.jsx)(h.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})}))}const Q={tocCollapsible:"tocCollapsible_ETCw",tocCollapsibleContent:"tocCollapsibleContent_vkbj",tocCollapsibleExpanded:"tocCollapsibleExpanded_sAul"};function Y(e){var t=e.toc,n=e.className,a=e.minHeadingLevel,s=e.maxHeadingLevel,o=(0,D.u)({initialState:!0}),r=o.collapsed,l=o.toggleCollapsed;return(0,i.jsxs)("div",{className:(0,u.Z)(Q.tocCollapsible,!r&&Q.tocCollapsibleExpanded,n),children:[(0,i.jsx)(J,{collapsed:r,onClick:l}),(0,i.jsx)(D.z,{lazy:!0,className:Q.tocCollapsibleContent,collapsed:r,children:(0,i.jsx)(G.Z,{toc:t,minHeadingLevel:a,maxHeadingLevel:s})})]})}const K={tocMobile:"tocMobile_ITEo"};function X(){var e=c(),t=e.toc,n=e.frontMatter;return(0,i.jsx)(Y,{toc:t,minHeadingLevel:n.toc_min_heading_level,maxHeadingLevel:n.toc_max_heading_level,className:(0,u.Z)(f.k.docs.docTocMobile,K.tocMobile)})}var $=n(56474);function ee(){var e=c(),t=e.toc,n=e.frontMatter;return(0,i.jsx)($.Z,{toc:t,minHeadingLevel:n.toc_min_heading_level,maxHeadingLevel:n.toc_max_heading_level,className:f.k.docs.docTocDesktop})}var te=n(13899),ne=n(20887);function ae(e){var t,n,a,s,o=e.children,r=(t=c(),n=t.metadata,a=t.frontMatter,s=t.contentTitle,a.hide_title||void 0!==s?null:n.title);return(0,i.jsxs)("div",{className:(0,u.Z)(f.k.docs.docMarkdown,"markdown"),children:[r&&(0,i.jsx)("header",{children:(0,i.jsx)(te.Z,{as:"h1",children:r})}),(0,i.jsx)(ne.Z,{children:o})]})}var se=n(85019),oe=n(69003),ie=n(79524);function re(e){return(0,i.jsx)("svg",Object.assign({viewBox:"0 0 24 24"},e,{children:(0,i.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})}))}const le={breadcrumbHomeIcon:"breadcrumbHomeIcon_YNFT"};function ce(){var e=(0,ie.Z)("/");return(0,i.jsx)("li",{className:"breadcrumbs__item",children:(0,i.jsx)(p.Z,{"aria-label":(0,h.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,i.jsx)(re,{className:le.breadcrumbHomeIcon})})})}const de={breadcrumbsContainer:"breadcrumbsContainer_Z_bl"};function ue(e){var t=e.children,n=e.href,a="breadcrumbs__link";return e.isLast?(0,i.jsx)("span",{className:a,itemProp:"name",children:t}):n?(0,i.jsx)(p.Z,{className:a,href:n,itemProp:"item",children:(0,i.jsx)("span",{itemProp:"name",children:t})}):(0,i.jsx)("span",{className:a,children:t})}function me(e){var t=e.children,n=e.active,a=e.index,s=e.addMicrodata;return(0,i.jsxs)("li",Object.assign({},s&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},{className:(0,u.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,i.jsx)("meta",{itemProp:"position",content:String(a+1)})]}))}function he(){var e=(0,se.s1)(),t=(0,oe.Ns)();return e?(0,i.jsx)("nav",{className:(0,u.Z)(f.k.docs.docBreadcrumbs,de.breadcrumbsContainer),"aria-label":(0,h.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,i.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,i.jsx)(ce,{}),e.map((function(t,n){var a=n===e.length-1,s="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,i.jsx)(me,{active:a,index:n,addMicrodata:!!s,children:(0,i.jsx)(ue,{href:s,isLast:a,children:t.label})},n)}))]})}):null}var pe=n(69501);const be={docItemContainer:"docItemContainer_Djhp",docItemCol:"docItemCol_VOVn"};function ge(e){var t,n,a,s,o,r,l=e.children,d=(t=c(),n=t.frontMatter,a=t.toc,s=(0,m.i)(),o=n.hide_table_of_contents,r=!o&&a.length>0,{hidden:o,mobile:r?(0,i.jsx)(X,{}):void 0,desktop:!r||"desktop"!==s&&"ssr"!==s?void 0:(0,i.jsx)(ee,{})}),h=c().metadata.unlisted;return(0,i.jsxs)("div",{className:"row",children:[(0,i.jsxs)("div",{className:(0,u.Z)("col",!d.hidden&&be.docItemCol),children:[h&&(0,i.jsx)(pe.Z,{}),(0,i.jsx)(L,{}),(0,i.jsxs)("div",{className:be.docItemContainer,children:[(0,i.jsxs)("article",{children:[(0,i.jsx)(he,{}),(0,i.jsx)(y,{}),d.mobile,(0,i.jsx)(ae,{children:l}),(0,i.jsx)(H,{})]}),(0,i.jsx)(x,{})]})]}),d.desktop&&(0,i.jsx)("div",{className:"col col--3",children:d.desktop})]})}function xe(e){var t="docs-doc-id-"+e.content.metadata.id,n=e.content;return(0,i.jsx)(l,{content:e.content,children:(0,i.jsxs)(s.FG,{className:t,children:[(0,i.jsx)(d,{}),(0,i.jsx)(ge,{children:(0,i.jsx)(n,{})})]})})}},69501:(e,t,n)=>{n.d(t,{Z:()=>h});n(67294);var a=n(90512),s=n(97325),o=n(31514),i=n(85893);function r(){return(0,i.jsx)(s.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function l(){return(0,i.jsx)(s.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,i.jsx)(o.Z,{children:(0,i.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}var d=n(23702),u=n(79114);function m(e){var t=e.className;return(0,i.jsx)(u.Z,{type:"caution",title:(0,i.jsx)(r,{}),className:(0,a.Z)(t,d.k.common.unlistedBanner),children:(0,i.jsx)(l,{})})}function h(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(c,{}),(0,i.jsx)(m,Object.assign({},e))]})}},69607:(e,t,n)=>{n.d(t,{Z:()=>O});var a=n(63366),s=n(67294),o=n(51048),i=n(90512),r=n(4779),l=n(23702),c=n(82940);const d={codeBlockContainer:"codeBlockContainer_APcc"};var u=n(85893),m=["as"];function h(e){var t=e.as,n=(0,a.Z)(e,m),s=(0,r.p)(),o=(0,c.QC)(s);return(0,u.jsx)(t,Object.assign({},n,{style:o,className:(0,i.Z)(n.className,d.codeBlockContainer,l.k.common.codeBlock)}))}const p={codeBlockContent:"codeBlockContent_m3Ux",codeBlockTitle:"codeBlockTitle_P25_",codeBlock:"codeBlock_qGQc",codeBlockStandalone:"codeBlockStandalone_zC50",codeBlockLines:"codeBlockLines_p187",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_OFgW",buttonGroup:"buttonGroup_6DOT"};function b(e){var t=e.children,n=e.className;return(0,u.jsx)(h,{as:"pre",tabIndex:0,className:(0,i.Z)(p.codeBlockStandalone,"thin-scrollbar",n),children:(0,u.jsx)("code",{className:p.codeBlockLines,children:t})})}var g=n(87099),x=n(20107),v=n(52144),j=n(42573);const f={codeLine:"codeLine_iPqp",codeLineNumber:"codeLineNumber_F4P7",codeLineContent:"codeLineContent_pOih"};function N(e){var t=e.line,n=e.classNames,a=e.showLineNumbers,s=e.getLineProps,o=e.getTokenProps;1===t.length&&"\n"===t[0].content&&(t[0].content="");var r=s({line:t,className:(0,i.Z)(n,a&&f.codeLine)}),l=t.map((function(e,t){return(0,u.jsx)("span",Object.assign({},o({token:e,key:t})),t)}));return(0,u.jsxs)("span",Object.assign({},r,{children:[a?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("span",{className:f.codeLineNumber}),(0,u.jsx)("span",{className:f.codeLineContent,children:l})]}):l,(0,u.jsx)("br",{})]}))}var k=n(94358),C=n(97325),_=n(9776),Z=n(69612);const B={copyButtonCopied:"copyButtonCopied__QnY",copyButtonIcons:"copyButtonIcons_FhaS",copyButtonIcon:"copyButtonIcon_phi_",copyButtonSuccessIcon:"copyButtonSuccessIcon_FfTR"};function L(e){var t=e.code,n=e.className,a=(0,s.useState)(!1),o=a[0],r=a[1],l=(0,s.useRef)(void 0),c=(0,s.useCallback)((function(){(0,k.Z)(t),r(!0),l.current=window.setTimeout((function(){r(!1)}),1e3)}),[t]);return(0,s.useEffect)((function(){return function(){return window.clearTimeout(l.current)}}),[]),(0,u.jsx)("button",{type:"button","aria-label":o?(0,C.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,C.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,C.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,i.Z)("clean-btn",n,B.copyButton,o&&B.copyButtonCopied),onClick:c,children:(0,u.jsxs)("span",{className:B.copyButtonIcons,"aria-hidden":"true",children:[(0,u.jsx)(_.Z,{className:B.copyButtonIcon}),(0,u.jsx)(Z.Z,{className:B.copyButtonSuccessIcon})]})})}var y=n(72152);const T={wordWrapButtonIcon:"wordWrapButtonIcon_iowe",wordWrapButtonEnabled:"wordWrapButtonEnabled_gY8A"};function w(e){var t=e.className,n=e.onClick,a=e.isEnabled,s=(0,C.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,u.jsx)("button",{type:"button",onClick:n,className:(0,i.Z)("clean-btn",t,a&&T.wordWrapButtonEnabled),"aria-label":s,title:s,children:(0,u.jsx)(y.Z,{className:T.wordWrapButtonIcon,"aria-hidden":"true"})})}var I=n(1954);function U(e){var t,n=e.children,a=e.className,s=void 0===a?"":a,o=e.metastring,l=e.title,d=e.showLineNumbers,m=e.language,b=(0,x.L)().prism,f=b.defaultLanguage,k=b.magicComments,C=function(e){return null==e?void 0:e.toLowerCase()}(null!=(t=null!=m?m:(0,c.Vo)(s))?t:f),_=(0,r.p)(),Z=(0,v.F)(),B=(0,c.bc)(o)||l,y=function(e){var t,n,a=(0,g.Z)(/icon=(["'])(.*?)\1/,{quote:1,icon:2}),s=null!=(t=null==e||null==(n=e.match(a))?void 0:n.groups.icon)?t:"";return s?(0,u.jsx)(I.JO,{icon:s,width:"16"}):null}(o),T=(0,c.nZ)(n,{metastring:o,language:C,magicComments:k}),U=T.lineClassNames,A=T.code,O=null!=d?d:(0,c.nt)(o);return(0,u.jsxs)(h,{as:"div",className:(0,i.Z)(s,C&&!s.includes("language-"+C)&&"language-"+C),children:[B&&(0,u.jsxs)("div",{className:p.codeBlockTitle,children:[y,B,(0,u.jsx)("span",{style:{flex:1,textAlign:"right"},children:C})]}),(0,u.jsxs)("div",{className:p.codeBlockContent,children:[(0,u.jsx)(j.y$,{theme:_,code:A,language:null!=C?C:"text",children:function(e){var t=e.className,n=e.style,a=e.tokens,s=e.getLineProps,o=e.getTokenProps;return(0,u.jsx)("pre",{tabIndex:0,ref:Z.codeBlockRef,className:(0,i.Z)(t,p.codeBlock,"thin-scrollbar"),style:n,children:(0,u.jsx)("code",{className:(0,i.Z)(p.codeBlockLines,O&&p.codeBlockLinesWithNumbering),children:a.map((function(e,t){return(0,u.jsx)(N,{line:e,getLineProps:s,getTokenProps:o,classNames:U[t],showLineNumbers:O},t)}))})})}}),(0,u.jsxs)("div",{className:p.buttonGroup,children:[(Z.isEnabled||Z.isCodeScrollable)&&(0,u.jsx)(w,{className:p.codeButton,onClick:function(){return Z.toggle()},isEnabled:Z.isEnabled}),(0,u.jsx)(L,{className:p.codeButton,code:A})]})]})]})}var A=["children"];function O(e){var t=e.children,n=(0,a.Z)(e,A),i=(0,o.Z)(),r=function(e){return s.Children.toArray(e).some((function(e){return(0,s.isValidElement)(e)}))?e:Array.isArray(e)?e.join(""):e}(t),l="string"==typeof r?U:b;return(0,u.jsx)(l,Object.assign({},n,{children:r}),String(i))}},33665:(e,t,n)=>{n.d(t,{Z:()=>i});n(67294);var a=n(34791),s=n(1954),o=n(85893);function i(e){var t=e.href;if(!t)return(0,o.jsx)(a.Z,Object.assign({},e));var n={"github.com":"simple-icons:github","twitter.com":"logos:twitter"},i=Object.keys(n).find((function(e){return new RegExp("^https?://"+e).test(t)})),r=i?n[i]:null;return r?(0,o.jsxs)("span",{style:{display:"inline-flex",gap:"0.25rem"},children:[r&&(0,o.jsx)(s.JO,{className:"a-icon",style:{alignSelf:"center"},icon:r,width:16,height:16}),(0,o.jsx)(a.Z,Object.assign({},e))]}):(0,o.jsx)(a.Z,Object.assign({},e))}},56474:(e,t,n)=>{n.d(t,{Z:()=>g});var a=n(63366),s=n(67294),o=n(90512),i=n(25330),r=n(2728);const l={tableOfContents:"tableOfContents_jeP5",docItemContainer:"docItemContainer_hgFs",hr:"hr_UhE0",percent:"percent_H6RK"};var c=n(18263),d=n(14025),u=function(){var e=(0,s.useState)(0),t=e[0],n=e[1],a=(0,s.useRef)(null),o=(0,c.v)({container:a}).scrollYProgress;return(0,s.useLayoutEffect)((function(){a.current=document.getElementById("__blog-post-container")}),[]),(0,d.W)(o,"change",(function(e){n(e)})),{readPercent:(0,s.useMemo)((function(){return Math.round(100*t)}),[t])}},m=n(85893),h=["className"],p="table-of-contents__link toc-highlight",b="table-of-contents__link--active";function g(e){var t=e.className,n=(0,a.Z)(e,h),s=u().readPercent;return(0,m.jsxs)(i.E.div,{className:(0,o.Z)(l.tableOfContents,"thin-scrollbar",t),initial:{opacity:0,x:100},animate:{opacity:1,x:0},transition:{type:"spring",stiffness:400,damping:20,duration:.3},children:[(0,m.jsx)(r.Z,Object.assign({},n,{linkClassName:p,linkActiveClassName:b})),(0,m.jsx)("hr",{className:l.hr}),(0,m.jsxs)("span",{className:l.percent,children:[s+"%"," "]})]})}},14898:(e,t,n)=>{n.d(t,{Z:()=>r});n(67294);var a=n(90512),s=n(34791);const o={tag:"tag_b1dr",tagRegular:"tagRegular_t85v",tagWithCount:"tagWithCount_ZJSN"};var i=n(85893);function r(e){var t=e.permalink,n=e.label,r=e.count,l=e.className;return(0,i.jsxs)(s.Z,{href:t,className:(0,a.Z)(o.tag,r?o.tagWithCount:o.tagRegular,l),children:[n,r&&(0,i.jsx)("span",{children:r})]})}}}]);