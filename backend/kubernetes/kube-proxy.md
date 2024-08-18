## kube-proxy
- 네트워크 동작을 관리하는 컴포넌트이다.
- 모든 워커 노드에 하나씩 위치하는 오브젝트인 ``DaemonSet`` 형태로 배포되어 있다.
- 서로 다른 워커의 Pod들 간의 통신이 가능하도록 해준다.

### kube-proxy 동작 원리
- https://velog.io/@squarebird/Worker-Node-Kube-Proxy
- https://coffeewhale.com/k8s/network/2019/05/11/k8s-network-02/