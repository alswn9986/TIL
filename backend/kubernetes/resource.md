# 쿠버네티스 리소스
## Workloads 리소스
컨테이너 실행에 관련된 리소스   
클러스터 위에서 컨테이너를 기동하기 위해 사용하는 리소스
- Pod
- ReplicationController
- ReplicaSet
- Deployment
- DaemonSet
- StatefulSet
- Job
- Cronjob

## Discovery & Load Balance 리소스
컨테이너를 외부에 공개하는 엔드포인트를 제공하는 리소스
- Service
- Ingress

## Config & Storage 리소스
설정과 기밀 데이터를 컨테이너에 담거나 영구 볼륨을 제공하는 리소스
- Secret
- ConfigMap
- PersistentVolumeClaim

## Cluster 리소스
클러스터 자체 동작을 정의하는 리소스   
보안 관련 설정, 정책, 클러스터 관리성을 향상시키는 기능을 위한 리소스
- Node
- Namespace
- PersistentVolume
- ResourceQuota
- ServiceAccount
- Role
- ClusterRole
- RoleBinding
- ClusterRoleBinding
- NetworkPolicy

## Metadata 리소스
클러스터 내부의 다른 리소스 동작을 제어하기 위한 리소스
- LimitRange
- HorizontalPodAutoScalar
- PodDisruptionBudget
- CustomResourceDefinition


##  참고자료
- https://happycloud-lee.tistory.com/248
- https://thecodingmachine.tistory.com/9
- https://somaz.tistory.com/198