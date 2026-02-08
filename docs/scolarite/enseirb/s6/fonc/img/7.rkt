(********* Exercice  1  *********)

;;Computes a lambda expression that is the derivative of f up to precision
(define (derivee-approx f precision)
  (lambda (x) (/ (- (f (+ x precision))
                    (f (- x precision)))
                 (* 2 precision))))
(derivee-approx sin 0.001d0)
(define (polynome x) (+ (* 3 x x) 4.7))

;; Using doubles with Scheme notation
(derivee-approx polynome 0.001)      ; -> a function
((derivee-approx sin 0.001) 1)       ; -> 0.5403022158176896
(cos 1)                              ; -> 0.5403023058681398
((derivee-approx polynome 0.0001) 1) ; -> 6.00000000000378 (should be 6)

;;Computes a lambda expression that is the ordre-th derivative of f up to precision
(define (derivee-n-approx f ordre precision)
  (if (zero? ordre)
      f
      (derivee-n-approx (derivee-approx f precision) (sub1 ordre) precision)))
((derivee-n-approx polynome 0 1d-5) 1) ; => 7.7
((derivee-n-approx polynome 1 1d-5) 1) ; => 5.999999999994897
((derivee-n-approx polynome 2 1d-5) 1) ; => 6.000002716888274

;; Using the basic formulas given in the exercise
(define (derivee-2-approx f precision)
  (lambda (x) (/ (+ (f (+ x precision))
                    (* -2 ( f x))
                    (f (- x precision)))
                 (* precision precision))))
(define (derivee-3-approx f precision)
  (lambda (x) (/ (+ (- ( f (- x (* 2 precision))))
                    (* 2 ( f (- x precision)))
                    (* -2 ( f (+ x precision)))
                    ( f (+ x (* 2 precision))))
                 (* 2 precision precision precision))))

;; Computes a lambda expression that is the ordre-th derivative of f
;; up to precision (version with the cond instruction)
(define (derivee-n-approx-cond f ordre h)
  (cond [(zero? ordre) f]
        [(= 1 ordre) (derivee-approx f h)]
        [(= 2 ordre) (derivee-2-approx f h)]
        [(= 3 ordre) (derivee-3-approx f h)]
        [else (derivee-n-approx f ordre h)]))

;; Default floats in Scheme are double precision floats (64 bits)
((derivee-n-approx-cond sin 2 0.01) 1)   ;; -> -0.8414639725728978
((derivee-n-approx-cond sin 2 0.001) 1)  ;; -> -0.8414709147253063
(- (sin 1))                              ;; -> -0.8414709848078965

(********* Exercice  2  *********)

((lambda (x y) (+ (* 2 x) y )) 2 3)              ;; -> 7
(filter positive? '(0 1 0 2 0 3 0 0 0))          ;; -> (1 2 3)
(filter (lambda (x) (= x 3)) '(0 1 2 3 0 1 2 3)) ;; -> (3 3)
(map (lambda (x) (* 2 x)) '(1 2 3))              ;; -> (2 4 6)

(********* Exercice  3  *********)

;; Return the list of the absolute values of l
(define (list-abs-map l)
  (map abs l))
(list-abs-map '(-1 2 -3 4 -5 6)) ;; -> (1 2 3 4 5 6)

;; Return the list of the squares of l
(define (list-carres-with-letrec l)
  (letrec ([square (lambda (x) (* x x))])
        (map square l)))
(list-carres-with-letrec '(-1 2 -3 4 -5 6))  ;; -> (1 4 9 16 25 36)

;; Return the list of the squares of l using an anonymous function
(define (list-carres-with-anonymous l)
  (map (lambda (n) (* n n)) l))
(list-carres-with-anonymous '(-1 2 -3 4 -5 6))  ;; -> (1 4 9 16 25 36)

(********* Exercice  4  *********)

;; Retourne le nombre d'elements de la liste verifiant pred
(define (how-many pred l)
  (if (null? l)
      0
      (+ (how-many pred (cdr l))
         (if (pred (car l))
             1
             0))))
(how-many even? '(1 5 7 6 2)) ;; -> 2
(how-many number? '(2 3 4 a b 5 t + 8)) ;; -> 5

;; Retourne le nombre d'elements de la liste verifiant pred
;; version avec map et lambda
(define (how-many-map pred l)
  (apply +
         (map
          (lambda (x)
            (if (pred x) 1 0))
          l)))
(how-many-map even? '(1 5 7 6 2)) ;; -> 2
(how-many-map number? '(2 3 4 a b 5 t + 8)) ;; -> 5

(********* Exercice  5  *********)

#lang racket

(define matrix   '((11 12 13 14) (21 22 23 24) (31 32 33 34)))
(define matrix-t '((11 21 31) (12 22 32) (13 23 33) (14 24 34)))

;; Computes the scalar product of two vectors LIST1 and LIST2,
;; represented by lists of numbers of the same length.
(define (scalar-product list1 list2)
  (apply + (map * list1 list2)))

(= 1  (scalar-product '(1 0 0) '(1 2 3))) ;; -> 1  = 1 + 0 + 0
(= 14 (scalar-product '(1 2 3) '(1 2 3))) ;; -> 14 = 1 + 4 + 9

;; Transpose first solution : take the car of each line, store them
;; into a list, and apply transposition recursively to the cdr of each
;; list. Returns the transposition of matrix LINE-LIST, assuming
;; LINE-LIST is a list of lines of same length n, for some n>0.
(define (transpose-pedestrian line-list)
  (if (null? (car line-list)) ;; stop condition : no more column in matrix
      '()
      (cons (map car line-list)
            (transpose-pedestrian (map cdr line-list)))))

;; Transpose second solution : returns the transposition of matrix
;; LINE-LIST, assuming LINE-LIST is a list of lines of same length n,
;; for some n>0.
(define (transpose line-list)
  (apply map list line-list))

(equal? matrix-t (transpose matrix))
(equal? matrix   (transpose matrix-t))

;; Computes the product of LINE-LIST matrix by VECTOR vector, assuming
;; LINE-LIST is a matrix of size m*n and VECTOR is a vector of length n.
(define (mat-vect line-list vector)
  (map (lambda (line) (scalar-product line vector))
          line-list))

(equal? '(11 21 31) (mat-vect matrix '(1 0 0 0)))
(equal? '(12 22 32) (mat-vect matrix '(0 1 0 0)))

;; Computes the m*k product matrix of MATRIX-MN by MATRIX-NK, assuming
;; MATRIX-MN is an m*n matrix and MATRIX-NK is an n*k matrix.
(define (mat-mat matrix-mn matrix-nk)
  (transpose (map (lambda (line) (mat-vect matrix-mn line))
                     (transpose matrix-nk))))

(equal? '((1 2) (3 4)) (mat-mat '((1 0) (0 1)) '((1 2) (3 4))))
(equal? '((1 2) (0 1)) (mat-mat '((1 1) (0 1)) '((1 1) (0 1))))
(equal? '((1 0) (0 1)) (mat-mat '((0 1) (-1 0)) '((0 -1) (1 0))))

;; Returns true if and only if there is at least a row, column or diagonal
;; of MATRIX whose elements are all different from zero.
(define (has-path matrix)
  (letrec ([positive-line? (lambda (l) (not (member 0 l)))]
           [any-line? (lambda (m) (ormap positive-line? m))]
           [get-diag  (lambda (m) (if (null? m) '()
                                      (cons (car (car m))
                                            (get-diag (map cdr (cdr m))))))])
    (or (any-line? matrix)
        (any-line? (transpose matrix))
        (positive-line? (get-diag matrix))
        (positive-line? (get-diag (map reverse matrix))))))

(has-path '((1 0 0) (0 2 0) (0 0 5))) ;; -> #t
(has-path '((1 0 0) (0 2 0) (0 0 0))) ;; -> #f

(********* Exercice  6  *********)

;; Somme des images par la fonction des elements de la liste
(define (map-and-sum f l)
  (apply + (map f l)))
(map-and-sum abs '(1 -1 -2 2)) ;; -> 6

;; Sums the f(l_i) for l_i in l
(define (map-and-sum-fold f l)
  (foldl +  0 (map f l)))
(map-and-sum-fold abs '(1 -1 -2 2)) ;; -> 6

;; Produit des images par la fonction des elements de la liste
(define (map-and-prod f l)
  (apply * (map f l)))
(map-and-prod abs '(1 -1 -2 2)) ;; -> 4

;; Product the f(l_i) for l_i in l
(define (map-and-prod-fold f l)
  (foldl * 1 (map f l)))
(map-and-prod-fold abs '(1 -1 -2 2)) ;; -> 4

;; List iterate (not tail-recursive)
;; Compute (f x1 (f x2 ... (f xn b) ...))
(define (iter-from-right f b l)
  (if (null? l)
      b
      (f (car l) (iter-from-right f b (cdr l)))))
(iter-from-right + 0 '(1 2 3))   ;; -> 6  = 1+2+3
(iter-from-right - 4 '(1 2 3 4)) ;; -> 2 = 1-(2-(3-(4-4)))
;; Same code using foldr
(foldr - 4 '(1 2 3 4)) ;; -> 2

;; Iterate list (this function *is* tail-recursive)
;; Compute (f xn ... (f x2 (f x1 b)) ... )
(define (iter-from-left f b l)
  (if (null? l)
      b
      (iter-from-left f (f (car l) b) (cdr l))))
(iter-from-left + 0 '(1 2 3))   ;; -> 6
(iter-from-left - 4 '(1 2 3 4)) ;; -> 6 = 4-(3-(2-(1-4)))
;; Same code using foldl
(foldl - 4 '(1 2 3 4)) ;; -> 6

;; Une version simplifiee de append, utilisant iter-from-right
(define (my-append-iterate l1 l2)
  (iter-from-right cons l1 l2))
(my-append-iterate '(a b c) '(d e f)) ;; -> (a b c d e f)

;; Une version simplifiee de map, utilisant iter-from-right
(define (my-map-iterate f l)
  (iter-from-right (lambda (x y) (cons (f x) y)) l '()))
(my-map-iterate (lambda (x) (* 2 x)) '(2 3 4 5)) ;; -> (4 6 8 10)

;; Produit de l'image par la fonction f des elements passes en argument
(define (prod-iterate f l)
  (iter-from-left (lambda (x y) (* (f x) y)) 1 l))
(prod-iterate sqrt '(4 9 25)) ;; -> 30 = 2 * 3 * 5

;; Inverse l'ordre des elements de la liste l, utilisant iter-from-left
(define (reverse l)
  (iter-from-left cons '() l))
(reverse '(1 2 3 4 5 6)) ;; -> (6 5 4 3 2 1)

(********* Exercice  7  *********)

;; Returns the list (f(x1) f(x2) ... f(xn))
(define (append-map f l)
  (apply append (map f l)))

(append-map (lambda (x) (list x (* x x))) '(1 2 3 4)) ;; -> (1 1 2 4 3 9 4 16)

;; Map selectif selon le predicat pred
(define (map-select f l pred)
  (append-map (lambda (x) (if (pred x)
                              (list ( f x))
                              '() ))
              l))

(map-select (lambda (x) (/ 1 x))
            '(a 2 0 4 10)
            (lambda (x) (and (number? x) (not (zero? x))))) ;; -> (1/2 1/4 1/10)

;; Supprime de la liste les elmts qui verifient le predicat pred
(define (remove-if pred l)
  (append-map (lambda (x) (if (not (pred x))
                              (list x)
                              '()))
                          l))

(remove-if (lambda (x) (and (number? x) (positive? x)))
           '(a 2 0 4 10)) ;; ->   (a 0)

(filter (lambda (x) (and (number? x) (positive? x)))
           '(a 2 0 4 10)) ;; ->   (2 4 10)
