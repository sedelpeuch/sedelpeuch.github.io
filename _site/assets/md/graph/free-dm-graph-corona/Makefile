##
# Corona
#
# @file
# @version 0.1

all:build rapport doc

.PHONY: doc rapport

build:
	python3 src/corona.py
	mv -f *.png src/img_corona/
	ffmpeg -r 10 -y -i src/img_corona/jour_%d.png propagation.gif

visu:
	pandoc dm_graph_covid_19.md -o dm_graph_covid_19.html
	firefox dm_graph_covid_19.html

rapport:
	pandoc -s rapport/dm.md -o rapport/dm_graph_covid_19.tex
	pdflatex rapport/dm_graph_covid_19.tex

doc:
	doxygen Doxyfile
	firefox doc/html/index.html

clean:
	rm -f src/img_corona/*.png
	rm -f rapport/*.html
	rm -f rapport/*.aux
	rm -f rapport/*.log
	rm -f rapport/*.out
	rm -f *.log *.aux *.out
# end
