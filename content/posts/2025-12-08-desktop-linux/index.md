---
title: There and Back Again
summary: Desktop Linux and fighting back.
date: 2025-12-08
layout: "simple"
draft: false
---

One thing that most people can probably agree on, tech enthusiast or not, is that a lot of software has become frustrating to use. The internet is crammed full of ads and cookie popups wherever you go, your data is being harvested and sold by basically every platform you use, and once-reputable products have somehow become *worse* over time. Let's take Windows, for example. The beloved Windows 7 was iterated into 11, which offers such anti-features as [ads in your Start menu](https://www.theverge.com/2024/4/24/24138949/microsoft-windows-11-start-menu-ads-recommendations-setting-disable), [forced Microsoft Account registration](https://www.windowscentral.com/microsoft/windows-11/microsoft-triples-down-and-blocks-even-more-microsoft-account-bypasses-on-windows-11-an-online-account-is-non-negotiable), and [an AI chatbot preinstalled](https://www.microsoft.com/en-us/windows/learning-center/copilot-on-windows-11). Such progression is a great example of, if I may use the term, "[enshittification](https://web.archive.org/web/20231109135520/https://pluralistic.net/2023/01/21/potemkin-ai/#hey-guys)". Thus, people upset by these changes have three options: stop using the software entirely, suck it up and stick with it, or pursue an alternative (if it exists).

## The woeful tale

Back in May, after becoming fed up with Windows 11 on my ThinkPad T495, I decided I would pursue the only remotely feasible alternative to Windows: Linux.[^1] Armed with nothing but a grim determination to make it work no matter what hurdles I ran into, I had soon replaced Windows with Linux Mint 22.2. I honestly rather liked it. It was faster, slimmer, and more customizable than Windows, and I was able to run most things I needed. Anything I couldn't I just used on my other ThinkPad back home, which functions as a desktop PC. Tweaks were of course needed, and I created a running list so I could remember all of them, but tweaks are needed on Windows too (right?). Things have truly improved since my last time trying Linux back in 2020.

Fast-forward to August, and I was still going, and pretty happy at that. I'd recently cancelled Adobe Creative Cloud, a cathartic experience and one I'd highly recommend to anyone willing to switch up their workflow to other tools. That Adobe cancellation snowballed with some other frustrations I'd been thinking about, and really hit critical mass when I watched James Lee's video ["How I Broke up with Adobe"](https://www.youtube.com/watch?v=lm51xZHZI6g). That was it, and I nuked my Windows partition on the office PC as well, migrating both my machines to the Arch Linux-based EndeavourOS.

Endeavour surprised me, really, because I wasn't expecting it to be as stable as it was. Rolling-release distros generally seem to only appeal to the brave (and brave I was indeed feeling) since they've got a reputation for random breakage. But I didn't really experience that. I had to implement some workarounds and find some alternatives...

and then some more workarounds...

and a couple more alternatives...

and a hack or two...

I became sick of the relentless manual configuration needed for me to get Endeavour to behave the way I wanted it to.

So, last week, I switched to Fedora on both machines in hopes that it would be a bit more stable and ready out of the box. It was, to an extent. But it turns out that it didn't support TPM-backed disk encryption out of the box, and trying to install NVIDIA drivers on top of that manual process? Not happening. As it turns out, Ubuntu and openSUSE are the *only* distributions that support TPM-backed FDE out of the box, and the former doesn't yet support it with AMD machines.[^2]

It is at this point that I began to realize the extent that Linux still falls woefully short of the computing needs of your everyday person. Furthermore, I also realized that I had spent most of an entire week's free time getting these installations up to functional snuff for regular usage. Thus, the temptation lingering at the back of my mind early in the week came back with a vengeance, and I went back to Windows on my office machine.

## The purpose of technology

By the time I finished reinstalling Windows last week, I'd elapsed almost all of my spare time for the entire week getting my computers to run properly. Now, this happens to be a critical time for me and my fledgling household: we're buying our first car, I'm desperately reworking our budget, and there are myriad things to take care of in this Christmas season. More could be said. The bottom line is: I don't have the time to tinker with this stuff. And if I, a husband with no children yet and a fairly small apartment, don't have time for this, how much less do people with even busier lives have it!

Computers, and technology at large, exist for one primary purpose: to enhance our ability to have dominion over the earth. Or, in simpler terms, they are tools, a means to an end. No construction worker wants to troubleshoot his Milwaukee drill all day because he has work to do. That drill was supposed to make the work easier and faster, but it just made it harder. No housewife wants to disassemble the dryer and fix the loud squeaking noise that's been coming from it. No one likes troubleshooting the means, and a computer is just the means for most people, not the end itself.

My general observation with those who are enthusiastic about desktop Linux and particularly evangelistic about it is that they have or make time to deal with it. Their lives often do not have many pressing obligations, and if they do, those obligations are outsourced or ignored altogether. The more DIY the distribution, the more time spent on it. I would know; I sacrificed dozens of hours on Linux that I should have put towards the growing list of responsibilities in my notebook. It was neglectful. Naturally, there are exceptions to this, but it is my observation nonetheless.

## A blame game

Often accompanying the stories of people ditching Linux (at least online) is their take on why it's not usable. It's the gatekeeping neckbeards in the forums, it's *bad, bad NVIDIA* for not open-sourcing their drivers, it's the fragmentation of package distribution... you get the idea. These are all very true observations, but they are upstream from the problem of adoption. Why is adoption a struggle?

Let's examine the most popular Linux distributions. An entire separate blog post could be written about this, examining the limited statistics that we have on the matter, but I'll just do a drive-by for now. From my limited research, the most used desktop distros coming from actual polling seem to be:

- Ubuntu
- SteamOS
- RHEL/Fedora (remember the enterprise)
- Mint, openSUSE, and *maybe* Arch

The real heavy hitters here all have some form of organized corporate sponsorship. Ubuntu is run by Canonical, SteamOS by Valve, RHEL and Fedora by Red Hat. In fact, according to a 2015 report by the Linux Foundation, "over 80% of Linux kernel development is done by developers who are being paid for their work."[^3] This doesn't even include work done on desktop environments, drivers, infrastructure, or anything else. That number seems to have held steady over the last ten years, too[^4]. And who could forget Valve coming in and turbocharging the Wine project by developing Proton & SteamOS for the Steam Deck?

The point which I am making here is this: adoption of desktop Linux is a struggle because it's not where the money is. Anything that *does* work well and is consistently updated in Linux is generally the result of companies with a vested (financial) interest investing in its development. This should be a surprise to no one, especially those in the developer world like me who see volunteer-driven projects discontinued constantly. Epic Games needs a good reason to invest resources into Linux anti-cheat software so that people can run Fortnite on it, and sheer goodwill just isn't one. Would you really work thousands of hours on the Linux kernel for free? Maybe Torvalds would, but I certainly wouldn't, and probably not you either.

Anyone who at this point wishes to join with me in a rallying cry against capitalism should curb their enthusiasm, though, because abandoning capitalism is really not the solution here. The modern Western world - clearly better to live in than anywhere else by leaps and bounds - is like this in significant part due to capitalism and free market principles. That said, I do also believe that the moral decay of the West has brought us to a point where capitalism now appears ugly and disfigured. Mega-billionaires who can make money from thin air, the oppressive expansion of AI datacenters, most proprietary software just being spyware in a pretty package... there is indeed a problem, and you're not imagining it.

## ¿Viva la revolución?

So, Big Tech has grown out of control, and a sort of oligopoly has emerged. Our beloved Microsoft distributes proprietary adware to their users, knowing that they hate it, but not caring since no one wants to debug their Wayland session for hours just to get something playing on the TV (and fail in the end anyway). What can we ordinary folks do to fight back in the tech realm?

Some might say that we ought to just stick with desktop Linux through the rough patches so that we can really stick it to Big Tech. With enough people on board, we can overthrow the Windows establishment and establish a true competitor! Truly, I agreed with this at the start of my journey in May. I still do to an extent. But say you approach your wife with a fanatical glint in your eye telling her to switch to Linux because \[insert nerd rant here], and it's a 1:1 replacement and it will just be better, and you actually convince her to go through with it. Upon finding out that her touchpad works differently in every app and that she needs to enter *two* passwords every time she starts the laptop up, the most polite response may be an exasperated sigh.

I'm sure my point is made redundantly clear. Normies and grillers don't want to tangle with desktop Linux complications, and they should not be expected to. In my opinion, some of the best things we can do are:

- Use Linux on your PC if you can deal with it, and especially if you've got the time to submit bug reports and help frightened forum users.
- Maybe even install it on Grandpa & Grandma's computer, because all they do is check email and play Solitaire anyway.
- Definitely keep using it on your home server since nothing beats Linux in a server environment.
- Donate a couple bucks to a distro of your choice. Maybe Arch; [they could probably use](https://archlinux.org/news/recent-services-outages/) all the help they can get.

Cheers for making it this far. I would be most interested to hear what you've got to say about this, so if you want to, drop me an email about it.

[^1]: Yes, I'm ignoring FreeBSD and Hackintosh.

[^2]: I didn't bother trying openSUSE since, at this point, I was not convinced that the next distrophop would be my last.

[^3]: [Source](https://www.linuxfoundation.org/press/press-release/the-linux-foundation-releases-linux-development-report#:~:text=More%20than%2080%20percent%20of%20kernel%20development%20is%20done%20by%20developers%20who%20are%20being%20paid%20for%20their%20work.)

[^4]: [Source](https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah#:~:text=About%2080%25%20of%20kernel%20contributors%20are%20paid)
