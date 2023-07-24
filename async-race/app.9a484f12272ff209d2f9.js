(()=>{"use strict";const t=function(t){const{tag:e,id:n,classes:a,attributeName:r,attributeValue:s}=t,i=document.createElement(e);return(null==n?void 0:n.length)&&(i.id=n),(null==a?void 0:a.length)&&a.forEach((function(t){t.length&&i.classList.add(t)})),(null==r?void 0:r.length)&&(null==s?void 0:s.length)&&i.setAttribute(r,s),i},e=class{static createTitle(e){const n=t({tag:"h1"});return n.innerText=e,n}constructor(){this.container=t({tag:"main"})}getPageHtml(){return this.container}};class n extends e{constructor(){super(),this.container.append(n.createTitle(n.text.title))}}n.text={title:"Garage"};const a=n;class r extends e{constructor(){super(),this.container.append(r.createTitle(r.text.title))}}r.text={title:"Winners"};const s=r;class i extends e{constructor(t){super();const e=i.createTitle(i.text[t]);this.container.append(e)}}i.text={404:"Error: Page not found."};const c=i,o=class{constructor(e,n){this.container=t({tag:e,classes:[n]})}getComponentHtml(){return this.container}},l=[{route:"/garage",text:"Garage"},{route:"/winners",text:"Winners"}];class d extends o{static createNavLinks(){const e=t({tag:"nav",classes:["header__nav-links"]});return l.forEach((function(n){const a=t({tag:"li",classes:["header__nav-link-container","link-container"]}),r=t({tag:"a",classes:["header__nav-link"]});r.innerText=n.text,r.href=`${n.route}`,a.append(r),e.append(a)})),e}constructor(t,e){super(t,e),this.container.append(d.createNavLinks())}}const u=d;class h{constructor(){this.container=document.body,this.header=new u("header","header")}renderPage(t){const e=document.getElementById(`${h.defaultPageId}`);e&&e.remove();let n=null;if(n="/garage"===t?new a:"/winners"===t?new s:new c("404"),n){const t=n.getPageHtml();t.id=h.defaultPageId,this.container.append(t)}}initRouter(){window.addEventListener("popstate",(()=>{const{pathname:t}=window.location;this.renderPage(t)}));const t=document.querySelectorAll(".header__nav-link"),e=t=>{t.preventDefault();const e=t.target,{pathname:n}=new URL(e.href);window.history.pushState({path:n},n,n),this.renderPage(n)};t.forEach((t=>t.addEventListener("click",e))),this.renderPage("/garage")}run(){this.container.append(this.header.getComponentHtml()),this.initRouter()}}h.defaultPageId="current-page",(new h).run()})();