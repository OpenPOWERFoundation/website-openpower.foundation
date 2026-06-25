---
title: 'LibreBMC SIG'
wgtype: sig
image: thumb-6.jpg
chair:
  - jaremykerr
  - karolgugala
participation: Public
git: https://github.com/OpenPOWERFoundation/librebmc
discussion: https://discuss.openpowerfoundation.org/c/sig/librebmc/
meetingminutes: https://github.com/OpenPOWERFoundation/librebmc-meetingminutes
cadence: Bi-weekly US/EU alternative TZ
calendar:
  web: https://discuss.openpowerfoundation.org/c/sig/librebmc/11/l/calendar
  ics: webcal://discuss.openpowerfoundation.org/c/sig/librebmc/l/calendar.ics
chat:
  slack: https://app.slack.com/client/T443QD9JA/C01UVKFKUQY
  irc: '#librebmc on irc.libera.chat'
files: https://files.openpowerfoundation.org/s/iZRseq3XLtRcjtX
date: 2021-06-12
draft: false
---

The LibreBMC SIG is a project workgroup whose purpose is to design an open source Baseboard Management Controller (BMC)
based oncompatible with the Open Compute Project (OCP) DC-SCM specification.

The goal of the SIG is to design the adapter, based on the POWER ISA processor core,
and all required interfaces and controls using open source tools in order to contribute to their growth and usability.

The purpose of LibreBMC is to create a fully open source BMC design which will enhance the security of server management control
by being fully open and created with fully open source tooling. The use of an FPGA adds flexibility and security as well.

The requirement of a POWER ISA core will drive the design and open release of a new or improved POWER soft-core.

The scope of the LibreBMC SIG is the creation of a BMC adapter.
The scope will include an adapter design with an FPGA controller.
The FPGA will consist of a POWER ISA core(s) that can run the OpenBMC stack (including LSB) and
manage the interface between system-management software and platform hardware.
The FPGA will also have all controls and interfaces required of a typical BMC.

The LibreBMC adapter will be compatible with the OCP DC-SCM specification.
Any changes to the OCP DC-SCM specification is outside the scope of this workgroup and will be handled through OCP.

The adapter should meet the requirements to manage a variety of server architectures,
including but not limited to POWER, ARM, and x86 based systems.  
Any changes to system reference designs or specifications to use the adapter are outside the scope of this workgroup.

The scope of the workgroup will require the use of Linux, OpenBMC, open source tools, interfaces, and components.
Any modifications of these are outside the scope of the workgroup and will be handled through their respective bodies.
