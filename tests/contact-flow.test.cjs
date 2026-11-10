const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const code = fs.readFileSync(require('node:path').join(__dirname,'../script.js'),'utf8');
function run(host='www.bestgastroenterologistinagra.com') {
 const handlers={},inserted=[],attrs={'aria-expanded':'false'};
 const btn={setAttribute(k,v){attrs[k]=v;},getAttribute(k){return attrs[k];},addEventListener(k,f){handlers['button:'+k]=f;},focus(){this.focused=true;}};
 const menu={classList:{toggle(){}},querySelectorAll(){return [{addEventListener(k,f){handlers['menu:'+k]=f;}}];}};
 class Element {constructor(href){this.href=href;}closest(){return this;}getAttribute(){return this.href;}}
 const document={body:{classList:{add(){}}},head:{appendChild(n){inserted.push(n);}},referrer:'https://example.org/private?patient=sample',getElementById(id){return id==='menuBtn'?btn:menu;},querySelector(){return inserted.length?inserted[0]:null;},createElement(){return {};},addEventListener(k,f){(handlers[k]||=[]).push(f);}};
 const window={location:{hostname:host,origin:`https://${host}`,search:'?gclid=example-click&patient=sample&condition=liver'}};
 const context=vm.createContext({window,document,Element,URL,URLSearchParams,Date});vm.runInContext(code,context);
 return {window,handlers,inserted,attrs,btn,rerun(){vm.runInContext(code,context);},click(href,isTrusted=true){for(const fn of handlers.click||[])fn({target:new Element(href),isTrusted});},events(){return(window.dataLayer||[]).map(a=>Array.from(a)).filter(a=>a[0]==='event');}};
}
test('menu opens, closes on navigation and Escape restores focus',()=>{const r=run('localhost');r.handlers['button:click']();assert.equal(r.attrs['aria-expanded'],'true');r.handlers['menu:click']();assert.equal(r.attrs['aria-expanded'],'false');r.handlers['button:click']();r.handlers.keydown[0]({key:'Escape'});assert.equal(r.attrs['aria-expanded'],'false');assert.equal(r.btn.focused,true);});
test('preview hosts send no Ads events',()=>{for(const host of ['localhost','127.0.0.1','singhpradi-cyber.github.io']){const r=run(host);r.click('tel:+919762772430');assert.equal(r.inserted.length,0);assert.equal(r.events().length,0);}});
test('production loads one tag and page visits are not conversions',()=>{const r=run();r.rerun();assert.equal(r.inserted.length,1);assert.equal(r.events().length,0);});
test('primary and alternate phone clicks preserve their existing action',()=>{const r=run();r.click('tel:+919762772430');r.click('tel:+919927005959');assert.equal(r.events().length,2);for(const e of r.events())assert.equal(e[2].send_to,'AW-622603961/WlN6CNiti4wdELnd8KgC');});
test('WhatsApp clicks preserve their existing action once',()=>{const r=run();r.rerun();r.click('https://wa.me/919927005959?text=appointment');assert.equal(r.events().length,1);assert.equal(r.events()[0][2].send_to,'AW-622603961/TInxCNuti4wdELnd8KgC');});
test('directions, unrelated numbers and synthetic clicks are not conversions',()=>{const r=run();r.click('https://www.google.com/maps/dir/?api=1');r.click('tel:+917819918198');r.click('https://wa.me/919762772430');r.click('tel:+919762772430',false);assert.equal(r.events().length,0);});
test('measurement omits medical paths, referrer details and custom query fields',()=>{const r=run();r.click('https://wa.me/919927005959?text=private-details');const payload=r.events()[0][2];assert.equal(payload.page_location,'https://www.bestgastroenterologistinagra.com/?gclid=example-click');assert.equal(payload.page_referrer,'https://example.org/');assert.equal(payload.page_title,'AGLEC clinic contact');assert.doesNotMatch(JSON.stringify(r.window.dataLayer),/patient=|condition=|private-details|\/private/);});
