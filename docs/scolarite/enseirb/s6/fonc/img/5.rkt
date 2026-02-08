(********* Exercice  1  *********)

;; Returns #t iff e is an atom (grammar version)
;; Notice that this definition does not take into account all primitive types.
(define atom? (or/c number? symbol? boolean? string? null?))

;; Returns #t iff e is an atom (using complementary)
;; Notice this definition considers vectors as atoms
(define atom? (not/c cons?))

;; Returns #t iff e is a s-expression: s-expr :== atom | pair
(define (s-expr? e)
  (or (atom? e) (cons? e))) ;; always true for the second definition

(s-expr? 'a)    ;; -> #t
(s-expr? '(1 2));; -> #t

;; Returns T iff e is a clean list, according to the definition:
;; proper-list :== () | (s-expr . proper-list)
(define (list? e)
  (or (null? e)
      (and (cons? e) (s-expr? (car e)) (list? (cdr e)))))

(list? '((1 . 2) . (3 . 4)))          ;; -> #f
(list? '(a . b))                      ;; -> #f
(list? '(a  b . c))                   ;; -> #f
(list? '((a . aa) (b . bb) (c . cc))) ;; -> #t
(list? '(1 (2 3)))                    ;; -> #t

;; Returns T iff e prints without any dot:
;; dotless ::= () | (atom . dotless-list) | (dotless-list . dotless-list)
(define (dotless-list? e)
 (or (null? e)
     (and (cons? e) (atom? (car e)) (dotless-list? (cdr e)))
     (and (cons? e) (dotless-list? (car e)) (dotless-list? (cdr e)))))

(dotless-list? 'a)                             ;; -> #f
(dotless-list? '(a . b))                       ;; -> #f
(dotless-list? '((a . b)))                     ;; -> #f
(dotless-list? '((2 3) 7 8 (5 6)))             ;; -> #t
(dotless-list? '(ceci est une liste sans ".")) ;; -> #t
(dotless-list? '(1 (1 2 . 3) 5))               ;; -> #f

(********* Exercice  2  *********)

;; Helper to test for atoms
(define atom? (or/c number? symbol? boolean? string? null?))

;; Builds the list of the n+1 first numbers
(define (iota n)
  (if (zero? n) (list n)
      (append (iota (sub1 n)) (list n))))
(iota 4) ;; -> (0 1 2 3 4)

;; Same function, tail-recursive implementation
(define (iota-tr n)
  (letrec ([iota-rec (lambda (u res)
                       (if (zero? u)
                           (cons 0 res)
                           (iota-rec (sub1 u) (cons u res))))])
    (iota-rec n '())))
(iota-tr 4) ;; -> (0 1 2 3 4)

;; l1 and l2 must be list of numbers of the same length; Computes the
;; scalar product of l1 and l2
(define (scalar-product l1 l2)
  (cond [(not (= (length l1)
                 (length l2))) (raise "Lists of different length")]
        [(null? l1)            0]
        [else                  (+ (* (car l1) (car l2))
                                  (scalar-product (cdr l1) (cdr l2)))]))

;;; TEST
(scalar-product '(1 2 3) '(4 5))   ;; -> error
(scalar-product '(1 2 3) '(4 5 6)) ;; -> 32

;;; More compact solution with map
(define (map-scalar-product l1 l2)
  (apply + (map * l1 l2)))
(map-scalar-product '(1 2) '(3 4)) ;; -> 11

;; List of divisors of n starting from m
(define (divisors n m)
  (cond [(> m n)              '()]
        [(zero? (modulo n m)) (cons m (divisors n (add1 m)))]
        [else                 (divisors n (add1 m))]))
(divisors 24 1) ;; -> (1 2 3 4 6 8 12 24)
(divisors 51 1) ;; -> (1 3 17 51)

(********* Exercice  3  *********)

;; Helper to test for atoms
(define atom? (or/c number? symbol? boolean? string? null?))

;; Flattens a dotless list l
;; Only works with proper lists
(define (list-flatten l)
  (cond [(null? l) l]
        [(null? (car l)) (list-flatten (cdr l))]
        [(atom? (car l)) (cons (car l) (list-flatten (cdr l)))]
        [else (append (list-flatten (car l))
                      (list-flatten (cdr l)))]))

(list-flatten '((1 2 (3)) 4 (((5 6) 7))));;=> (1 2 3 4 5 6 7)
(list-flatten '(((a b) (c d) () e)  f))  ;;=> (a b c d e f)

;; Flattens a dotless list (tail-recursive) / Only works with proper
;; lists because of append - a tail-recursive variant

;; Notice : this function uses "reverse" and "append", that can be
;; written in a tail-recursive manner (here "renverse-tailrec" and "append-tailrec")
(define (renverse-tailrec l)
  (letrec ([reverse-int (lambda (m acc)
                          (if (null? m) acc
                              (reverse-int (cdr m) (cons (car m) acc))))])
    (reverse-int l '())))
(define (append-tailrec l1 l2)
  (letrec ([append-int (lambda (m1 m2 acc)
                         (cond [(and (null? m1) (null? m2)) (renverse-tailrec acc)]
                               [(and (null? m1) (cons? m2))
                                (append-int m1 (cdr m2) (cons (car m2) acc))]
                               [#t
                                (append-int (cdr m1) m2 (cons (car m1) acc))]))])
    (append-int l1 l2 '())))

(define (flatten-term-rec exp)
  (letrec ([flatten-tr (lambda (exp acc)
         ;; Flattens exp into the accumulator acc (tail recursive)"
         (cond [(null? exp) (renverse-tailrec acc)]
               [else (let ([hd (car exp)]
                           [tl (cdr exp)])
                   (cond [(null? hd) (flatten-tr tl acc)]
                         [(atom? hd) (flatten-tr tl (cons hd acc))]
                         [else       (flatten-tr (append-tailrec hd tl) acc)]))]))])
    (flatten-tr exp '())))

(flatten-term-rec '((1 2 (3)) 4 (((5 6) 7)))) ;; -> (1 2 3 4 5 6 7)
(flatten-term-rec '(((a b) (c d) e) f))       ;; -> (a b c d e f)
(flatten-term-rec '(a b))                     ;; -> (a b)
(flatten-term-rec '((a b) (c d) ()))          ;; -> (a b c d)

(********* Exercice  4  *********)

;; Returns #t iff e is an atom (grammar version)
(define atom? (or/c number? symbol? boolean? string? null?))

;; Given l, a list of numbers, returns the sum of the elements of l"
(define (sum-list l)
  (if (null? l)
      0 ;; default value, same behavior as +
      (+ (car l) (sum-list (cdr l)))))

;;; TEST
(sum-list '())      ;; -> 0
(sum-list '(1 3 5)) ;; -> 9
(sum-list (iota 4)) ;; -> 10

;; Given l, a list of numbers, returns the sum of the elements of l,
;; and doing it recursively on sublists
(define (sum-list* l)
  (cond [(null? l)       0]
        [(atom? (car l)) (+ (car l)
                            (sum-list* (cdr l)))]
        [else            (+ (sum-list* (car l))
                            (sum-list* (cdr l)))]))
(sum-list* '(10 (5 2))) ;; -> 17

;; Produce a list which results from reversing the elements in l."
(define (reverse-list l)
  (if (null? l)
      l
      (append (reverse-list (cdr l)) (list (car l)))))
(reverse-list '(a b (c d) e f)) ; (F E (C D) B A)

;; Produce a list which results from recursively reversing the elements in l.
(define (reverse-list* l)
  (cond [(null? l)       l]
        [(atom? (car l)) (append (reverse-list* (cdr l))
                                 (list (car l)))]
        [else            (append (reverse-list* (cdr l))
                   (list (reverse-list* (car l))))]))
(reverse-list* '(a b (c d) e f)) ;; => (F E (D C) B A)

;; More compact version using map
(define (reverse* l)
 (if (atom? l)
     l
     (reverse (map reverse* l))))
(reverse* '(a b (c d) e f)) ;; => (F E (D C) B A)

;; Counting the number of occurrences of element e in list l
(define (count-list e l)
  (if (null? l) ;; necessary, since in Scheme, (car l) is not
                ;; defined if l is not a pair
      0
      (let [(hd (car l))
            (tl (cdr l))]
        (cond
         [(and (atom? hd) (equal? hd e)) (add1 (count-list e tl))]
         [(and (atom? hd) (not (equal? hd e))) (count-list e tl)]
         [else (+ (count-list e hd) (count-list e tl))]))))

(count-list 'a '()) ;; -> 0
(count-list 'a '(a (b a (c a)) d a)) ;; -> 4

(********* Exercice  5  *********)

;; Constructs the list '(l1 l1 ... ln ln)
(define (stutter l)
  (if (null? l)
      l
      (cons (car l) (cons (car l) (stutter (cdr l))))))
(stutter '(hasta la vista)) ;; -> (HASTA HASTA LA LA VISTA VISTA)

;; Remove similar consecutive elements in the list l (effectively
;; being a inverse operation for stutter)
(define (unstutter l)
  (cond [(or (null? l) (= 1 (length l))) l]
        [(equal? (car l) (car (cdr l))) (unstutter (cons (car l) (cdr (cdr l))))]
        [else (cons (car l) (unstutter (cdr l)))]))
(unstutter '(hasta la vista))              ;; => (HASTA LA VISTA)
(unstutter '(hasta la vista vista))        ;; => (HASTA LA VISTA)
(unstutter '(hasta la vista vista vista))  ;; => (HASTA LA VISTA)
(unstutter '(hasta la))                    ;; => (HASTA LA)
(unstutter '(hasta))                       ;; => (HASTA)
(unstutter '())                            ;; => ()


(********* Exercice  6  *********)

(define (concat-map f l)
  "Map a function f onto a list l, and then append the resuls in a single list"
  (apply append (map f l)))

;;(concat-map (lambda (x) (list x (add1 x))) '(0 2 4)) ;; -> (0 1 2 3 4 5)

(define (remove-dups l)
  "Remove the duplicates from a list"
  (cond [(<= (length l) 1) l]
        [else (cons (car l) (remove-dups (remove* (list (car l)) (cdr l))))]))

;;(remove-dups '(0 0 1 0 1 0 1 0 0 1 0 2 0 1 0)) ;; -> (0 1 2)

(define (all-counts ops vals)
  "Computes all combinations of the vals obtained using operations in ops"
  (letrec ([all-counts-one-op-one-val (lambda (op val wals)
                (concat-map (lambda (x)
                              (all-counts ops
                                          (cons (op x val) (remove x wals)))
                              ) wals
                                ))]
           [all-counts-one-op (lambda (op wals)
                (concat-map (lambda (x)
                      (all-counts-one-op-one-val op x (remove x wals))) wals))
                                ]
           [all-counts-rec (lambda (ops wals)
                (if (<= (length wals) 1)
                    wals
                    (concat-map (lambda (op) (all-counts-one-op op wals))
                                ops)))])
    (remove-dups (all-counts-rec ops vals))))

;; (all-counts (list - + *) '(1 2 3 4))
;; (all-counts (list - + * (lambda (x y) x)) '(1 2 3 4))

(define (is-reachable? ops x l)
  (if (member x (all-counts ops l)) #t #f))

(is-reachable? (list - + * (lambda (x y) x)) 126 '(8 20 10 7 13)) ;; -> #t
