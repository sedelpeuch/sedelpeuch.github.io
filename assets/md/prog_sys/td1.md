
# 1. Pages de manuel et sections

section 1 = fonction bash
section 2 = appels système
section 3 = bibliothèque standard C

## `exit` est-il un appel système ?

Non : même si `man -k exit | grep ^exit ` renvoie :

```
exit (2)             - terminate the calling process
exit (3)             - cause normal process termination
exit_group (2)       - exit all threads in a process
```

En consultant le `man 2 exit`, on s'aperçoit que les appels système ne s'appellent pas `exit()` mais `_exit()` et `_Exit()`.

La fonction `exit()` appartient à la section 3 du `man`, c'est donc une fonction de la bibliothèque standard C, pas un appel système.

# 2. Implémentation des appels systèmes

Prérequis :

```
sudo apt-get install locate
sudo updatedb
```

Puis trouver les emplacements de la `libc`, avec `locate libc.so` ou `locate libc.a`.

On désassemble avec  `objdump -d <CHEMIN_VERS_LIBC>`.

On recherche dans le code assembleur le nom d'un appel système "pas trop commun", comme `gettimeoftheday` : `write` et `read` sont aussi des noms utilisés par des fonctions de la lib C.

```
Déassemblage de la section .text :

0000000000000000 <__gettimeofday>:
   0:   b8 60 00 00 00          mov    $0x60,%eax
   5:   0f 05                   syscall 
   7:   48 3d 00 f0 ff ff       cmp    $0xfffffffffffff000,%rax
   d:   77 01                   ja     10 <__gettimeofday+0x10>
   f:   c3                      retq   
  10:   48 8b 15 00 00 00 00    mov    0x0(%rip),%rdx        # 17 <__gettimeofday+0x17>
  17:   f7 d8                   neg    %eax
  19:   64 89 02                mov    %eax,%fs:(%rdx)
  1c:   b8 ff ff ff ff          mov    $0xffffffff,%eax
  21:   c3                      retq   

settimeofday.o:     format de fichier elf64-x86-64
```

Comment repérer qu'il s'agit bien d'un appel système ?

- l'instruction `syscall` (l. 5).
- l'instruction `mov $0x60,%eax` (l.0) : on écrit `0x60` dans le registre `eax` (`rax` sur les achitectures plus anciennes). Cette valeur 0x60 correspond en hexa à 96 en base 10, qui est le code de l'appel système `gettimeofday`. La table complète est disponible [ici](https://filippo.io/linux-syscall-table/).

# 3. Écriture avec `write(2)`

```c
#include <stdio.h>
#include <stdlib.h>

#include <unistd.h>
#include <string.h>

#include "utils.h"

int main(int argc, char *argv[])
{
  for (int i = 1; i < argc; i++) {
    size_t length = strlen(argv[i]); // strlen() est toléré dans cet exemple, mais pas forcément dans les prochains
    ssize_t byte_count = write(STDOUT_FILENO, argv[i], length);
    exit_if(byte_count != length, "write space");
  }

  return EXIT_SUCCESS;
}
```

# 4. Écriture d’un entier avec `write(2)`

+ Que se passe-t-il lorsque vous exécutez votre programme ?

Rien ne s'affiche : les entiers écrits ne correspondent pas à des codes de caractères ASCII imprimables.

```sh
./write_number
```

+ Observez la sortie grâce à l’outil `od` :

```sh
./write_number | od -x
```

Sur une architecture 64 bits, le `long` on constate que le `long` a une taille de 8 octets. 

Sur une architecture 32 bits (en compilant avec le flag `-m32`, `make CFLAGS=-m32`), le `long` a une taille de 4 octets.
