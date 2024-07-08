---
title: coreboot and Heads as an alternative firmware for OpenPOWER Talos II
author: Krystian Hebel
tags:
  - openpower
  - power9
  - firmware
  - coreboot
  - hostboot
date: 2024-07-09
draft: true
---

This blog post presents coreboot ([spelled in lower case characters](https://doc.coreboot.org/#spelling-of-coreboot),
even when it is the first word in a sentence) and Heads as an alternative to
Hostboot and Skiroot/Petitboot, respectively.

As described on the [project's page](https://coreboot.org),

> coreboot is an extended firmware platform that delivers a lightning fast and
> secure boot experience on modern computers and embedded systems.

{{< image src="blog/coreboot.svg" >}}

It aims to do the bare minimum required to make the hardware usable and pass
the control to next program, called the payload. In case of Talos II, that
payload is Skiboot, with [few changes on top](https://github.com/Dasharo/skiboot/tree/raptor-cs_talos-2)
to make it play along with Heads.

Speaking of [Heads](https://github.com/linuxboot/heads), it is:

> a minimal Linux that (...) provides a secure, flexible boot environment for
laptops, workstations and servers.

Heads provides a bootloader menu that starts final operating system through
kexec call. This is very similar to what Petitboot does, but Heads puts
security above everything else.

It is possible to use coreboot without Heads, but not the other way around.
Heads depends on structures created by coreboot, which just aren't present when
booting with Hostboot.

## Building and flashing coreboot

To build coreboot image, follow the steps below:

1. Clone the coreboot repository:

    ```
    git clone https://github.com/Dasharo/coreboot.git \
       --depth=1 -b raptor-cs_talos-2/rel_v0.7.0
    ```

2. Start docker container:

    ```
    cd coreboot
    docker run --rm -it \
       -v $PWD:/home/coreboot/coreboot \
       -w /home/coreboot/coreboot \
       -u "$(id -u):$(id -g)" \
       coreboot/coreboot-sdk:0ad5fbd48d /bin/bash
    ```

3. Configure and start the build process inside of the container:

    ```
    (docker) cp configs/config.raptor-cs-talos-2 .config
    (docker) make olddefconfig
    (docker) make
    ```
	
After image is built you can exit the container, either with `exit` or Ctrl+D.
To flash it to your platform:

0. Make sure you're running System Package v2.00, if not, get it from
[here](https://wiki.raptorcs.com/wiki/Talos_II/Firmware) and
[update/downgrade](https://wiki.raptorcs.com/wiki/Updating_Firmware#Updating_the_OpenPOWER_firmware).
Start the platform once so SEEPROM is also updated, then power off.

1. Copy images to BMC:

    ```
    scp -O build/bootblock.signed.ecc root@<BMC_IP>:/tmp/bootblock.signed.ecc
    scp -O build/coreboot.rom.signed.ecc root@<BMC_IP>:/tmp/coreboot.rom.signed.ecc
    ```

2. Log in to BMC through SSH:

    ```
    ssh root@<BMC_IP>
    ```

3. Flash both partitions:

    ```
    pflash -e -P HBB -p /tmp/bootblock.signed.ecc
    pflash -e -P HBI -p /tmp/coreboot.rom.signed.ecc
    ```

4. Boot the platform as usual and enjoy coreboot running on Talos II:

[![asciicast](https://asciinema.org/a/zkQV1KhxY4n6IrlzssuvFHHS5.svg)]https://asciinema.org/a/zkQV1KhxY4n6IrlzssuvFHHS5

## Building and flashing Heads

Reminder: Heads requires coreboot. Instructions above **must** be performed
before flashing Heads. It also requires a [compatible USB security dongle](https://osresearch.net/Prerequisites#usb-security-dongles-aka-security-token-aka-smartcard)
and TPM (more about it later).

> Technically, TPM isn't a hard requirement of Heads, however its usefulness
> without it is very limited, up to a point where it doesn't have any advantages
> over Petitboot.

1. Just as earlier, start with cloning the repository:

    ```
    git clone https://github.com/Dasharo/heads.git \
       --depth=1 -b raptor-cs_talos-2/release
    ```

2. Start docker container:

    ```
    cd heads
    docker run --rm -it \
       -v $PWD:/home/heads/heads \
       -w /home/heads/heads \
       -u "$(id -u):$(id -g)" \
       3mdeb/heads-docker:2.4.0 /bin/bash
    ```

3. Build:

    ```
    (docker) make BOARD=talos-2
    ```

This will take a while, wait for it to finish and then exit the container. In
the process, a coreboot image will also be built, but with slightly different
configuration. For security and reproducible images, `BUILD_TIMELESS` is always
enabled. While it actually strips file paths, it also removes file names and
line numbers from asserts in the code. It makes reporting and debugging
potential issues harder, so we suggest using coreboot built manually, at least
for the time being.

Steps for flashing Heads are similar to those done for coreboot.

1. Copy the Heads binary to the BMC (assuming in the Heads root directory):

    ```
    scp -O build/zImage.bundled root@<BMC_IP>:/tmp/zImage.bundled
    ```

2. Log in to the BMC:

    ```
    ssh root@<BMC_IP>
    ```

3. Flash the BOOTKERNEL partition with Heads:

    ```
    pflash -e -P BOOTKERNEL -p /tmp/zImage.bundled
    ```

Answer yes to the prompt and wait for the process to finish. After that, start
the platform and begin [configuring Heads](https://osresearch.net/Configuring-Keys/).

## PNOR emulation

Flash device can be emulated by BMC, which is something we were often using for
development and testing. This saves a lot of time which would be spent flashing,
as well as reduces the wear of flash device.

However, this still requires System Package v2.00, and if this is different than
what real flash holds, SEEPROM will have to be updated when switching between
physical and emulated image. Also, this approach doesn't survive BMC reboots and
power losses. BMC doesn't have enough space to keep full PNOR image in
non-volatile memory, so `tmpfs` must be used for emulation. Don't try to put
more than one image in `tmpfs` or BMC **will** run out of RAM, which most likely
will require manual power cycle.

To start, obtain full flash image, either by downloading it from
[RaptorCS release page](https://wiki.raptorcs.com/wiki/Talos_II/Firmware) or
reading from existing image on BMC with:

```
pflash -r /tmp/talos.pnor
```

After that, you can "flash" the partitions mentioned earlier by adding
additional parameters to use the file instead of physical flash:

```
pflash -f -P <partition> -p <image_file> -F /tmp/talos.pnor
```

Change `<partition>` to one of `HBB`, `HBI`, `BOOTKERNEL` and `<image_file>` to
`/tmp/bootblock.signed.ecc`, `/tmp/coreboot.rom.signed.ecc` or
`/tmp/zImage.bundled`, respectively.

To tell BMC to present the contents of this file as flash, run:

```
mboxctl --backend file:/tmp/talos.pnor
```

Sometimes this command fails with a timeout, in that case run it again until it
succeeds.

> We've noticed that sometimes, despite no error message printed, physical flash
> was used anyway. It is easy to spot when one copy has Hostboot and the other
> has coreboot, but it can be missed when both images have different versions of
> coreboot. It caused us few hours of unnecessary debugging of issues that were
> already fixed...

With the file now mounted, platform can be started. Host firmware and OS
shouldn't be able to tell the difference, except for different reported erase
block size and maybe different access times.

To get back to original flash, run:

```
mboxctl --backend vpnor
```

It will report an error (`Failed to post message: Connection timed out`), but
will revert to physical device nonetheless. This can be confirmed by checking
the output of `mboxctl --lpc-state`:

```
root@talos:~# mboxctl --lpc-state
LPC Bus Maps: Flash Device
```

Since the file is now the full image with coreboot (and optionally Heads), it
can be simply written to flash, should you choose to accept it:

```
pflash -E -p /tmp/talos.pnor
```

## Noticeable differences between Hostboot and coreboot

For those wondering why we even started this project, here are some of the
differences between Hostboot and coreboot.

First of all, coreboot uses C, while Hostboot was written in C++. The latter can
be viewed as a complete operating system - it can use multiple threads
simultaneously, manages virtual memory and uses memory swapping (even before RAM
is trained). Each major [istep](https://wiki.raptorcs.com/w/images/b/bd/IPL-Flow-POWER9.pdf)
(IPL Step, which in turn stands for Initial Program Load) is a separate
application, with some common dynamically loaded libraries. coreboot, on the
other hand, runs all of the code in just 3 separate stages - bootblock, romstage
and ramstage. This allows for tighter linking process, which reduces the final
size of the code.

Another significant difference is reduced amount of RAS (Reliability,
Availability, Serviceability) features enabled in coreboot. Talos II is often
used as a workstation, and while RAS has its uses in servers (it is preferred
to start with partially working hardware than not starting at all), for home
users booting fast is usually more important. Because of that coreboot doesn't
support bad DQ masking for DRAM, it can also optionally skip initial RAM
scrubbing. Because of these reasons, as well as smaller size of code in general,
booting coreboot is significantly faster than Hostboot - some preliminary
results can be found [here](https://github.com/3mdeb/openpower-coreboot-docs/blob/main/devnotes/user_perspective.md).

Another technical difference is the way data is passed to Skiboot. Hostboot uses
HDAT - a format specific to this particular firmware. For coreboot, a device
tree conforming to a well-defined specification is used. In fact, Skiboot
internally converts HDAT to device tree anyway. At the moment, some information
is not presented by coreboot (https://github.com/Dasharo/dasharo-issues/issues/446,
https://github.com/Dasharo/dasharo-issues/issues/32), but those seem to be
rather cosmetic than anything else - if you know about something that requires
those pieces of information to be present, let us know.

## TPM

TPM is an integral part of security mechanisms added by Heads. As existing I2C
TPMs were [hard to obtain](https://github.com/3mdeb/openpower-coreboot-docs/blob/main/devnotes/tpm_over_i2c.md)
at the time we were working on this part of the project, and LPC TPMs couldn't
be used [due to the way POWER9 processor exposed access to LPC bus](https://github.com/3mdeb/openpower-coreboot-docs/blob/main/devnotes/tpm_over_lpc.md#tpm-over-lpc-interface),
we had to [consider other options](https://github.com/3mdeb/openpower-coreboot-docs/blob/main/devnotes/tpm.md).

The solution we ended up with was to create our own [I2C TPM 1.2 module](https://docs.dasharo.com/variants/talos_2/tpm-support/),
based on Infineon SLB9645TT1.2 chip. This chip isn't supported by drivers in
Hostboot and upstream Skiboot, to make use of it you have to use coreboot and
Dasharo's fork of Skiboot.

{{< image src="blog/TPM-1.2-Talos-II.jpg" >}}

## Links and references

Here are some links to documentation related to this project:

- [main user documentation page](https://docs.dasharo.com/variants/talos_2/overview/)
- [release notes and binaries](https://docs.dasharo.com/variants/talos_2/releases/)
- [list of known issues](https://github.com/Dasharo/dasharo-issues/labels/raptor-cs_talos-2),
  if you want to create new issue remember to add proper tag
- [scripts for dumping debug data and logs](https://github.com/3mdeb/openpower-coreboot-docs/tree/main/devnotes/scripts)
- [dump of SCOM accesses and other debug output divided by isteps](https://github.com/3mdeb/openpower-coreboot-docs/tree/main/logs/scom_dumps)
- [other uncategorized developer notes](https://github.com/3mdeb/openpower-coreboot-docs/blob/main/devnotes)
- [Open Source Firmware Slack channel dedicated to coreboot on OpenPOWER](https://osfw.slack.com/archives/C01BHE47JSW)

We invite you to test for yourselves and share the results, both good and bad,
either on channels listed above or in issue.
