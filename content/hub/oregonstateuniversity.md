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
  - OpenCAPI Alpha Data 9H3 FPGA
# Limits on the other choices while an addon is selected. The FPGAs sit in
# IC922s used as bare metal, not as VM hosts.
addonlimits:
  - addon: OpenCAPI Alpha Data 9H3 FPGA
    provides: [Bare Metal Machine]
addonnote: GPUs are only available on POWER9, and the FPGA only on POWER9 bare metal.
systems:
  - POWER9
  - POWER10 (VM Only)
# What the request form lets someone pick with each system. Systems not listed
# here allow everything. Bare metal is POWER9 only, and POWER10 has no GPUs.
systemlimits:
  - system: POWER10 (VM Only)
    provides: [Virtual Machine]
    addons: [none]
gpunote:
  GPU systems run NVIDIA's last ppc64le driver, from CUDA 12.4, so choose CentOS Stream 9 or Ubuntu 22.04 or 24.04
  and tell us which release in the message below.
sponsors:
  - mellanox
  - oracle
# VM sizing choices for the request form, shown when "Virtual Machine" is the
# chosen resource. These match the POWER hosting form on osuosl.org.
vmsizes:
  vcpus: ["1", "2", "4", "8", "16", "24", "32"]
  memory: [4 GB, 6 GB, 8 GB, 12 GB, 16 GB, 24 GB, 32 GB, 48 GB, 64 GB, 96 GB, 128 GB]
  disk: [40 GB, 60 GB, 80 GB, 100 GB, 200 GB, 300 GB, 400 GB, 500 GB]
  disknote:
    POWER10 root disks use local NVMe storage. POWER9 VMs can use either local NVMe or SSD-backed Ceph storage, so
    tell us if you have a preference in the message below.
  # Asked only for a VM with a GPU addon, since bare metal gets every GPU in
  # the machine
  gpus: ["1", "2"]
# Distribution names only, like the POWER hosting form on osuosl.org, so the
# list doesn't go stale as releases come and go.
operatingsystems:
  available:
    - AlmaLinux
    - CentOS Stream
    - Debian
    - Fedora
    - openSUSE
    - Rocky Linux
    - Ubuntu
    - Other
  note:
    We install the latest stable release for ppc64le unless you ask for a specific version in the message below.
weight: -9000
date: 2022-08-24
draft: false
---
