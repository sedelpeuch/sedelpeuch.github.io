(********* Exercice  1  *********)

(********* Exercice  2  *********)

- 2 1               ;; -> #<procedure:-> 2 1

(+ (*) (+))         ;; -> 1, because (*) returns 0 as a default

;; (* (+ 2 5) ((* 3 4) (- 1 2))) ;; raises error (expr begins with number)
(* (+ 2 5) (* 3 4) (- 1 2))      ;; -> -84

;; (12 + (* 3 4))        ;; raises error (expr begins with number)
(+ 12 (* 3 4))           ;; -> 24

;; (+ 2 (* 5 (log (8)))) ;; raises error (8) cannot be applied
(+ 2 (* 5 (log 8)))      ;; 12.39720770839918

(+ 1 2 3 4 5 6)          ;; -> 21

(log -2)                 ;; -> 0.6931471805599453+3.141592653589793i

;; (define 3 (+ 2 1))    ;; raises error (integer is not a valid identifier)
(define three (+ 2 1))

(********* Exercice  3  *********)

;; Returns the square of x
(define (square x)
  (* x x))

;; Returns the (rational) mean of x and y
(define (ratio-mean x y)
  (/ (+ x y) 2))

;; Returns the (real) mean of x and y
(define (real-mean x y)
  (/ (+ x y) 2.0))

;; Evaluates the quadratic polynomial ax2+bx+c
(define (eval-quadratic a b c x)
  (+ (* a x x) (* b x) c))

(********* Exercice  4  *********)

(define (a) (sqrt (+ 1 (sqrt (+ 2 (sqrt 3))))))
(a) ;; -> 1.7122650649295326

(define b (* (+ 2 3)
             (+ 4 5 6)))
b   ;; -> 75

(define (c) (log (+ (* 99 99) 3)))
(c) ;; -> 9.190545744648004

(define d (/ (+ (a) b)
             (- (a) b)))
d   ;; -> -1.0467271929319832

(define (e) (- (/ (+ (a) b)
                  (+ (a) (* 2 b)))
               (sqrt (/ (+ (a) (* 2 b))
                        (+ (a) b)))))
(e) ;; -> -0.9006567576706871

(********* Exercice  5  *********)

;; Computes the discriminant of the polynomial ax^2+bx+c
(define (discriminant a b c)
  (- (* b b) (* 4 a c)))

;; Computes the first root of the polynomial ax^2+bx+c"
(define (racine1 a b c)
  (if (> (discriminant a b c) 0)
      (/ (- (- b) (sqrt (discriminant a b c)))
         (* 2 a))
      (raise 'negative_discriminant)))

;; Computes the first root of the polynomial ax^2+bx+c"
(define (racine2 a b c)
  (if (> (discriminant a b c) 0)
      (/ (+ (- b) (sqrt (discriminant a b c)))
         (* 2 a))
      (raise 'negative_discriminant)))

;; Computes the first root of the polynomial ax^2+bx+c
;; Solution using the let-syntax and calling discrmiminant only once
(define (racine1-let a b c)
  (let ([delta (discriminant a b c)])
    (if (> delta 0)
      (/ (- (- b) (sqrt delta))
         (* 2 a))
      (raise 'negative_discriminant))))

;; Functions returning a string telling the number of real roots of a
;; degree-2 real polynomial (version with cond)
(define (carac-racines-trinome-with-cond a b c)
  (let ([d (discriminant a b c)])
    (cond
     [(> d 0) "Two distinct real roots"]
     [(< d 0) "Two complex conjugate roots"]
     [else    "One real root of multiplicity 2"])))

;; Function returning a string telling the number of real roots of a
;; degree 2 real polynomial (version with if)
(define (carac-racines-trinome-with-if a b c)
  (if (> (discriminant a b c) 0)
      "Two distinct real roots"
    (if (< (discriminant a b c) 0)
        "Two complex conjugate roots"
        "One real root of multiplicity 2")))

(********* Exercice  6  *********)

(define (convert-to-base num base)
  (if (zero? num)
      ""
      (string-append (convert-to-base (quotient num base) base)
                     (number->string (remainder num base)))))

(convert-to-base 666 2) ;; -> "1010011010"
(convert-to-base 666 3) ;; -> "220200"

(define (convert-to-int nums base)
  (let ([len (string-length nums)])
    (if (zero? len)
        0
        (+ (* (convert-to-int (substring nums 0 (sub1 len)) base) base)
           (string->number (substring nums (sub1 len) len) base)))))

(convert-to-int "1010011010" 2) ;; -> 666
(convert-to-int "220200" 3) ;; -> 666
