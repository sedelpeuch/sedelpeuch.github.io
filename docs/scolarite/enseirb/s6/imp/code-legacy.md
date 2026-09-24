---
title: Impératif - Code legacy
description: "Reprise d'un code legacy en C : transformation d'un Makefile en projet CMake."
---

## Code Legacy

### Transformation du Makefile en CMake

```cmake
# Version minimale de CMake requise
cmake_minimum_required(VERSION 3.0)

# Étiquette du projet
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

Remarque : `file(GLOB_RECURSE ...)` s'utilise normalement avec des motifs (par exemple `src/*.c`). Pour une liste explicite de fichiers, `set(source_files ...)` est plus lisible, et un nom mal orthographié (comme `src/auxilaire.h` ci-dessus) y est signalé par CMake au lieu d'être ignoré silencieusement.

### Mise en place de la documentation

Section non rédigée dans ces notes.
