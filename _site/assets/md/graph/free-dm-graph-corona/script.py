#!/usr/bin/env python

import os

for i in range(1,100):
    os.system("convert -pointsize 20 -draw 'text 270, 150 \"q = {0}%\"' src/img_corona/random_p-{0}_n-1000.png {0}.png".format(i))
