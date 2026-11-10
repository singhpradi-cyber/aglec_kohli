from pathlib import Path
from urllib.parse import urlparse,unquote
from bs4 import BeautifulSoup
import json
import xml.etree.ElementTree as ET
root=Path(__file__).resolve().parent.parent
pages={p.name:BeautifulSoup(p.read_text(),'html.parser') for p in root.glob('*.html')}
errors=[]
def check(ok,message):
 if not ok:errors.append(message)
for name,s in pages.items():
 for el in ['h1','main','title']:check(len(s.find_all(el))==1,f'{name}: one {el}')
 ids=[n['id'] for n in s.find_all(id=True)]
 check(len(ids)==len(set(ids)),f'{name}: duplicate IDs')
 c=s.select_one('link[rel=canonical]');expected='https://www.bestgastroenterologistinagra.com/'+('' if name=='index.html' else name)
 check(c and c['href']==expected,f'{name}: canonical')
 check(len(s.select('script[src^="script.js"]'))==1,f'{name}: shared script once')
 check(not s.select('script[src*="googletagmanager.com"]'),f'{name}: no duplicate tag load')
 check(not s.select('link[href*="fonts.googleapis.com"]'),f'{name}: no external fonts')
 check(s.select_one('.mobile-actions a[href="tel:+919762772430"]'),f'{name}: mobile call')
 for js in s.select('script[type="application/ld+json"]'):json.loads(js.string)
 for tag in s.select('[href], [src]'):
  href=tag.get('href',tag.get('src',''));u=urlparse(href)
  if u.scheme or u.netloc:continue
  target=unquote(u.path) or name
  check((root/target).exists(),f'{name}: missing file {href}')
  if u.fragment and target in pages:check(pages[target].find(id=unquote(u.fragment)) is not None,f'{name}: missing anchor {href}')
for a in ['home','about','services','liver','endoscopy','doctor','blogs','contact']:check(pages['index.html'].find(id=a),f'old ad destination #{a}')
urls=[e.text for e in ET.parse(root/'sitemap.xml').iter() if e.tag.endswith('loc')]
check(len(urls)==len(pages),'sitemap page count')
if errors:raise SystemExit('\n'.join(errors))
print(f'{len(pages)} pages: titles, links, anchors, schema, contacts and sitemap passed.')
