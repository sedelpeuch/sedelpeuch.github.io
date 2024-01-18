(********* Exercice  1  *********)

;; Sums a and b using only +1 and -1 operations
(define (plus-tail-rec a b)
  (if (zero? b) a
      (plus-tail-rec (add1 a) (sub1 b))))

;; Multiplies a and b using only +a operations / use with acc = 0
(define (product-tail-rec a b acc)
  (if (zero? b) acc
      (product-tail-rec a (sub1 b) (+ a acc))))

;; Multiplies a and b using only +a operations
(define (product-standalone a b)
  (letrec ([product-intern (lambda (a b acc)
                             (if (zero? b) acc
                                 (product-intern a (sub1 b) (+ a acc))))])
    (product-intern a b 0)))
(product-standalone 3 6) ;; -> 18

(********* Exercice  2  *********)

;; Computes the n-th term of the Fibonacci sequence (ineffectively)
(define (fibo-double n)
  (if (<= n 1)
      1
      (+ (fibo-double (- n 1))
         (fibo-double (- n 2)))))

(fibo-double 5)      ;; -> 8
(fibo-double 13)     ;; -> 377
;; (fibo-double 100) ;; -> no answer

;; Computes the n-th term of the Fibonacci sequence (tail.rec.)
(define (fibo-gen n a b)
  (cond ([zero? n] a)
        ([= 1 n]   b)
        (else      (fibo-gen (sub1 n) b (+ a b)))))

(fibo-gen 5 1 1)   ;; -> 8
(fibo-gen 13 1 1)  ;; -> 377
(fibo-gen 100 1 1) ;; -> very long number beginning like 573...101

;; Computes the n-th term of the Fibonacci sequence (tail.rec.)
(define (fibo-letrec n)
  (letrec ([fibo-rec (lambda (n a b)
                       (cond ([zero? n] a)
                             ([= 1 n]   b)
                             (else      (fibo-rec (sub1 n) b (+ a b)))))])
    (fibo-rec n 1 1)))

(fibo-letrec 13) ;; -> 377

;; Time experiments
(time (fibo-double 36)) ;; -> approximatively 1 s.
(time (fibo-gen 36 1 1))    ;; -> approximatively 0 s.
(time (fibo-gen 36000 1 1)) ;; -> approximatively 0.06 s.

(********* Exercice  3  *********)

(define x 12)
(define y 5)
(define q2 (let* ([x y]
                  [y x])
             (- x y)))

(define q2-without-star (let ([x y])
                          (let ([y x])
                            (- x y))))

(define x 12)
(define y 5)
(define q2 (let* ([x y]
                  [y x])
             (- x y)))

(define q2-without-star (let ([x y])
                          (let ([y x])
                            (- x y))))

(********* Exercice  4  *********)

;; New definition of a "if-then-else" function
(define (new-if predicate clause-then clause-else)
  (if predicate clause-then clause-else))

(define a 0)
(new-if (zero? a) #t #f) ;; -> #t
(new-if (zero? a)
        (print "a est nul")
        (print "a est non nul")) ;; prints both parts

;; Should compute the factorial of the integer n but in fact only
;; hangs in a loop
(define (new-factorial n)
  (new-if (<= n 1)
          1
          (* n (new-factorial (- n 1)))))
(new-factorial 5) ;; -> stack overflow

(********* Exercice  5  *********)

(define a 20)
(and (print 1) (= a 20) (print 2) (print 3));; void, prints "1 2 3"
(and (print 1) (= a 30) (print 2) (print 3));; #f, prints "1" (2nd bool is false)
(or  (print 1) (= a 20) (print 2) (print 3));; void, prints "1" (1st bool is true)
(or  (= a 30)  (= a 50) (print 1) (print 2));; void, prints "1" (3rd bool is true)


(********* Exercice  6  *********)

;; Compute the number of occurrences of the substrings inside the
;; string s that verify predicate p
(define (substrings s p)
  (letrec ([tail (lambda (str) (substring str 1 (string-length str)))]
           [begn (lambda (str) (substring str 0 (sub1 (string-length str))))]
           [sub-rec (lambda (subs rem res)
                      (if (zero? (string-length subs))
                          (if (zero? (string-length rem))
                              res
                              (let ([nrem (begn rem)])
                                    (sub-rec nrem nrem res)))
                          (if (p subs)
                              (sub-rec (tail subs) rem (add1 res))
                              (sub-rec (tail subs) rem res))))])
    (sub-rec s s 0)))

(substrings ""    (lambda (x) (equal? x "c"))) ;; -> 0
(substrings "abc" (lambda (x) (equal? x "c"))) ;; -> 1
(substrings "abbbababbabbbabab" (lambda (x) (equal? x "ab"))) ;; -> 6
(substrings "abbbababbabbbabab" (lambda (x) (equal? x "bb"))) ;; -> 5
(substrings "abbbababbabbbabab" (lambda (x) (string-contains? x "bb"))) ;; -> 112 (containing "bb")
(substrings "allez les verts"
    (lambda (x) (and (equal? (string-ref x 0) #\a)
                     (equal? (string-ref x (sub1 (string-length x))) #\e))))
;; -> 3 (substrings beginning with 'a' and ending with 'e'

;; Other way to write it, without letrec, but a bit longer and more complex

(define (my-substring-rec subs rem res pred)
  (let ([tail-subs (if (non-empty-string? subs) (substring subs 1 (string-length subs)) "")]
        [beg-rem (if (non-empty-string? rem) (substring rem 0 (sub1 (string-length rem))) "")])
        (if (not (non-empty-string? subs)) ; subs empty
            (if (not (non-empty-string? rem)) ; rem empty
                res
                (my-substring-rec beg-rem beg-rem res pred))
            (if (pred subs)
                (my-substring-rec tail-subs rem (add1 res) pred)
                (my-substring-rec tail-subs rem res pred)))))

(define (my-substring s p)
  (my-substring-rec s s 0 p))

(my-substring "" (lambda (x) (equal? x "c"))) ;; -> 0
(my-substring "abc" (lambda (x) (equal? x "c"))) ;; -> 1
(my-substring "abbbababbabbbabab" (lambda (x) (equal? x "ab"))) ;; -> 6
(my-substring "abbbababbabbbabab" (lambda (x) (equal? x "bb"))) ;; -> 5
(my-substring "abbbababbabbbabab" (lambda (x) (string-contains? x "bb"))) ;; -> 112 (containing "bb")
(my-substring "allez les verts"
    (lambda (x) (and (equal? (string-ref x 0) #\a)
                     (equal? (string-ref x (sub1 (string-length x))) #\e))))
;; -> 3 (substrings beginning with 'a' and ending with 'e'
