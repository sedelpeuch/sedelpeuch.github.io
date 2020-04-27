##
# Corona
#
# @file
# @version 0.1

all:build rapport doc

.PHONY: doc

build:
	python3 src/simulation.py
	mv -f *.png tmp_img/

build-gif:
	python3 src/corona.py -gif
	mv -f *.png tmp_img/
	ffmpeg -r 10 -y -i tmp_img/jour_%d.png propagation.gif

visu:
	pandoc dm_graph_covid_19.md -o dm_graph_covid_19.html
	firefox dm_graph_covid_19.html

rapport:
	pandoc dm_graph_covid_19.md -o dm_graph_covid_19.tex
	pdflatex dm_graph_covid_19.tex

doc:
	doxygen Doxyfile
	firefox doc/html/index.html

clean:
	rm -f tmp_img/*.png
	rm -f rapport/*.html
	rm -f rapport/*.aux
	rm -f rapport/*.log
	rm -f rapport/*.out
	rm -r doc/*
# end
