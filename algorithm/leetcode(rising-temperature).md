## 문제
전날보다 더 높은 온도를 기록한 데이터를 조회해라.

## 내 풀이
### 이전 행을 가져오는 LAG() 함수 사용 => 실패
- 날짜 데이터 중 누락된 날짜가 있어 행 정렬 후 이전 행을 조회하면 실패함
```sql
# Write your MySQL query statement below
SELECT
    id
FROM
    (
        SELECT
            id
            , recordDate
            , temperature
            , LAG(temperature) OVER(ORDER BY recordDate) AS prev
        FROM
            Weather
    ) T
WHERE
    T.temperature > T.prev
```

### 전날 날짜로 조회하여 서브쿼리로 수정 => 성공
```sql
# Write your MySQL query statement below
SELECT
    id
FROM
    Weather w
WHERE
    w.temperature > (
        SELECT t.temperature
        FROM Weather t
        WHERE t.recordDate = DATE_ADD(DATE_FORMAT(w.recordDate,'%Y-%m-%d'), INTERVAL -1 DAY)
    )
```

## 개선 풀이
- 서브쿼리보다는 조인하여 사용하는 것이 더 빠른 방법
```sql
select a.id as Id
from weather a 
join weather b
on a.recorddate = adddate(b.recorddate, 1)
where a.temperature > b.temperature
```