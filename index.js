import{a as v,S,i as a}from"./assets/vendor-frHSA4Lh.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const E="50379618-b28b09185e51127b70b956184",B="https://pixabay.com/api/";async function M(r,t=1,n=15){const i={key:E,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:n};return(await v.get(B,{params:i})).data}const m=document.querySelector(".loader"),p=document.querySelector(".gallery"),g=document.querySelector(".loadMoreBtn");let l;function P(r){const t=r.map(({webformatURL:n,largeImageURL:i,tags:e,likes:o,views:s,comments:L,downloads:w})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img 
            class="gallery-image" 
            src="${n}" 
            alt="${e}" 
          />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${o}</p>
          <p><b>Views:</b> ${s}</p>
          <p><b>Comments:</b> ${L}</p>
          <p><b>Downloads:</b> ${w}</p>
        </div>
      </li>`).join("");p.insertAdjacentHTML("beforeend",t),l?l.refresh():l=new S(".gallery a",{captionsData:"alt",captionDelay:250})}function q(){p.innerHTML=""}function $(){m.classList.add("is-active")}function O(){m.classList.remove("is-active")}function R(){g.classList.remove("hidden")}function h(){g.classList.add("hidden")}const y=document.querySelector(".form"),x=y.elements["search-text"],H=document.querySelector(".loadMoreBtn");let u="",c=1;const d=15;let f=0;y.addEventListener("submit",I);H.addEventListener("click",A);async function I(r){if(r.preventDefault(),q(),h(),c=1,u=x.value.trim(),!u){a.warning({title:"Warning",message:"Please enter a search term.",position:"topRight"});return}await b()}async function A(){c++,await b(!0)}async function b(r=!1){$();try{const t=await M(u,c,d);if(f=t.totalHits,t.hits.length===0&&!r){a.error({title:"Error",message:"No images found. Try another search term!",position:"topRight"});return}P(t.hits);const n=Math.ceil(f/d);c<n?R():(h(),a.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),r&&D()}catch{a.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{O()}}function D(){const r=document.querySelector(".gallery-item");if(r){const t=r.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
