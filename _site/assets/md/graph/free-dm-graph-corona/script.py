#!/usr/bin/env python

import os

for i in range(1,30):
    os.system("convert -pointsize 20 -draw 'text 270, 150 \"r = {0} jours\"' tmp_img/courbe_propa_{0}.png {0}".format(i))
