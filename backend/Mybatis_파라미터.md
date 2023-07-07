## Mybatis #{}과 ${}의 차이
### #{}
```xml
<select id="list" parameterType="HashMap" resultType="HashMap">
SELECT USER_ID, USER_NM
FROM USER
WHERE USER_ID = #{userId}
</select>
```
- 파라미터가 String 형태로 들어와 '' 형태가 된다.
- PreparedStatement 를 통해 쿼리 주입을 예방할 수 있어 보안 측면에서 유리하다.
- 주로 사용자의 입력을 전달할 때 사용한다.

### ${}
```xml
<select id="list" parameterType="HashMap" resultType="HashMap">
SELECT ${columns}
FROM USER
</select>
```
- 해당 컬럼의 자료형에 맞춰 파라미터의 자료형이 변경된다.
- Statement 방식으로 파라미터가 전달되어 쿼리 주입을 예방할 수 없어 보안 측면에서 불리하다.
- 사용자의 입력을 전달할 때가 아니라 테이블이나 컬럼명을 파라미터로 전달하고 싶을 때 사용한다.