---
sidebar_label: 'Best Practices'
sidebar_position: 3
---

# Best Practices for Running SSV Node

This guide outlines key recommendations to ensure the best Performance and Correctness of your node. The guide will be updated as we get new information.

The page is divided into four parts:
- [**Introduction**](#introduction) - Understanding the Performance, Correctness, and their key factors.
- [**SSV-specific**](#ssv-specific) - Features of SSV that will improve Performance or Correctness.
- [**Major impact**](#major-impact) - Vital tips, more obvious.
- [**Minor impact**](#minor-impact) - Fine-tuning tips, nice-to-have, less obvious.


## **Introduction**

Performance you see on [SSV Explorer](https://explorer.ssv.network/) is essentially participation rate - how many duties your node participated in. Correctness refers to how timely and accurate duties are, and it affects validators' rewards.

Several key factors influence this:
- **Setup Configuration:** Software used to manage nodes, configured ports and the firewall help eliminate delays.
- **Network Throughput & Latency:** Minimal network delay is critical, especially for production setups.
- **Hardware Resources:** Adequate CPU, sufficient RAM, and fast, reliable storage are necessary.

## **SSV-specific**

#### Failover for EL and CL clients 
```yaml
eth2:
  # HTTP URL of the Beacon node to connect to.
  BeaconNodeAddr: http://example.url:5052;http://example.url:5053

eth1:
  # WebSocket URL of the Execution node to connect to.
  ETH1Addr: ws://example.url:8546/ws;ws://example.url:8547/ws
```
- When the first node goes offline or out of sync, SSV will switch to the next endpoint.
- Endpoints should be set in the order you want them to be used. The first node will be the primary one.
- Failover works in round-robin way, so once SSV circled through all of the endpoints it will start from the first one again.
- When SSV node restarts it will always start with the first endpoint from the list.


#### Weighted Attestation Data
```yaml
eth2:
  WithWeightedAttestationData: true   # Enables WAD
```
- The feature only works with 2+ CL endpoints (`BeaconNodeAddr`) configured.
- Improves attestation accuracy by scoring responses from multiple Beacon nodes based on epoch and slot proximity. Adds slight latency to duties but includes safeguards (timeouts, retries). 

#### Parallel Data Submission
```yaml
eth2:
  WithParallelSubmissions: true   # Sends duties to all nodes concurrently
```
- The feature only works with 2+ CL endpoints (`BeaconNodeAddr`) configured.
- SSV will submit duty data to all Beacon nodes in parallel. This built-in configuration ensures high availability and improves performance.


#### Doppelganger Protection
```yaml
EnableDoppelgangerProtection: true # Enables Doppelganger Protection
```
- Doppelganger Protection (DG) checks if the managed validators are attesting elsewhere at the moment of SSV node start. That prevents double signature which is a slashable event.
- SSV with DG enabled will be offline for the first 3 epochs after the node start.
- If enough nodes in the cluster have DG enabled and are online - a restarted node will not wait for 3 epochs. Node can identify that there's a DG quorum going on and will join it. This process is almost as quick as restart of a node without DG.
- If you manage all nodes in the cluster — it is recommended to restart one by one. Otherwise, it will take 3 epochs to do the DG checks.
- To learn more technical details please refer to [our documentation page on GitHub](https://github.com/ssvlabs/ssv/blob/v2.3.0/doppelganger/README.md).

#### Database backups
SSV's database is critical to prevent slashing (PostgreSQL for Web3Signer, or the node's local database `db` for local signing setups). Its loss or corruption can lead to double-signing and severe penalties if operation continues.

Be sure to implement a robust backup and recovery strategy for your database(s), it is **crucial** for operators. Failure to maintain database backups can lead to significant financial loss. Operators are responsible for their own database management and protection.


## **Major impact**
High‑priority practices that ensure reliable, on‑time duty submissions. Might sound obvious, but are often overlooked.

:::info Hardware and performance
Most of hardware-related suggestions below are for Execution (EL) and Consensus (CL) clients. SSV client is light and [hardware requirements are moderate](./hardware-requirements.md). EL and CL require much more resources to run effectively.
:::

### **For Home Setups**
- **Hardware:** Usual setup has 4- to 8-core CPU (focus on single-thread performance) and 32GB RAM.
- **Disk:** NVMe SSDs are strongly recommended. If you're unsure with filesystem to use, stick to `ext4`, as it is performant and the easiest to maintain. 
- **Reliability:** Use a UPS and ensure the machine is well-ventilated. Sudden power loss or thermal throttling can cause downtime or result in missed duties.
- **Internet Connectivity:** Ensure your ISP doesn't impose strict data caps. Choose a plan with at least 10 Mbps upload speed, but latency and reliability make the difference.
- **[Follow EthStaker hardware section](https://ethstaker.org/staking-hardware)** as their guides are focused on running Execution and Consensus nodes.

### **For Enterprise Grade**
- **CPU frequency is a major factor**. Fast cores with a moderate to high core count are ideal. Ensure each server can turbo boost to a high frequency, but avoid aggressive overclocking.
- **Disk and Redundancy:** NVMe SSDs are mandatory. Many use RAID1 mirroring or have failover nodes ready in case of disk failure. The easiest filesystem to maintain is `ext4`, we also found `xfs` is more performant. Improving read/write speed has one of the greatest impacts.
- **RAM Considerations:** Usually RAM is not the limiting factor. Abundant RAM enables disk caching for the execution client database – reducing disk reads and writes. ECC memory is advisable to protect against bit flips in long-running servers. 
- **Form Factor and Data Center:** If you have multiple EL+CL setups - run them on different bare metal servers, in colocation data centers, or cloud VM instances. Redundancy across hardware and geographic distribution is a best practice. 
- **Firewalls and DDoS Protection:** Configure protection if you believe there is a chance for DDoS attack, make sure the p2p ports allow full connectivity. The goal is to not block or throttle legitimate p2p ports.

### Sufficient Hardware
**Recommendation:**  
Ensure your hardware meets or exceeds [SSV recommended specifications](./hardware-requirements.md). These requirements are in additional to what you need for Execution + Consensus. On the same page you will find a table comparing # of validators to resources used.

**Dos and Don'ts:**
  - **Do:** DYOR on the hardware provider or hardware parts for home setup. Verify your specs, as well as quality of hardware provider.
  - **Do:** Upscale your resources as you onboard more validators, to avoid any bottleneck and performance degradation.
  - **Do:** Monitor system metrics (using tools such as Prometheus and Grafana) to maintain resource headroom.
  - **Do:** Choose bare-metal providers over cloud service providers, they generally offer more resources per dollar.
  - **Do:** Prioritize high clock speed CPU and performant NVMe disk over other resources.
  - **Don't:** Choose a random/popular hardware provider blindly.
  - **Don't:** Neglect hardware upgrades when validator counts and network demands increase.


### Proper Ports Configuration
**Recommendation:**  
Ensure all required ports are open and correctly configured on your setup.

**Critical Ports:**
  - **SSV P2P:** Typically 12001 UDP and 13001 TCP (or as specified in your configuration).
  - **Execution P2P:** Typically 30303 TCP and UDP (for Geth and Nethermind).
  - **Execution RPC:** HTTP 8545 and WS 8546 (for Geth and Nethermind), **open only to SSV Node!**.
  - **Consensus P2P:** Depends on your client, make sure to follow your client's documentation to open the correct ports.
  - **Consensus RPC:** Depends on your client (e.g. 3500 for Prysm, 5052 for Lighthouse), **open only to SSV Node!**.

**Dos and Don'ts:**
  - **Do:** Verify firewall settings (using tools like UFW) to ensure these ports are exposed.
  - **Do:** Verify the ports are open on your server's/router's side. Ping them from another machine to make sure they're reachable.
  - **Don't:** Route node communications through unnecessary proxies or additional layers.
  
### Consolidated Infrastructure
**Recommendation:**  
Location of your clients plays a direct role in performance. Co-hosting Execution and Consensus clients minimizes network latency, improves block import timings, and provides more time for SSV rounds.

**Dos and Don'ts:**
  - **Do:** Co-host your Execution (EL) and Consensus (CL) clients on a single machine in production environments.
  - **Don't:** Distribute critical EL and CL operations across multiple nodes unless there is a compelling need.
  - **Don't:** Use public RPCs, as they're proven to have low performance, also they can't be configured to produce blocks.

### Network Throughput and Latency

**Minimizing Intermediate Layers**
    - Reduce the number of intermediate hops (such as redundant routers, proxies, or firewalls) between your nodes and connected services.
    - Simplify your firewall configuration by using minimal, direct rule sets (e.g., UFW with straightforward rules) to avoid delays.
  
**Baseline Measurement and Monitoring**
    - Use tools such as `ping`, `traceroute`, and `iperf` to measure latency, packet loss, and bandwidth between your SSV node and key endpoints (EL, CL, and external RPC nodes).
    - Establish baseline metrics to track performance over time.
    - Continuously monitor network performance with Prometheus and Grafana (e.g. [via SNMP exporter](https://grafana.com/blog/2022/02/01/an-advanced-guide-to-network-monitoring-with-grafana-and-prometheus/)).
  
**Dos and Don'ts:**
  - **Do:** Regularly verify that your network routing is direct and efficient.
  - **Don't:** Introduce extra network layers that could add latency.

### Monitoring

Continuous monitoring is essential to maintain good performance and quickly detect any issues. You can check out our [Monitoring section](../monitoring/README.md), if you haven't set monitoring up already. 

***

## **Minor impact**
Fine‑tuning tips for sustained performance and resilience.

### Disk Optimization
Improving storage speed (minimizing read/write latency) has one of the greatest impacts on performance.

**Recommendations:**  
  - Choose `ext4` filesystem with journaling mode `data=ordered`.
  - If you're running NVMe, you can raise the host's request queue size to feed the SSD more parallelism:
  ```
  echo 1024 | sudo tee /sys/block/nvme0n1/queue/nr_requests
  ```
  - [Disable `atime` feature](https://ethdocker.com/Usage/LinuxSecurity/#noatime) to bump up the performance and increase the lifetime of your SSD. 
  - [Lower or disable `swappiness`](https://ethdocker.com/Usage/LinuxSecurity/#swappiness), depending on the amount of free RAM on your machine. This will give another boost to your Disk performance.

**Dos and Don'ts:**
- **Do** keep firmware and kernel drivers up to date.  
- **Do** monitor disk I/O latency, capacity, and SMART metrics.
- **Don't** use HDDs or budget SATA SSDs for validator chaindata.  
- **Don't** fill the drive beyond ~85 % capacity.  
- **Don't** run on default scheduler settings (e.g., `cfq` or `deadline`) for NVMe.  

### Keep clients updated
**Recommendation:**
Keep your clients updated, while prioritizing stability over following every upgrade. Ethereum staking is an ever-evolving place and even established clients sometimes provide significant boosts in performance with newer releases.

**Dos and Dont's:**

- **Do:** Keep a regular schedule of maintenance when you update your clients to the latest stable version.
- **Don't:** Upgrade your clients on the first day of new version release. Often such releases are followed by versions with fixes.

### System Tuning Tools

**NTP & Time Synchronization:**  
  - [Use chrony](https://ethdocker.com/Usage/LinuxSecurity/#time-synchronization-on-linux) or an equivalent NTP service to ensure synchronized clocks across your nodes. This should be used on all instances (e.g. if you are running SSV and Ethereum nodes on separate instances).

**TCP Congestion Control**
  - Set your TCP congestion control to BBR by [following this guide](https://www.cyberciti.biz/cloud-computing/increase-your-linux-server-internet-speed-with-tcp-bbr-congestion-control/), if supported by your kernel version.

### Containerization Trade-offs

**Recommendation:**  
  Evaluate your deployment method. Containerization (using Kubernetes, Helm, Docker Compose, or Podman) offers manageability with minimal latency impact if properly configured.
**Dos and Don'ts:**
  - **Do:** Use container orchestration for streamlined operations and scalability.
  - **Do:** Ensure proper network configuration, as per documentation of your containerization method (e.g. CNI on kubernetes).
  - **Don't:** Choose containerization if it interferes with interactive operations (e.g., password entry) or results in misconfigured network settings.


### Database Maintenance
**Recommendation:**  
  Periodically prune your Execution and Consensus databases (e.g., on a monthly basis) to manage disk usage. Pruning is primarily a maintenance task for storage management and does not provide significant performance boosts.

**Dos and Don'ts:**
  - **Do:** Schedule pruning during periods of low activity.
  - **Don't:** Expect dramatic performance improvements solely from database pruning.