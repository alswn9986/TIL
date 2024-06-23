# 쿠버네티스 리소스
## Workloads 리소스
- 컨테이너 실행에 관련된 리소스
- 클러스터 위에서 컨테이너를 기동하기 위해 사용하는 리소스

### Workloads 리소스 종류
- Pod
- ReplicationController
- ReplicaSet
- Deployment
- DaemonSet
- StatefulSet
- Job
- Cronjob

![](../../images/2024-06-23-13-24-29.png)
- Deployment는 Pod와 ReplicaSet에 대한 선언적 업데이트를 제공한다.
- Deployment가 ReplicaSet을 제어하고, ReplicaSet이 Pod를 제어하는 구조이다.
- Deployment는 ReplicaSet이 지원하지 못했던 업데이트에 관한 기능을 함께 지원한다.

## Discovery & Load Balance 리소스
- 컨테이너를 외부에 공개하는 엔드포인트를 제공하는 리소스

### Discovery & Load Balance 리소스 종류
- Service
- Ingress

## Config & Storage 리소스
- 설정과 기밀 데이터를 컨테이너에 담거나 영구 볼륨을 제공하는 리소스

### Config & Storage 리소스 종류
- Secret
- ConfigMap
- PersistentVolumeClaim

## Cluster 리소스
- 클러스터 자체 동작을 정의하는 리소스
- 보안 관련 설정, 정책, 클러스터 관리성을 향상시키는 기능을 위한 리소스

### Cluster 리소스 종류
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
- 클러스터 내부의 다른 리소스 동작을 제어하기 위한 리소스
### Metadata 리소스 종류
- LimitRange
- HorizontalPodAutoScalar
- PodDisruptionBudget
- CustomResourceDefinition



https://happycloud-lee.tistory.com/248
https://thecodingmachine.tistory.com/9
https://somaz.tistory.com/198