const {chromium} = require('playwright');
const assert = require('node:assert/strict');
require('node:fs').mkdirSync('/tmp/portfolio-checks', {recursive:true});
(async()=>{
 const browser = await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const page = await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://fonts.googleapis.com/**',r=>r.abort());
 await page.route('https://fonts.gstatic.com/**',r=>r.abort());
 await page.goto('http://127.0.0.1:8000');
 await page.getByRole('link',{name:'Ver projetos'}).click();
 assert.equal(await page.locator('.project-item').count(),6);
 for(const name of ['Abapfy','Tako','DrawAi','VynPad','Lyn','TorrentFlixx']){
   await page.getByRole('button',{name:new RegExp('^'+name)}).click();
   await page.getByRole('dialog').waitFor({state:'visible'});
   assert.equal(await page.locator('#project-title').innerText(),name);
   assert.match(await page.getByRole('link',{name:'Explorar repositório'}).getAttribute('href'),/^https:\/\/github.com\/esc4n0rx\//);
   await page.keyboard.press('Escape');
   assert.equal(await page.locator('dialog').evaluate(e=>e.open),false);
   assert.equal(await page.evaluate(()=>document.activeElement.classList.contains('project-item')),true);
 }
 console.log('PASS six project dialogs, repository links, Escape and focus restoration');
 await page.getByRole('button',{name:/Ativar tema/}).click();
 const theme=await page.locator('body').getAttribute('data-theme');await page.reload();
 assert.equal(await page.locator('body').getAttribute('data-theme'),theme);
 await page.goto('http://127.0.0.1:8000/#info');assert(await page.locator('#info').isVisible());
 await page.getByRole('link',{name:'Contato',exact:true}).click();await page.goBack();assert(await page.locator('#info').isVisible());
 console.log('PASS persistent theme, deep links and browser history');
 for(const key of ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'])await page.keyboard.press(key);
 assert(await page.locator('body').evaluate(e=>e.classList.contains('blueprint')));
 await page.keyboard.type('coffee');assert.match(await page.locator('#dev-toast').innerText(),/418/);
 assert.match(await page.evaluate(()=>portfolio.help()),/coffee/);
 console.log('PASS three developer easter eggs');
 for(const width of [360,390,768,1280]){
   await page.setViewportSize({width,height:850});await page.goto('http://127.0.0.1:8000/#projetos');
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`);
   await page.getByRole('button',{name:/^Abapfy/}).click();
   const box=await page.locator('.modal-content').boundingBox();assert(box.x>=0 && box.x+box.width<=width+1);
   await page.screenshot({path:`/tmp/portfolio-checks/projects-${width}.png`,animations:'disabled'});
   await page.keyboard.press('Escape');
 }
 console.log('PASS mobile and desktop width checks');
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:8000/#inicio');
 assert.equal(await page.locator('#inicio').evaluate(e=>getComputedStyle(e).animationName),'none');
 await page.goto('http://127.0.0.1:8000/404.html');await page.getByRole('link',{name:'Explorar projetos'}).click();assert(await page.locator('#projetos').isVisible());
 await page.goto('http://127.0.0.1:8000/#invalid');await page.waitForURL('**/404.html');
 await page.goto('http://127.0.0.1:8000/error.html');assert(await page.getByRole('heading',{name:'Uma pausa inesperada.'}).isVisible());
 assert.deepEqual(errors,[]);
 console.log('PASS reduced motion, error pages, invalid section recovery, zero browser errors');
 await page.route('**/app.js',r=>r.abort());await page.goto('http://127.0.0.1:8000');await page.waitForURL('**/error.html');
 console.log('PASS failed application script redirects to recovery page');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
