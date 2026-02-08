(********* Exercice  1  *********)

(********* Exercice  2  *********)

;; Computes the sum of the integers ranging from a to b included
(define (sum-do a b)
  (let ((x 0))
    (do ([x a (add1 x)]
         [s 0 (+ s x)])
        ((> x b) s))))
(sum-do 1 5) ;; -> 15

;; Computes the sum of the integers ranging from a to b included
;; (recursively)
(define (sum-rec a b)
  (if (< b a)
      0
      (+ a (sum-rec (add1 a) b))))
(sum-rec 1 5) ;; -> 15

;; Another implementation summing from the right
;; Computes the sum of the integers ranging from a to b included (recursively)
(define (sum-rec-from-other-end a b)
  (if (< b a)
      0
      (+ b (sum-rec-from-other-end  a (sub1 b)))))
(sum-rec-from-other-end 1 5) ;; -> 15

;; Computes the sum of the squares of the integers ranging from a to b
;; included (recursively)
(define (sum-squares a b)
  (if (< b a)
      0
      (+ (sqr a)
         (sum-squares (add1 a) b))))
(sum-squares 1 5) ;; -> 55

;; Computes the sum of f(k) for k ranging from a to b included
;; (recursively)
(define (sum-gen a b f)
  (if (< b a)
      0
      (+ (f a)
         (sum-gen (+ 1 a) b f))))
(sum-gen 1 5 add1) ;; -> 20
(sum-gen 1 5 (lambda (x) (* x x))) ;; -> 55

(********* Exercice  3  *********)

;; Computes the greatest common divisor of a and b
(define (pgcd a b)
    (if (zero? b)
        a
        (pgcd b (modulo a b))))

(pgcd 32 24) ;; -> 8
(pgcd 4 2)   ;; -> 2
(pgcd 2 4)   ;; -> 2

(********* Exercice  4  *********)

;; Computes x to the n-th, n>=0
(define (power-simple x n)
  (if (<= n 0)
      1
      (* x (power-simple x (sub1 n)))))
(power-simple 2 3) ;; -> 8

;; Computes x to the n-th * acc in a tail-recursive manner
(define (power-tail-rec x n acc)
  (if (<= n 0)
      acc
      (power-tail-rec x (sub1 n) (* acc x))))
(power-tail-rec 2 3 1) ;; -> 8

(define (square x) (* x x))
;; Computes x to the n-th
(define (power-with-cond x n)
  (cond
    ([< n 0]           (raise "n must be positive"))
    ([zero? n]         1)
    ([even? n]         (square (power-with-cond x (/ n 2))))
    (else              (* x (power-with-cond x (- n 1))))))
(power-with-cond 2 3) ;; -> 8

;; Also computes x to the n-th
(define (power-with-cond-and-let x n)
  (cond
    ([< n 0]           (raise "n must be positive"))
    ([zero? n]         1)
    ([even? n]         (let ([y (power-with-cond-and-let x (/ n 2))])
                         (* y y)))
    (else              (* x (power-with-cond-and-let x (- n 1))))))
(power-with-cond-and-let 2 3) ;; -> 8

(********* Exercice  5  *********)

;;;;; Solution with if
;; Returns true iff n is even
(define (pair n)
  (if (zero? n) true
      (impair (sub1 n))))

;; Returns true iff n is odd
(define (impair n)
  (if (zero? n) false
      (pair (sub1 n))))

(pair 3)
(impair 7)

;;;;; Solution with boolean operators
;; Returns true iff n is even
(define (pair-b n)
  (or (zero? n)
      (impair-b (sub1 n))))

;; Returns true iff n is odd
(define (impair-b n)
  (and (> n 0)
       (pair-b (sub1 n))))

(pair-b 3)
(impair-b 7)

(********* Exercice  6  *********)

(********* Exercice  7  *********)

;; Sums a and b using only +1 and -1 operations
(define (plus a b)
  (if (zero? b) a
      (add1 (plus a (sub1 b)))))

(plus 2 4) ;; -> 6

;; Multiplies a and b using only +a operations
(define (produit a b)
  (if (zero? b) 0
      (+ a (produit a (sub1 b)))))

(produit 3 3) ;; -> 9

;;;;; Tail recursive solutions
;; Sums a and b using only +1 and -1 operations
(define (plus-term a b)
  (if (= b 0) a
      (plus-term (add1 a) (sub1 b))))

(plus-term 2 4) ;; -> 6

;; Multiplies a and b using only +a operations
;; The function possesses an additional argument ac that must be set to 0
(define (produit-term a b ac)
  (if (zero? b) ac
      (produit-term a (sub1 b) (+ a ac))))

(produit-term 3 3 0) ;; -> 9
(********* Exercice  8  *********)

;; Computes the length of a run of the Syracuse sequence starting from n
(define (syracuse n)
  (cond [(= n 1) 0]
        [(even? n) (+ 1 (syracuse (/ n 2)))]
        [else  (+ 1 (syracuse (+ 1 (* 3 n))))]))

(syracuse 7);;  -> 16
(syracuse 16);; -> 4

(********* Exercice  9  *********)

;; Returns true iff str is a palindrom (iterative)
(define (is-palindrom-it? str)
  (let ([result true]
        [len    (string-length str)])
    (begin
      (for ([i (in-range 1 len)]) ;; loop from 1 to n
        (when (not (equal? (string-ref str i) (string-ref str (- len i 1))))
          (set! result false)))
      result)))

(is-palindrom-it? "")                      ;; -> true
(is-palindrom-it? "a")                     ;; -> true
(is-palindrom-it? "abita")                 ;; -> false
(is-palindrom-it? "abba")                  ;; -> true
(is-palindrom-it? "able was i,i saw elba") ;; -> true

;; Returns true iff str is a palindrom (recursive)
(define (is-palindrom-rec? str)
  (let ([len (string-length str)])
    (if (<= len 1)
        true
        (and (equal? (string-ref str 0) (string-ref str (sub1 len)))
             (is-palindrom-rec? (substring str 1 (sub1 len)))))))

(is-palindrom-rec? "")                      ;; -> true
(is-palindrom-rec? "a")                     ;; -> true
(is-palindrom-rec? "abita")                 ;; -> false
(is-palindrom-rec? "abba")                  ;; -> true
(is-palindrom-rec? "able was i,i saw elba") ;; -> true

;; Removes one occurrence of a string of length 1 in a string
(define (string-remove-elt elt str)
  (string-replace str elt "" #:all? #f))

(string-remove-elt "b" "aabbcc")            ;; -> "aabcc"

;; Returns true iff str1 and srt2 are anagrams (recursive)
(define (is-anagram-rec? str1 str2)
  (cond
    [(not (= (string-length str1) (string-length str2))) #f]
    [(non-empty-string? str1)
     (let ([head-str1 (substring str1 0 1)]
           [tail-str1 (substring str1 1 (string-length str1))])
       (and (string-contains? str2 head-str1)
            (is-anagram-rec? tail-str1 (string-remove-elt head-str1 str2))))]
    [else #t]))

(is-anagram-rec? "" "")                      ;; -> true
(is-anagram-rec? "abcdde" "abcdd")           ;; -> false
(is-anagram-rec? "algorithme" "logarithme")  ;; -> true
(is-anagram-rec? "abcdde" "ddcbae")          ;; -> true
(is-anagram-rec? "abcdde" "abcdee")          ;; -> false

;; Count occurrences of a letter in a string
(define (count-occurrences l str)
  (let ([result 0])
    (begin
      (for ([ol str])
        (when (equal? ol l) (set! result (add1 result))))
      result)))

(count-occurrences #\a "abacadaea") ;; -> 5

;; Returns true iff str1 and srt2 are anagrams (iterative)
(define (is-anagram-it? str1 str2)
  (let ([result true])
    (begin
      (for ([l str1])
        (when (not (= (count-occurrences l str1)
                      (count-occurrences l str2)))
          (set! result false)))
      result)))

(is-anagram-it? "" "")                      ;; -> true
(is-anagram-it? "abcdde" "abcdd")           ;; -> false
(is-anagram-it? "algorithme" "logarithme")  ;; -> true
(is-anagram-it? "abcdde" "ddcbae")          ;; -> true
(is-anagram-it? "abcdde" "abcdee")          ;; -> false
