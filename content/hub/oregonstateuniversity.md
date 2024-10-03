---
title: Oregon State University Open Source Lab
member: oregonstateuniversity
projects:
  - Open Source
provides:
  - Bare Metal Machine
  - Virtual Machine
addons:
  - none
  - Nvidia V100 GPU
  - Nvidia T4 GPU
  - OpenCAPI Alpha Data 9H3 FPGA
systems:
  - POWER9
sponsors:
  - mellanox
  - oracle
opnstkflavors:
  standard:
    - name: "oph.c1m4.d20"
      cpus: 1
      memory: 4
      gpus: "-"
      disk: 20
    - name: "oph.c2m8.d20"
      cpus: 2
      memory: 8
      gpus: "-"
      disk: 20
    - name: "oph.c4m12.d40"
      cpus: 4
      memory: 12
      gpus: "-"
      disk: 40
    - name: "oph.c8m16.d80"
      cpus: 8
      memory: 16
      gpus: "-"
      disk: 80
    - name: "oph.c16m32.d120"
      cpus: 16
      memory: 32
      gpus: "-"
      disk: 120
    - name: "oph.c32m64.d240"
      cpus: 32
      memory: 64
      gpus: "-"
      disk: 240
    - name: "oph.c64m128.d240"
      cpus: 64
      memory: 128
      gpus: "-"
      disk: 240
  gpuenabled:
    - name: "oph.c8m16.g1.d120"
      cpus: 8
      memory: 16
      gpus: 1
      disk: 120
    - name: "oph.c16m32.g1.d120"
      cpus: 16
      memory: 32
      gpus: 1
      disk: 120
    - name: "oph.c16m32.g2.d120"
      cpus: 16
      memory: 32
      gpus: 2
      disk: 120
    - name: "oph.c32m64.g2.d240"
      cpus: 32
      memory: 64
      gpus: 2
      disk: 240
    - name: "oph.c64m128.g2.d240"
      cpus: 64
      memory: 128
      gpus: 2
      disk: 240
operatingsystems:
  available:
    - Alma Linux 8
    - Alma Linux 9
    - Alpine
    - CentOS Stream 9 (GPU)
    - Debian 11
    - Debian 12
    - Fedora [latest]
    - Ubuntu 20.04 (GPU)
    - Ubuntu 22.04 (GPU)
    - Ubuntu 24.04 (GPU)
  unavailable:
weight: -9000
date: 2022-08-24
draft: false
---
