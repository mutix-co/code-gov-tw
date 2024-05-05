import{_}from"./q-uemlvruI.js";import{o as k,q as E,_ as R,d as Q,j as M,w as W}from"./q-Cd-f-dK9.js";import"./q-DcQVA5E3.js";var B=Object.defineProperty,X=(t,e,i)=>e in t?B(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,T=(t,e,i)=>(X(t,typeof e!="symbol"?e+"":e,i),i);class pe extends Error{constructor(e,i){super(typeof e=="string"?e:""),T(this,"name","FormError"),T(this,"errors"),this.errors=typeof e=="string"?i||{}:e}}function he(t,e,i){const{checked:r,files:n,options:s,value:o,valueAsDate:a,valueAsNumber:c}=t;return!i||i==="string"?o:i==="string[]"?s?[...s].filter(l=>l.selected&&!l.disabled).map(l=>l.value):r?[...e.value||[],o]:(e.value||[]).filter(l=>l!==o):i==="number"?c:i==="boolean"?r:i==="File"&&n?k(n[0]):i==="File[]"&&n?[...n].map(l=>k(l)):i==="Date"&&a?a:e.value}function D(t){return[...Object.values(t.internal.fields),...Object.values(t.internal.fieldArrays)]}function F(t,e){return t.internal.fieldArrays[e]}function K(t,e){return+e.replace(`${t}.`,"").split(".")[0]}function w(t,e){$(t,!1).forEach(i=>{const r=F(t,i).items.length-1;e.filter(n=>n.startsWith(`${i}.`)&&K(i,n)>r).forEach(n=>{e.splice(e.indexOf(n),1)})})}function $(t,e=!0){const i=Object.keys(t.internal.fieldArrays);return e&&w(t,i),i}function U(t,e=!0){const i=Object.keys(t.internal.fields);return e&&w(t,i),i}function A(t,e){return t.internal.fields[e]}function N(t,e,i){const r=U(t,i),n=$(t,i);return typeof e=="string"||Array.isArray(e)?(typeof e=="string"?[e]:e).reduce((s,o)=>{const[a,c]=s;return n.includes(o)?(n.forEach(l=>{l.startsWith(o)&&c.add(l)}),r.forEach(l=>{l.startsWith(o)&&a.add(l)})):a.add(o),s},[new Set,new Set]).map(s=>[...s]):[r,n]}function Y(t,{items:e,initialItems:i,error:r}={items:[],initialItems:[],error:""}){const n=i.join()!==e.join();return{internal:{initialItems:[...i],startItems:[...i],validate:[],consumers:[]},name:t,items:e,error:r,active:!1,touched:n,dirty:n}}function q(t,e){const i=r=>r instanceof Blob?r.size:r;return Array.isArray(t)&&Array.isArray(e)?t.map(i).join()!==e.map(i).join():t instanceof Date&&e instanceof Date?t.getTime()!==e.getTime():Number.isNaN(t)&&Number.isNaN(e)?!1:t!==e}function Z(t,{value:e,initialValue:i,error:r}={value:void 0,initialValue:void 0,error:""}){const n=q(i,e);return{internal:{initialValue:i,startValue:i,validate:[],transform:[],elements:[],consumers:[]},name:t,value:e,error:r,active:!1,touched:n,dirty:n}}function g(t,e){return t.split(".").reduce((i,r)=>i==null?void 0:i[r],e)}let G=0;function O(){return G++}function H({loader:t,action:e,fieldArrays:i}){function r(a){var c;return((c=e==null?void 0:e.value)==null?void 0:c.values)&&g(a,e.value.values)}const n=()=>O(),s=a=>{var c;return((c=e==null?void 0:e.value)==null?void 0:c.errors[a])||""},o=(a,c,l)=>Object.entries(c).reduce((y,[d,u])=>{var p;const f=l?`${l}.${d}`:d;if(i!=null&&i.includes(f.replace(/.\d+./g,".$."))){const h=u.map(n);y[1][f]=Y(f,{initialItems:h,items:((p=r(f))==null?void 0:p.map(n))||[...h],error:s(f)})}else(!u||typeof u!="object"||Array.isArray(u)||u instanceof Date)&&(y[0][f]=Z(f,{initialValue:u,value:r(f)??u,error:s(f)}));return u&&typeof u=="object"&&o(y,u,f),y},a);return o([{},{}],t.value)}async function _e(t,e){const i=await t.resolve();return(typeof i=="function"?i():i).safeParse(e)}function P(t,e){return(typeof t!="string"&&!Array.isArray(t)?t:e)||{}}function J(t,e){t.dirty=e||D(t).some(i=>i.active&&i.dirty)}function ee(t,e){const i=q(e.internal.startValue,e.value);i!==e.dirty&&(e.dirty=i,J(t,i))}function x(t,e){var i,r;(r=(i=A(t,e))==null?void 0:i.internal.elements[0])==null||r.focus()}function te(t,e,i,{shouldActive:r=!0,shouldTouched:n=!1,shouldDirty:s=!1,shouldFocus:o=!!i}={}){for(const a of[A(t,e),F(t,e)])a&&(!r||a.active)&&(!n||a.touched)&&(!s||a.dirty)&&(a.error=i,i&&"value"in a&&o&&x(t,e));L(t,!!i)}function ie(t,e,i){const{shouldActive:r=!0,shouldTouched:n=!1,shouldDirty:s=!1,shouldValid:o=!1}=P(e,i);return N(t,e)[0].reduce((a,c)=>{const l=A(t,c);return(!r||l.active)&&(!n||l.touched)&&(!s||l.dirty)&&(!o||!l.error)&&(typeof e=="string"?c.replace(`${e}.`,""):c).split(".").reduce((y,d,u,f)=>y[d]=u===f.length-1?l.value:typeof y[d]=="object"&&y[d]||(isNaN(+f[u+1])?{}:[]),a),a},typeof e=="string"?[]:{})}function Ee(t,e,i){const[r,n]=N(t,e,!1),s=typeof e=="string"&&r.length===1,o=!s&&!Array.isArray(e),a=P(e,i),{initialValue:c,initialValues:l,keepResponse:y=!1,keepSubmitCount:d=!1,keepSubmitted:u=!1,keepValues:f=!1,keepDirtyValues:p=!1,keepItems:h=!1,keepDirtyItems:C=!1,keepErrors:S=!1,keepTouched:j=!1,keepDirty:V=!1}=a;r.forEach(m=>{const v=A(t,m);(s?"initialValue"in a:l)&&(v.internal.initialValue=s?c:g(m,l));const b=p&&v.dirty;!f&&!b&&(v.internal.startValue=v.internal.initialValue,v.value=v.internal.initialValue,v.internal.elements.forEach(I=>{I.type==="file"&&(I.value="")})),j||(v.touched=!1),!V&&!f&&!b&&(v.dirty=!1),S||(v.error="")}),n.forEach(m=>{var I;const v=F(t,m),b=C&&v.dirty;!h&&!b&&(l&&(v.internal.initialItems=((I=g(m,l))==null?void 0:I.map(()=>O()))||[]),v.internal.startItems=[...v.internal.initialItems],v.items=[...v.internal.initialItems]),j||(v.touched=!1),!V&&!h&&!b&&(v.dirty=!1),S||(v.error="")}),o&&(y||(t.response={}),d||(t.submitCount=0),u||(t.submitted=!1)),le(t)}function re(t,e,{duration:i}={}){t.response=e,i&&setTimeout(()=>{t.response===e&&(t.response={})},i)}async function ne(t,e,i){const[r,n]=N(t,e),{shouldActive:s=!0,shouldFocus:o=!0}=P(e,i),a=O();t.internal.validators.push(a),t.validating=!0;const c=t.internal.validate?await t.internal.validate(ie(t,{shouldActive:s})):{};let l=typeof e!="string"&&!Array.isArray(e)?!Object.keys(c).length:!0;const[y]=await Promise.all([Promise.all(r.map(async d=>{const u=A(t,d);if(!s||u.active){let f;for(const h of u.internal.validate)if(f=await h(u.value),f)break;const p=f||c[d]||"";return p&&(l=!1),u.error=p,p?d:null}})),Promise.all(n.map(async d=>{const u=F(t,d);if(!s||u.active){let f="";for(const h of u.internal.validate)if(f=await h(u.items),f)break;const p=f||c[d]||"";p&&(l=!1),u.error=p}}))]);if(ae(t,c,{shouldActive:s}),o){const d=y.find(u=>u);d&&x(t,d)}return L(t,!l),t.internal.validators.splice(t.internal.validators.indexOf(a),1),t.internal.validators.length||(t.validating=!1),l}function se(t,e,i,{on:r,shouldFocus:n=!1}){r.includes((t.internal.validateOn==="submit"?t.submitted:e.error)?t.internal.revalidateOn:t.internal.validateOn)&&ne(t,i,{shouldFocus:n})}async function Ae(t,e,i,r,n,s,o){o!==void 0&&(e.value=o);for(const a of e.internal.transform)e.value=await a(e.value,r,n);e.touched=!0,t.touched=!0,ee(t,e),se(t,e,i,{on:s})}function ae(t,e,{duration:i,shouldActive:r=!0}){const n=Object.entries(e).reduce((s,[o,a])=>([A(t,o),F(t,o)].every(c=>!c||r&&!c.active)&&s.push(a),s),[]).join(" ");n&&re(t,{status:"error",message:n},{duration:i})}function Fe(t,e,i){Object.entries(e).forEach(([r,n])=>{n&&te(t,r,n,{...i,shouldFocus:!1})})}function L(t,e){t.invalid=e||D(t).some(i=>i.active&&i.error)}function le(t){let e=!1,i=!1,r=!1;for(const n of D(t))if(n.active&&(n.touched&&(e=!0),n.dirty&&(i=!0),n.error&&(r=!0)),e&&i&&r)break;t.touched=e,t.dirty=i,t.invalid=r}function me(t){return E(()=>_(()=>import("./q-CiIQ3gkW.js"),[]),"s_b4MyjhrwMxE",[t])}const z=W(E(()=>_(()=>import("./q-samZDLvJ.js"),[]),"s_vBVRkPF8kFE"));function oe({children:t,name:e,type:i,...r}){const{of:n}=r,s=A(n,e);return R(z,{store:s,...r,children:t(s,{name:e,autoFocus:!1,ref:E(()=>_(()=>import("./q--irMVrBC.js"),[]),"s_0EFsQ07yXsM",[s]),onInput$:E(()=>_(()=>import("./q--irMVrBC.js"),[]),"s_WQShqIriXzI",[s,n,e,i]),onChange$:E(()=>_(()=>import("./q--irMVrBC.js"),[]),"s_vNtVq2dMPhY",[s,n,e]),onBlur$:E(()=>_(()=>import("./q--irMVrBC.js"),[]),"s_fzfym1ErEFI",[s,n,e])})},0,e)}function ue({children:t,name:e,...i}){const r=F(i.of,e);return R(z,{store:r,...i,children:t(r)},0,e)}function ce({of:t,action:e,onSubmit$:i,responseDuration:r,keepResponse:n,shouldActive:s,shouldTouched:o,shouldDirty:a,shouldFocus:c,reloadDocument:l,children:y,...d}){const{encType:u}=d,f={duration:r,shouldActive:s,shouldTouched:o,shouldDirty:a,shouldFocus:c};return Q("form",{...d,action:e==null?void 0:e.actionPath,children:y,onSubmit$:E(()=>_(()=>import("./q-CioguJ-V.js"),[]),"s_qmKnyqz75p4",[e,u,t,n,i,f,l]),"preventdefault:submit":!l,ref:p=>{t.element=p}},{method:"post",noValidate:!0},0,"Qg_0")}function fe({validate:t,validateOn:e="submit",revalidateOn:i="input",...r}){return M(()=>{var o,a;const[n,s]=H(r);return{internal:{fields:n,fieldArrays:s,fieldArrayPaths:r.fieldArrays,validate:t,validators:[],validateOn:e,revalidateOn:i},element:void 0,submitCount:0,submitting:!1,submitted:!1,validating:!1,touched:!1,dirty:!1,invalid:!1,response:((a=(o=r.action)==null?void 0:o.value)==null?void 0:a.response)||{}}})}function be(t){const e=fe(t);return[e,{Form:i=>ce({of:e,action:t.action,...i}),Field:i=>oe({of:e,...i}),FieldArray:i=>ue({of:e,...i})}]}export{pe as F,ie as a,re as b,ae as c,O as d,be as e,me as f,he as g,Ae as h,_e as i,Ee as r,Fe as s,le as u,ne as v};
