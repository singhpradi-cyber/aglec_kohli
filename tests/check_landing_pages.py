from pathlib import Path
from bs4 import BeautifulSoup

root = Path(__file__).resolve().parent.parent
pages = {
    'digestive-care-agra.html': 'Gastroenterologist in Agra',
    'liver-specialist-agra.html': 'Liver specialist consultation in Agra',
    'endoscopy-agra.html': 'Endoscopy & digestive procedures in Agra',
    'fibroscan-agra.html': 'FibroScan in Agra',
}
for filename, heading in pages.items():
    html = (root / filename).read_text()
    soup = BeautifulSoup(html, 'html.parser')
    assert soup.h1.get_text() == heading, filename
    assert soup.select_one('a[href="tel:+919927005959"]'), filename
    assert soup.select_one('a[href="tel:+919762772430"]'), filename
    assert 'Vijay Business World' in soup.get_text(), filename
    assert '10 AM–8 PM' in soup.get_text(), filename
    assert 'Monday–Saturday' in soup.get_text(), filename
    assert 'Sunday OPD closed' in soup.get_text(), filename
    assert soup.select_one('a[href="fibroscan-agra.html"]'), filename
    assert len(soup.select('script[src^="script.js"]')) == 1, filename
    assert not soup.select('form'), 'Do not imply a confirmed online booking'
print('Four service pages: headings, contacts, hours and navigation verified.')
