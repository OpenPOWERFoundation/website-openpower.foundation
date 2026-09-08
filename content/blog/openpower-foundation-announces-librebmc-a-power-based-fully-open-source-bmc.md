---
title: "OpenPOWER Foundation announces LibreBMC, a POWER-based, fully open-source BMC"
categories:
  - "blogs"
aliases:
  - "/openpower-foundation-announces-librebmc-a-power-based-fully-open-source-bmc/"
tags:
  - "openpower"
  - "openpower-foundation"
  - "antmicro"
  - "librebmc"
  - "bmc"
  - "open-compute-project"
  - "dc-scm"
  - "litex"
  - "openbmc"
date: "2021-05-10"
draft: false
---

Baseboard management controllers (BMCs) are a mainstay in data centers. They enable remote monitoring and access to servers, and they’re responsible for the rise of “lights out management.” But from a hardware perspective, there has been little innovation in this space for years. BMC processors are built on legacy architectures that are proprietary and closed.

The OpenPOWER Foundation is announcing a new workgroup to develop LibreBMC, the first ever baseboard management controller with completely open-source software and hardware. The processor will be based on the POWER ISA, which was open-sourced by [IBM at OpenPOWER Summit North America](https://newsroom.ibm.com/2019-08-21-IBM-Demonstrates-Commitment-to-Open-Hardware-Movement) in August, 2019.

LibreBMC is a collaboration between OpenPOWER Foundation members Google, Antmicro, Yadro, IBM and Raptor Computing Systems.

“The BMC is a critical component in IT infrastructure and is way past due for open collaboration and innovation,” said [James Kulina](https://www.linkedin.com/in/james-kulina/), executive director, OpenPOWER Foundation. “Moving down the stack and open sourcing technology at the silicon level is the logical next step. LibreBMC will enable improved performance, reliability, customization, and security.”

OpenPOWER Foundation member Antmicro is developing the LibreBMC card based on [Open Compute Project’s DC-SCM specification](https://www.opencompute.org/documents/ocp-dc-scm-spec-rev-0-95-pdf). Designs are currently in process for [Lattice ECP5](https://github.com/antmicro/ecp5-dc-scm) and [Xilinx Artix-7](https://github.com/antmicro/artix-dc-scm) FPGAs.

“We are happy to be able to contribute our experience in open source hardware, software tools and IP to LibreBMC”, said [Michael Gielda](https://www.linkedin.com/in/mgielda/), VP Business Development at [Antmicro](https://www.linkedin.com/company/antmicro-ltd/). “Open and secure server solutions allow us to bring scalable and open flows to areas ranging from AI and software to ASIC and FPGA development, and we strongly believe that our customers’ server rooms will get an open source-driven innovation boost with LibreBMC.”

[Bill Carter](https://www.linkedin.com/in/bill-carter-3752482/), Chief Technology Officer for the [Open Compute Project Foundation](https://www.opencompute.org/), said "Speaking on behalf of the OCP community, we are excited to see OpenPOWER adopting OCP's DC-SCM standard for the new LibreBMC project, which aims to increase security and transparency of BMC controller hardware. ''

LibreBMC will be built using completely open source tooling enabled by SymbiFlow – an open source alternative to proprietary toolchains like Xilinx Vivado and SoC, and a completely open source SoC enabled by enabled by LiteX – an open source alternative to MicroBlaze and NIOS SoC ecosystems. “We originally developed LiteX for internal needs at [Enjoy-Digita](http://www.enjoy-digital.fr/)l,” said [Florent Kermarrec](https://www.linkedin.com/in/florent-kermarrec-6428669b/?originalSubdomain=fr), maintainer of the project. “We’re glad to see it used to enable the development of new open-hardware technologies like LibreBMC.”

Once complete, LibreBMC will run software from [OpenBMC](https://www.openbmc.org/), a Linux Foundation project for open source BMC firmware. Representatives from OpenBMC said, “it’s great to see our open source software running on open source hardware.”

[Click here](https://openpowerfoundation.org/technical/working-groups/) to learn more about LibreBMC. If you have any questions or feedback, you can also [join our Slack workspace](https://join.slack.com/t/openpowerfoundation/shared_invite/zt-3xqxcgl44-LWbZ8kPP7hdPDPH2AR0K6A), or find us on [Twitter at @openpowerorg](https://twitter.com/openpowerorg)!
