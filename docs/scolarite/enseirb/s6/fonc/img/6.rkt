(********* Exercice  1  *********)

;; Compute the value of the function f at 1
(define (valeur-en-un f)
  (f 1))
(define (polynome x) (+ (* 3 x x) 4.7))
(valeur-en-un polynome)                       ;; -> 7.7
(valeur-en-un (lambda (x) (+ (* 3 x x) 4.7))) ;; -> 7.7

;; Compute the product function x -> y -> x*y
(define (product x)
  (lambda (y) (* x y)))
(product 2)     ;; -> #procedure
((product 2) 3) ;; -> 6 = 2*3

(********* Exercice  2  *********)

;; Composition de deux fonctions
(define (compose f g) (lambda (x) (f (g x))))

(define (a x) (+ 2 x))
(define (b x) (+ 3 x))
((compose a b) 4) ;; -> 9 = (4 + 3) + 2
(define (c x) (* x 7))
((compose a c) 4) ;; -> 30 = (4 * 7) + 2
((compose c a) 4) ;; -> 42 = (4 + 2) * 7

;; Version C , cf http://rosettacode.org/wiki/Compose_function

(********* Exercice  3  *********)

;; Returns 1+sqrt(2)+ ... +sqrt(N)
(define (root-sum n)
  (if (< n 1)
      0
      (+ (root-sum (sub1 n)) (sqrt n))))

;; Returns (1+sqrt(2))* ... *(1+sqrt(2)+ ... +sqrt(n)).
(define (root-sum-product n)
  (if (< n 1)
      1
      (* (root-sum-product (sub1 n)) (root-sum n))))

(root-sum-product 3) ;; -> 10.009967675098245

;; Same as ROOT-SUM-PRODUCT but uses a local definition
;; of ROOT-SUM.
(define (root-sum-product-using-letrec n)
  (letrec ([root-sum (lambda (n)
                       ;;Returns 1+sqrt(2)+ ... +sqrt(N)
                       (if (< n 1)
                           0
                           (+ (root-sum (sub1 n)) (sqrt n))))])
    (if (< n 1)
        1
        (* (root-sum-product-using-letrec
            (sub1 n)) (root-sum n)))))

(root-sum-product-using-letrec 3) ;; -> 10.009967675098245
(********* Exercice  4  *********)

;; Returns the sum of f(k) for k from n to p included
(define (sigma f n p)
  (if (> n p)
      0
      (+ (f n)
         (sigma f (add1 n) p))))

(define (sqr x) (* x x))
(sigma sqr 1 10)                              ;; -> 385
(sigma (lambda (x) (/ (add1 (sqrt x)))) 1 10) ;; -> 3.23823

(********* Exercice  5  *********)

;; (very) Generic implementation of a composition of a binary operator
;; operation.
;; Returns operation f(i) for i from p to n.
;; Version with associativity to the right
(define (op-prod f operation element-neutre n p)
  (if (> n p)
      element-neutre
      (operation
       ( f p)
       (op-prod f operation element-neutre n (sub1 p)))))

;; Definition of the factorial using op-prod
(define (fact n)
  (op-prod identity * 1 1 n))
(fact 6) ;; -> 720

;; Approximation of the number e = exp(1) by its n-term Taylor expansion
(define (e-approx n)
  (op-prod (lambda (n) (/ (fact n)))
           +
           0.0
           0 n))
(e-approx 10) ;; -> 2.7182818011463845
(exp 1.0)     ;; -> 2.718281828459045

(********* Exercice  6  *********)

;; Returns true iff abs(a*a-x)<eps
(define (test-arret? a x eps)
  (< (abs (- x (* a a)))
     eps))
(test-arret? 2.0001 4 0.1)    ;; -> #t
(test-arret? 2.0001 4 0.0001) ;; -> #f

;; Returns the following term of the Newton fixed point algorithm for
;; computing the square root
(define (suivant a x)
  (/ (+ a (/ x a))
     2))
(suivant 1.5 2) ;; -> 1.416667

;; Computes sqrt(x) using the Newton fixed point algorithm up to
;; precision eps (do-loop version)
(define (racine-do start x eps)
  (do ((a start (suivant a x)))
      ((test-arret? a x eps) a)))
(racine-do 1.0 2 0.001) ;; -> 1.414..

;; Computes sqrt(x) using the Newton fixed point algorithm up to
;; precision eps (tailrec)
(define (racine-rec start x eps)
  (if (test-arret? start x eps)
      start
      (racine-rec (suivant start x) x eps)))
(racine-rec 1.0 2 0.001) ;; -> 1.414..

;; Computes sqrt(x); precision epsilon is 1/1000 by default
;; possibility to give a default value for precision
(define (racine-carree x [epsilon 1/1000])
  (racine-rec 1.0 x epsilon))
(racine-carree 2) ; --> 1.41421568..


;; Application to the computation of the cubic root
;; Returns true iff abs(a*a*a-x)<eps
(define (test-arret-cub? a x eps)
  (< (abs (- x (* a a a))) eps))

;; Returns the following term of the Newton fixed point algorithm for
;; computing the cubic root
(define (suivant-cub a x)
  (/ (+ (* 2 a) (/ x (* a a)))
     3))

;; Computes sqrt(x) using the Newton fixed point algorithm up to
;; precision eps (tailrec) -- version without function call
(define (cubic-rec start x eps)
  (if (test-arret-cub? start x eps)
      start
      (cubic-rec (suivant-cub start x) x eps)))
(cubic-rec 1.0 8 0.0001) ;; -> 2.000005

;; Computes sqrt(x) using the Newton fixed point algorithm up to
;; precision eps (tailrec) -- version with generic functions
(define (racine-gen start x eps test next)
  (if (test start x eps)
      start
      (racine-gen (next start x) x eps test next)))
(racine-gen 1.0 25 0.0001 test-arret? suivant)        ;; -> 5.0
(racine-gen 1.0 8 0.0001 test-arret-cub? suivant-cub) ;; -> 2.000005


(********* Exercice  7  *********)

;; Sorts the list l in increasing order using a generic comparison
;; predicate "superiorp". Uses insertion sort.
(define (sort-gen l superiorp)
  (letrec ([insert-gen (lambda (x l)
      ;; Insert x in an ordered list l, using comparison predicate superiorp
      (cond [(null? l)              (list x)]
            [(superiorp x (car l)) (cons (car l)
                                          (insert-gen x (cdr l)))]
            [else (cons x l)]))])
    (if (null? l)
        '()
        (insert-gen (car l) (sort-gen (cdr l) superiorp)))))

(sort-gen '("mercury" "venus" "earth") string>=?) ;; -> ("earth" "mercury" "venus")
(sort-gen '(1 2) >=)         ;; -> (1 2)
(sort-gen '(1 2) <=)         ;; -> (2 1)
(sort-gen '(8 6 3 5 1 2) >=) ;; -> (1 2 3 5 6 8)

(********* Exercice  8  *********)

;; Fonction pour calculer le point fixe
(define (fixpoint f stop? start)
  (if (stop? start ( f start))
      (f start)
      (fixpoint f stop? (f start))))

;; Returns the square root of X with a precision of EPSILON, that is,
;; a number A such that |A**2 - X| < EPSILON, using the Newton method.
(define (newton-sqrt x [epsilon 1/100])
  (fixpoint (lambda (a)
               (/ (+ a (/ x a)) 2))
             (lambda (a anext)
               (< (abs (- (* a a) x)) epsilon))
             1))

(newton-sqrt 10000.0) ;; -> 100.0

(********* Exercice  9  *********)

(define db (file->list "path to higher.txt"))

(struct person (name birth death))

;; A database containing a list of persons
(define dbp (map (lambda (l) (person (first l) (second l) (third l))) db))
;; (define dbp (map (curry apply person) db)) ;; The same using curry

;; The list of names in the database in alphabetical order
(define names (sort (map person-name dbp) string<=?))

;; The person in the database born the earliest
(define oldest (first
                (sort dbp
                      (lambda (p1 p2)
                        (< (person-birth p1) (person-birth p2))))))
(person-name oldest) ;; -> "Thales"

;; The longest living time of all these persons
(define (person-age p) (- (person-death p) (person-birth p)))
(define longest (apply max (map person-age dbp)))
longest ;; -> 105

;; The mean of all ages in the database
(define (average l) (/ (foldl + 0 l) (length l)))
(define mean-age (average (map person-age dbp)))
mean-age ;; -> 68 33/40
