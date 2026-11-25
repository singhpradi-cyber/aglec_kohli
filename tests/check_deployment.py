"""Verify public service pages and shared assets after GitHub Pages publishes."""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
import hashlib
import time
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parent.parent
base = 'https://www.bestgastroenterologistinagra.com/'
files = ['index.html', 'digestive-care-agra.html', 'liver-specialist-agra.html',
         'endoscopy-agra.html', 'fibroscan-agra.html', 'contact.html',
         'styles.css', 'script.js', 'aglec-logo.jpg']
def verify(filename):
    url = base + ('' if filename == 'index.html' else filename)
    request = Request(url, headers={'User-Agent': 'AGLEC-Deployment-Check/1.0', 'Cache-Control': 'no-cache'})
    with urlopen(request, timeout=20) as response:
        assert response.status == 200, f'{filename}: HTTP {response.status}'
        actual = response.read()
    expected = (root / filename).read_bytes()
    if filename.endswith('.html'):
        live = BeautifulSoup(actual, 'html.parser')
        local = BeautifulSoup(expected, 'html.parser')
        assert live.h1 and live.h1.get_text() == local.h1.get_text(), f'{filename}: heading mismatch'
        assert live.select_one('a[href="tel:+919927005959"]'), f'{filename}: primary call link'
        marker = local.select_one('meta[name="aglec-release"]')
        if marker:
            current = live.select_one('meta[name="aglec-release"]')
            assert current and current['content'] == marker['content'], f'{filename}: old deployment'
        assert 'Vijay Business World' in live.get_text(), f'{filename}: address'
    else:
        assert hashlib.sha256(actual).digest() == hashlib.sha256(expected).digest(), f'{filename}: asset mismatch'
    print(f'OK {url}', flush=True)

pending = files[:]
deadline = time.monotonic() + 480
errors = {}
while pending and time.monotonic() < deadline:
    for filename in pending[:]:
        try:
            verify(filename)
            pending.remove(filename)
            errors.pop(filename, None)
        except (URLError, HTTPError, AssertionError, TimeoutError, OSError) as exc:
            errors[filename] = str(exc)
    if pending:
        print(f'Waiting for public deployment: {errors}', flush=True)
        time.sleep(15)
if pending:
    raise SystemExit(f'Deployment could not be verified: {errors}')
print('Public service destinations and shared assets verified.', flush=True)
