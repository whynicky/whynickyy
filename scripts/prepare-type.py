from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.basePen import BasePen
import json
font=TTFont('public/media/Inter.woff2')
if 'fvar' in font: font=instantiateVariableFont(font,{'wght':900},inplace=True)
gs=font.getGlyphSet(); cmap=font.getBestCmap()
class Pen(BasePen):
 def __init__(self):super().__init__(gs);self.out=[]
 def _moveTo(self,p):self.out+=['m',*p]
 def _lineTo(self,p):self.out+=['l',*p]
 def _qCurveToOne(self,a,b):self.out+=['q',*b,*a]
 def _curveToOne(self,a,b,c):self.out+=['b',*c,*a,*b]
 def _closePath(self):pass
out={}
for c in set('whynicky® ?'):
 if ord(c) not in cmap:continue
 name=cmap[ord(c)];pen=Pen();gs[name].draw(pen)
 out[c]={'ha':font['hmtx'][name][0],'x_min':0,'x_max':font['hmtx'][name][0],'o':' '.join(str(round(v,3)) if isinstance(v,(float,int)) else v for v in pen.out)}
json.dump({'glyphs':out,'familyName':'Inter','ascender':font['hhea'].ascent,'descender':font['hhea'].descent,'resolution':font['head'].unitsPerEm,'boundingBox':{'yMin':font['head'].yMin,'yMax':font['head'].yMax},'underlineThickness':50},open('public/type/identity.json','w'))
print('Preserved Inter outlines for whynicky® only.')
