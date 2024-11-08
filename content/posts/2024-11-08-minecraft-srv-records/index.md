---
title: A brief note on Minecraft and SRV DNS records
summary: I had a hard time finding documentation on how Minecraft handles servers hosted on SRV records.
date: 2024-11-08
layout: "simple"
draft: false
---

Recently, I've been hosting multiple Minecraft servers on my one beefy Oracle Cloud instance. Demand has been surprisingly high, so on top of my 350-plus-mod custom Forge server, I host a couple vanilla ones as well for my friends. There are no issues with this on an infrastructure level (unless you count resource limitations), but networking proved to be a bit of a challenge with this one.

You see, I try to use a custom domain for as much as possible, since it's bad practice to just hand out a bare IP address or even a domain with a specific port. This project was no exception to that. I wanted to map every Minecraft server running on a different port to its own subdomain. According to the Internet at large, this is actually very easy using SRV records. There were a number of [very useful writeups](https://www.mcmiddleearth.com/community/wiki/setting-up-a-srv-record/) that I consulted on this matter. The only problem was, it wasn't working.

Let's say my domain is `example.com`. I want my three Minecraft servers to be hosted on `one.example.com`, `two.example.com`, and `three.example.com`. So, I create SRV records as follows, matching the server port to the desired domain:

| service    | protocol   | priority | weight | port  | target             |
|------------|------------|----------|--------|-------|--------------------|
| _minecraft | _tcp.one   | 1        | 0      | 25565 | myserv.example.com |
| _minecraft | _tcp.two   | 1        | 0      | 25566 | myserv.example.com |
| _minecraft | _tcp.three | 1        | 0      | 25567 | myserv.example.com |

Everything was set up perfectly, according to every tutorial. And yet, when trying to access any one of them, they would all resolve to just Server One, hosted on port `25565`. That's strange - every server has its own assigned port in the DNS records.

After deleting and recreating records more times than I care to admit, I decided to try a different approach. Since `25565` is the default port that Minecraft is hosted on, maybe I should take `one.example.com` off that and host it on a different port. Thus making the new record as follows:

| service    | protocol   | priority | weight | port  | target             |
|------------|------------|----------|--------|-------|--------------------|
| _minecraft | _tcp.one   | 1        | 0      | 25568 | myserv.example.com |

Lo and behold, this worked like a charm. Servers Two and Three were now resolving to their own separate worlds, and Server One continued to work. But *why*?

The key to this issue had to do with port `25565` being the default port that a Minecraft server will expose itself on without modifying the config. It seems that the Minecraft client will prioritize this port in such a way that, if it finds a server with that port open, it will ignore the SRV record pointing it to something else. So, when my Minecraft client hit `myserv.example.com`, it saw that 25565 was open and ignored the rest of the instructions in the SRV record. By mapping Server One away from that port to a different one, it is forced to play by the rules of the DNS records, and resolves to the correct server.

I was unable to find any documentation for this online, so I thought I would do a brief writeup on my discovery. I'm not sure what kind of networking details might be involved with this, but it seems to me like the Minecraft client is configured to connect to 25565 by default, thus not respecting SRV records pointing it elsewhere. Either way, this is a working solution for anyone with the same issue!
