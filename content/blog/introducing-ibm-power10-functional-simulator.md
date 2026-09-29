---
title: "Introducing IBM® POWER10 Functional Simulator"
date: "2020-10-02"
categories: 
  - "blogs"
tags: 
  - "openpower"
  - "ibm"
  - "featured"
  - "openpower-summit"
  - "openpower-foundation"
  - "hardware"
  - "linux"
  - "ibm-power"
  - "power10"
  - "functional-simulator"
---

By [Brad Thomasson](https://www.linkedin.com/in/bradford-thomasson-9b89044/), Cognitive Software Engineer, IBM

After announcing the newest [IBM POWER10 processor at the Hot Chips 2020 in August](https://newsroom.ibm.com/2020-08-17-IBM-Reveals-Next-Generation-IBM-POWER10-Processor), our IBM Cognitive Systems Simulation team is now proud to present the [IBM POWER10 Functional Simulator](https://www14.software.ibm.com/webapp/set2/sas/f/pwrfs/pwr10/home.html). 

This publicly available simulation environment is designed to educate developers, facilitate porting of existing Linux applications to the POWER10 architecture, and enable new ones to be created.

\[caption id="attachment\_7638" align="aligncenter" width="1024"\]![](images/POWER10-1024x683.jpeg) _A close-up of the first commercialized 7nm processor, the IBM POWER10. Photo credit: Connie Zhou for IBM_\[/caption\]

 

This simulator provides enough POWER10 processor complex functionality to allow the entire software stack to execute. This includes loading, booting and running a little endian Linux environment.

Note that while the IBM POWER10 Functional Simulator serves as a full instruction set simulator for the POWER10 processor, it may not model all aspects of the IBM Power Systems POWER10 hardware and thus may not exactly reflect the behavior of the POWER10 hardware.

Features/support available in the simulator include:

- POWER10 hardware reference model
- Full instruction set simulator for Power ISA as implemented in POWER10
- Models complex SMP effects
- Architectural modeled areas:
    - Functional behavior of all units (Load/Store, FXU, FPU, DFP, VMX, VSX, etc.)
    - Exceptions and Interrupt handling
    - Address translation, both Paravirtualized HPT and two level Radix Tree
    - Memory and basic translation cache modeling (SLBs, TLBs, ERATs)
    - Instruction Prefix Support
    - VSX Matrix-Multiply Assist (MMA) Instructions for AI
    - Reduced-Precision instructions to accelerate matrix multiplication
    - Copy-Paste Facility
    - New AIL/HAIL programmability feature for Linux/Hybrid cloud
- Linux and Hypervisor development and debug platform
- TCL command-line interface provides:
    - Custom user initialization scripts
    - Processor state control for debug: Step, Run, Cycle run-to, Stop, etc.
    - Register and Memory R/W interaction

 

Our team is very open to feedback and questions. For all technical inquiries and suggestions, please reach out to our Cognitive Systems Simulation team through the [Customer Connect Support Channel](https://login.ibm.com/oidc/sps/auth?Target=https%3A%2F%2Flogin.ibm.com%2Foidc%2Fendpoint%2Fdefault%2Fauthorize%3FqsId%3D2d9cf726-59b4-4d0e-b4f0-f04c029876d7%26client_id%3DMzUxMDEwNzQtZTU2Ny00&client_id=MzUxMDEwNzQtZTU2Ny00) or consider joining the [OpenPOWER Foundation Slack workspace](https://join.slack.com/t/openpowerfoundation/shared_invite/zt-3xqxcgl44-LWbZ8kPP7hdPDPH2AR0K6A).
