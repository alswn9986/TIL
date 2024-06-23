## ConfigMap
- 서비스마다 다른 설정이 필요할 때 사용한다.
- 환경 설정을 컨테이너와 분리해서 제공하는 방식으로 개발/서비스와 같은 다양한 방식으로 사용 가능하다.
- Key, Value로 구성된 탬플릿을 할당하는 것으로 사용한다.
- 파드는 이름으로 컨피그맵을 참조하기 때문에 각 환경에서 서로 다른 설정을 사용할 수 있다.

## Secret
- Password, OAuth Token, SSH KEY와 같은 민감한 정보를 저장하는 용도로 사용한다.
- 컨테이너 안에 저장하지 않고 별도로 보관하다가 실제 Pod를 실행할때 Key, Value로 구성된 템플릿으로 컨테이너에 제공된다.
- ConfigMap과 다르게 base64로 암호화되어 저장된다.
- ConfigMap을 포함한 일반적인 오브젝트의 값은 쿠버네티스 DB에 저장되는 반면 Secret은 메모리에 저장되며 1Mbyte의 제한을 가진다.

## 참고자료
- https://velog.io/@niyu/k8s-configmap-secret