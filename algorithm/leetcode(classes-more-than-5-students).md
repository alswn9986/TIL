## 문제
5명 이상 수강한 과목을 구해라.

## 내 풀이
```sql
# Write your MySQL query statement below
SELECT CLASS
FROM Courses
GROUP BY CLASS
HAVING COUNT(1) >= 5 
```