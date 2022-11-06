## 문제
두 테이블을 조인해라.

### 내 풀이
```sql
# Write your MySQL query statement below
SELECT
    P.lastName
    , P.firstName
    , A.city
    , A.state
FROM Person P
LEFT OUTER JOIN Address A
ON P.personId = A.personId
```
