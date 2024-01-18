(********* Exercice  1  *********)

#lang racket
(provide set? set-empty set-add set-length set-mem)

(define set? list?)

(define (set-empty) '())

(define (set-add set s)
  (match set
    ['()         (list s)]
    [(cons x xs) (cond [(< s x) (cons s set)]
                       [(= s x) set]
                       [else (cons x (set-add s xs))])]))

(define set-length length)
(define (set-mem set s) (cons? (member s set)))

;; set-list.rkt

#lang racket
(provide set? set-empty set-add set-length set-mem)
(define SIZE 10)

(struct vector-set (size tab))
(define set? vector-set?)

(define (set-empty) (vector-set 0 (make-vector SIZE -1)))

(define set-length vector-set-size)

(define (set-mem set x)
  (number? (vector-member x (vector-set-tab set))))

(define (set-add set x)
  (if (or (set-mem set x) (= (set-length set) SIZE))
      set
      (let* ([size (vector-set-size set)]
             [tab  (vector-set-tab set)])
        (vector-set! tab size x)
        (vector-sort! tab < 0 (add1 size)) ;; bad
        (vector-set (add1 size) tab))))

;; set-vector.rkt

#lang racket
(require racket/contract)
(require "set-list.rkt")
;;(require "set-vector.rkt")
(provide (contract-out
          [set? (-> any/c boolean?)]
          [set-empty (-> set?)]
          [set-add (-> set? number? set?)]
          [set-length (-> set? (and/c number? (or/c positive? zero?)))]
          [set-mem (-> set? number? boolean?)]))

;; set-contract.rkt

#lang racket
(require "set-contract.rkt")
(require rackunit)
(require rackunit/text-ui)

;(set-add (set-empty) "abc")

(define all-tests
  (test-suite
   "Tests file for a set implementation"

   (test-case
    "Empty set has size zero"
    (let* ([set (set-empty)])
      (check-equal? (set-length set) 0)))

   (test-case
    "Adding to empty set yields size one"
    (let* ([set (set-empty)])
      (check-equal? (set-length (set-add set 666)) 1)))

   (test-case
    "Integer added to empty set is found back"
    (let* ([set (set-empty)])
      (check-true (set-mem (set-add set 666) 666))
      (check-false (set-mem (set-add set 666) 667))))))

(printf "Running tests\n")
(run-tests all-tests)

;; set-test.rkt

(********* Exercice  2  *********)

#lang racket
;; Tests whether x is a prime number
(define (prime? x)
  (letrec ([prime-rec (lambda (n)
                        (if (> n 1)
                            (if (zero? (modulo x n))
                                false
                                (prime-rec (sub1 n)))
                            true))])
    (prime-rec (floor (sqrt (abs x))))))
(prime? 7) ;; -> true
(prime? 4) ;; -> false

;; Returns the smallest prime strictly larger than x
(define (get-next-prime x)
  (if (prime? (add1 x)) (add1 x) (get-next-prime (add1 x))))

(get-next-prime 5) ;; -> 7
(get-next-prime 7) ;; -> 11

;; First implementation with external parameter
(define cpt1 1)
(define (gen-prime1)
  (let ([nxt (get-next-prime cpt1)])
    (set! cpt1 nxt)
    nxt))

(gen-prime1)
(set! cpt1 (- 34)) ;; gen-prime1 restarts from -34

;; Second implementation with internal parameter inside closure
(define gen-prime2
  (let ([cpt2 1])
    (lambda ()
      (let ([nxt (get-next-prime cpt2)])
        (set! cpt2 nxt)
        nxt))))

(gen-prime2)
;; (setf cpt2 (- 34)) ;; Returns an error : cpt2 is not defined
(define cpt2 (- 34))
(gen-prime2)          ;; gen-prime2's behavior is not altered

;; Third implementation passing an external parameter inside a closure
(define (gen-prime-int p)
  (lambda ()
    (let ([nxt (get-next-prime p)])
      (set! p nxt)
      nxt)))
(define cpt3 1)
(define gen-prime3 (gen-prime-int cpt3))
(gen-prime3)

;; Version with Eratoshene's sieve and functional parameter
(define gen-prime4
  (let ([next (lambda (x) true)]
        [cpt4 1])
    (lambda ()
      (letrec ([next-fun (lambda (f n)
                           (lambda (x)
                             (and (f x)
                                  (not (zero? (modulo x n))))))]
               [get-next-prime (lambda (cqt) ;; Warning ! Different from above
                                 (if (next cqt)
                                     cqt
                                     (get-next-prime (add1 cqt))))])
        (set! cpt4 (get-next-prime (add1 cpt4)))
        (set! next (next-fun next cpt4))
        cpt4))))

(gen-prime4)

(********* Exercice  3  *********)

;; First macro
(define-syntax-rule (first l)
  (car l))

(first '(1 2 3))     ;; -> 1
(first '(f (g x y))) ;; -> f

(expand #'(first '(1 2 3)))           ;; -> Sntx object (#%app car (quote (1 2 3)))
(syntax->datum (expand #'(first '(1 2 3)))) ;; -> Data object

;; Second macro
(define-syntax-rule (second l)
  (first (cdr l)))

(second '(1 2 3))     ;; -> 2
(second '(f (g x y))) ;; -> (g x y)

(expand-once #'(second '(1 2 3))) ;; -> Sntx object (first (cdr (quote (1 2 3))))
(expand #'(second '(1 2 3))) ;;-> Sntx object (#%app car (#%app cdr (quote 1 2 3)))

;; Third macro
(define-syntax-rule (third l)
  (caddr l))

(third '(1 2 3))       ;; -> 3
(third '(f (g x y) z)) ;; -> z

(expand-once #'(third '(1 2 3))) ;; -> Sntx object (caddr (quote (1 2 3)))
(expand #'(third '(1 2 3)))      ;; -> Sntx object (#%app caddr (quote (1 2 3)))
(********* Exercice  4  *********)

;; Trick for using expand from within the module
;; Not necessary inside the REPL
(define-namespace-anchor anchor)
(define (expand-expr syntax)
  (parameterize ([current-namespace (namespace-anchor->namespace anchor)])
    (expand syntax)))

(define-syntax-rule (double x)
  (set! x (* 2 x)))

(define y 4)
(expand #'(double z)) ;; -> Sntx object (set! z (#%app * '2 (#%top . z)))
(double y)
y                     ;; -> 8

(********* Exercice  5  *********)

;; First version of cond-raise with let + if
(define-syntax-rule (cond-raise1 body ...)
  (let ([res (cond body ...)])
    (if (void? res)
        (raise "cond-raise1 : no match" )
        res)))

(define (suspicious-choice1 n)
  (cond-raise1
   [(zero? n) 'zero]
   [(= 1 n)   'un]
   [(= 2 n)   'deux]))

(suspicious-choice1 1)    ;; -> un
;; (suspicious-choice1 5) ;; -> error

;; Second version with nested cond
(define-syntax-rule (cond-raise2 body ...)
  (cond body ...
        [else (raise "cond-raise2 : no match")]))

(define (suspicious-choice2 n)
  (cond-raise2
   [(zero? n) 'zero]
   [(= 1 n)   'un]
   [(= 2 n)   'deux]))

(suspicious-choice2 1)    ;; -> un
;; (suspicious-choice2 5) ;; -> error
(********* Exercice  6  *********)

;; Trick for using eval from within the module
;; Taken from : http://docs.racket-lang.org/guide/eval.html
;; Not necessary inside the REPL
(define-namespace-anchor anchor)
(define ns (namespace-anchor->namespace anchor))
(define (eval-expr expr) (eval expr ns))

;; The following function simply transforms a list of symbols
(define (transform-let-to-lambda arglist)
  (let* ([body    (cddr arglist)]
         [argvals (cadr arglist)]
         [args (map car argvals)]
         [vals (map cadr argvals)])
    (append (list (append (list 'lambda args) body)) vals)))

;; In the following expression, the "let" is used only as a symbol. It
;; could be replaced by any other symbol.
(transform-let-to-lambda '(let
                 ((x 45) (y (+ 3 4)))
                 (print x)
                 (cons x y))) ;; ->((lambda (x y) (print x) (cons x y)) 45 (+ 3 4))

;; Now we place this function inside a macro (but we need to evaluate it)
(define-syntax-rule (letm1 body ...)
  (eval-expr (transform-let-to-lambda '(let body ...))))

(expand #'(letm1
                 ([x 45] [y (+ 3 4)])
                 (print x)
                 (cons x y))) ;;-> ((lambda (x y) (print x) (cons x y)) 45 (+ 3 4))

(letm1
    ([x 45] [y (+ 3 4)])
    (print x)
    (cons x y)) ;; prints, -> (45 . 7)

(********* Exercice  7  *********)

(struct lrational (num denum)) ;; rational is a protected name
(define nearly-pi (lrational 22 7))

;; Returns the value of an lrational
(define (lrational-value x)
  (/ (lrational-num x) (lrational-denum x)))

(lrational-value nearly-pi) ;; -> 22/7

;; Sum of two lrationals
(define (lrational-sum x y)
  (lrational (+ (* (lrational-num x) (lrational-denum y))
                (* (lrational-num y) (lrational-denum x)))
             (* (lrational-denum x) (lrational-denum y))))

(lrational-value (lrational-sum nearly-pi nearly-pi)) ;; -> 308/49 = 44/7

;; Product of two lrationals
(define (lrational-prod x y)
  (lrational (* (lrational-num x) (lrational-num y))
             (* (lrational-denum x) (lrational-denum y))))

(lrational-value (lrational-prod nearly-pi nearly-pi)) ;; -> 484/49
