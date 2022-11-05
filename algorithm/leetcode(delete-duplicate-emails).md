## 문제
중복된 이메일은 id가 작은 것만 남기고 지워라.

### 내 풀이
```sql
# Please write a DELETE statement and DO NOT write a SELECT statement.
# Write your MySQL query statement below
DELETE FROM Person
WHERE id IN (
    SELECT id
    FROM (
        SELECT p.id
        FROM Person p
        INNER JOIN Person p2
        ON p.Email = p2.Email AND  p.Id > p2.Id
    ) t
)
```

<br>

### 개선 풀이
```sql
# Please write a DELETE statement and DO NOT write a SELECT statement.
# Write your MySQL query statement below
WITH min_query AS (
    SELECT
        MIN(id)
    FROM
        Person
    GROUP BY
        email
),
cartesian_query AS (
    SELECT
        a.id
    FROM Person a, Person b
    WHERE a.email = b.email AND a.id > b.id
),
join_query AS (
    SELECT
        a.id
    FROM Person a
    INNER JOIN Person b
    ON a.email = b.email AND a.id > b.id
)

# DELETE a FROM Person a, Person b WHERE a.email = b.email AND a.id > b.id
# DELETE FROM Person WHERE id NOT IN (SELECT * FROM min_query)
DELETE FROM Person WHERE id IN (SELECT * FROM cartesian_query)
# DELETE FROM Person WHERE id IN (SELECT * FROM join_query)
```