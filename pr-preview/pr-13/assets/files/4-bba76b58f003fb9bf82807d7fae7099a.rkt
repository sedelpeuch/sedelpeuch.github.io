(********* Exercice  1  *********)

(cons '(A B C) '(1 2 3))             ;; -> ((a b c) 1 2 3)
(append '(A B C) '((1 2) 3))         ;; -> (a b c (1 2) 3)
(last '((A 1) (B 2) (C 3)))          ;; -> (c 3)
(drop-right '((A 1) (B 2) (C 3)) 1)  ;; -> ((a 1) (b 2))
(car '((A (B C)) D (E F)))           ;; -> (a (b c))
(cdr '((A (B C)) D (E F)))           ;; -> (d (e f))
(caddr'((A (B C)) D (E F)))          ;; -> (e f)
(cons 'NOBODY (cons 'IS '(PERFECT))) ;; -> (nobody is perfect)
(list (add1 2) (sub1 5) 6)           ;; -> (3 4 6)
(cdr '(a b))                         ;; -> (b)
(cdr '(a . b))                       ;; -> b
'(a . (b . (c . ())))                ;; -> (a b c)
'(a . (b . (c . d)))                 ;; -> (a b c . d)
(assoc 'bleu '([rouge . red]
               [vert . green]
               [bleu . blue]
               [jaune . pink])) ;; -> (bleu. blue)

(********* Exercice  2  *********)

(car (cdr (cdr (cdr '(A B C D))))) ;; -> d
(cadddr '(A B C D))                ;; -> d
(cadadr (car '((A (B C)) E)))      ;; -> c
(caaar '(((FLUTE) ENCORE) UNE))    ;; -> flute
(cadar '(((FLUTE) ENCORE) UNE))    ;; -> encore

(********* Exercice  3  *********)

;; Reverses the list (a b c) into (c b a)
(define (invert3 l)
  (cons (caddr l)
        (cons (cadr l) (cons (car l) '()))))
(invert3 '(a b c)) ;; -> (c b a)

;; Reverses the list (a b c) into (c b a) using first, second and third
(define (invert3-with-first l)
  (cons (third l) (cons (second l) (cons (first l) '()))))
(invert3-with-first '(1 2 3)) ;; -> (3 2 1)

;; Other possibility with the list function
;; Reverses the list (a b c) into (c b a) using first, second and third
(define (invert3-with-list l)
  (list (third l) (second l) (first l)))
(invert3-with-list '(f g h)) ;; -> (h g f)

;; Other possibility with pattern-matching
(define  (invert3-with-match l)
  (match l
    [(list a b c) (list c b a)]))

;; List constructions
(define x '(1 2))
(define y '((3 4)))
(define z 5)
(cons (car x)
      (cons (cadr x)
            (cons (caar y)
                  (cons (cadar y)
                        (cons z '()))))) ;; -> (1 2 3 4 5)
(append x (car y) (cons z '())) ;; -> (1 2 3 4 5)

(********* Exercice  4  *********)

;; Assuming that l is a list of numbers
;; returns the list of their absolute values
(define (list-abs-recursive l)
  (if (null? l)
      '()                 ;; empty list
      (cons (abs (car l)) ;; non-empty list
            (list-abs-recursive (cdr l)))))

(list-abs-recursive '(-1 -2 -3 4 -6)) ;; -> (1 2 3 4 6)


(********* Exercice  5  *********)

;; Builds a list made of n occurrences of e
(define (repeat n e)
  ;; notice that "when" expression could be used here
  (if (<= n 0) '()
      (cons e (repeat (- n 1) e))))

(repeat 5 'glou) ;; -> (glou glou glou glou glou)


(********* Exercice  6  *********)

;; Insertion sort implementation
;; Assuming e is a number and l a list of numbers, insert the number e
;; into l before the first number e' of l s.t. e'>e
(define (insert e l)
  (if (or (null? l) (> (car l) e))
      (cons e l) ;; already sorted
      (cons (car l) (insert e (cdr l)))))

;; Assuming l is a list of number, sort the list l using insertion in
;; the ascending order
(define (insertion-sort l)
  (if (null? l)
      l
      (insert (car l) (insertion-sort (cdr l)))))

(insertion-sort '(3 652 16 877 3 2 6 879 4 3 215 7))
;; -> (2 3 3 3 4 6 7 16 215 652 877 879)

;; Insert the symbol e into l before the first symbol e' of l
;; s.t. e'>e, where > is based on the lexicographic order"
(define (insert-sym e l)
  (if (or (null? l) (not (symbol<? (car l) e)))
      (cons e l)
      (cons (car l) (insert-sym e (cdr l)))))

;; Sort the list l using insertion in the ascending order
(define (insertion-sort-sym l)
  (if (null? l)
      l
      (insert-sym (car l) (insertion-sort-sym (cdr l)))))

(insertion-sort-sym '(you cannot buy love but you can live without it))
;; -> (but buy can cannot it live love without you you)
(insertion-sort-sym '(you cannot love)) ;; -> (cannot love you)


;; function merging two lists, asuming they are already sorted
(define (merge a b)
  (cond [(null? a) b]
        [(null? b) a]
        [(< (car a) (car b)) (cons (car a ) (merge (cdr a) b))]
        [else (cons (car b ) (merge a (cdr b)))]))

;; Merge sort implementation
;; function applying the merge sort
(define (sort-merge l)
  (if (<= (length l) 1)
      l
      (let ([half (quotient (length l) 2)])
        (merge (sort-merge (take l half))(sort-merge (drop l half))))))

(merge '(3 38) '(4 27)) ; -> '(3 4 27 38)
(sort-merge '(38 3 4 27)) ; '(3 4 27 38)
(sort-merge '(5 3 4 1 2)) ; '(1 2 3 4 5)
(sort-merge '(284 78 185 54 4645)) ; -> '(54 78 185 284 4645)

(********* Exercice  7  *********)

;; Exchange the first and last elements of l
(define (swap-first-last l)
  (if (<= (length l) 1) ;; simple cases of length <= 1
  ;; using length may be discussed; it depends on the way it is implemented
  ;; otherwise one may use (null? (cdr l))
      l
      (append (list (last l))
              (cdr (drop-right l 1))
              (list (car l)))))
(swap-first-last '())                  ;; -> ()
(swap-first-last '(1 2 3 4))           ;; -> (4 2 3 1)
(swap-first-last '(YOU CANT BUY LOVE)) ;; -> (LOVE CANT BUY YOU)

;; Other implementation with let
(define (swap-first-last-with-let l)
  (if (<= (length l) 1) ;; simple cases of length <= 1
      l
      (let ([head (list (car l))]  ;; head in a list
            [tail (list (last l))] ;; tail in a list
            [rest (cdr (drop-right l 1))])
        (append tail rest head))))
(swap-first-last-with-let '())                  ;; -> ()
(swap-first-last-with-let '(1 2 3 4))           ;; -> (4 2 3 1)
(swap-first-last-with-let '(YOU CANT BUY LOVE)) ;; -> (LOVE CANT BUY YOU)

(********* Exercice  8  *********)

;; Circularly shift the elements of the list to the left
(define (rotate-left l)
  (if (null? l)
      l
      (append (cdr l) (list (car l)))))
(rotate-left '(1 2 3 4 5)) ;; -> (2 3 4 5 1)

;; Circularly shift the elements of the list to the right
(define (rotate-right l)
  (if (null? l)
      l
      (cons (last l) (drop-right l 1))))
(rotate-right '(1 2 3 4 5)) ;; -> (5 1 2 3 4)
