---
layout: page
hide: true
title:  Impératif - code-legacy-sujet
---

## Code Legacy

### Transformation du Makefile en Cmake

```c
# Utilisation de la dernière version de CMake
cmake_minimum_required(VERSION 3.0)

#Etiquette du projet
project(project)

file(
  GLOB_RECURSE
  source_files
  src/auxiliaire.c
  src/auxilaire.h
  src/global.c
  src/global.h
  src/good.c
  src/good.h
  src/queue.c
  src/queue.h
  src/stockex.c
  src/stockex.h
  )

add_executable(
  project
  ${source_files}
  src/loop.c
  src/loop.h
  )

add_executable(
  test
  ${source_files}
  tst/tst.c
  )

target_link_libraries(project m)
target_link_libraries(test m)
```

### Mise en place de la documentation
