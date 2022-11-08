## 문제
중복된 이메일을 구해라.

<br>

### 내 풀이
```sql
# Write your MySQL query statement below
SELECT email
FROM (
    SELECT email, count(*) cnt
    FROM Person
    GROUP BY email  
) P
WHERE cnt > 1
```

<br>

### 개선 풀이
```sql
# Write your MySQL query statement below
SELECT email FROM Person
GROUP BY email HAVING COUNT(email) > 1
```