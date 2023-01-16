---
title: Deploying a Discord.js bot to... a Raspberry Pi
summary: Paying a monthly fee to host a basic Discord bot isn't necessary; here's how I did it with my Raspberry Pi.
date: 2022-10-02
draft: false
---

Even though I've used Discord as a platform for many years, and been interested in possibly creating a bot, I had never properly looked into it. That recently changed when one of my [most-used bots](https://github.com/stoir/passel_public/), Passel, was announced to be discontinued. I discovered that one of the users of the bot had created a [fork](https://github.com/somedumbfox/passel-js) called `passel-js` using Discord.js, and being more familiar with JavaScript than Python, I decided to go for it.

The first important thing I learned about how Discord bots work is that they only serve as an interface with the Discord API. This means that there's no port-forwarding necessary when trying to host one; all you need is the process to be running constantly, and the bot will work fine. Knowing that, and also knowing that this bot would only be hosted on one server (and therefore not very resource-intensive), I elected to skip on paying DigitalOcean to host the bot and used my Raspberry Pi 3B instead.

![My Raspberry Pi 3B.](pi.jpg)

## Forking `passel-js`

After running `passel-js` and seeing that it was attempting to be a one-to-one copy of `passel_public` rather than adding any new features, I forked the repo and made my own bot with some modifications. I called it [Pinsir](https://github.com/laforcem/pinsir), with added support for the `dotenv` Node module and a few changes to embeds. Using `dotenv` was particularly important because the Discord bot token needs to be hidden from the code available on GitHub to prevent bad actors from taking control of your application.

## Running the bot on the Pi

Once I added my code onto the Pi, it was a relatively straightforward process to test the bot and make sure it worked. Using `npm start` to test resulted in everything working fine as it should. What took me some time to figure out is how I was to run the bot 24/7.

The answer is a Node module called `pm2`, which is a process manager for Node apps. Effectively, `pm2` can be used to "daemonize" an application: make it so that the app only shuts down when the system does, and comes right back online with the system as well. This is accomplished automatically without any manual interference.

I started off with installing the `pm2` module:

```bash
npm install -g pm2
```

Then, I run this command to start the application with `pm2`:

```bash
pm2 start npm --name "pinsir" -- start
```

This command uses the `npm start` command to run the application while also assigning it a process name of "pinsir". So, when I run `pm2 list` to list all active `pm2` processes, I see this:

```bash
$ pm2 list
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user
    │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ pinsir    │ default     │ 0.39.1  │ fork    │ 31366    │ 21s    │ 0    │ online    │ 0%       │ 48.5mb   │ mogg
    │ disabled │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
```

To configure the app to start on boot, a few more steps are needed. First,

```bash
pm2 startup systemd
```

which gives the following output:

```bash
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/home/malc/.nvm/versions/node/v18.9.0/bin /home/malc/.nvm/versions/node/v18.9.0/lib/node_modules/pm2/bin/pm2 startup systemd -u malc --hp /home/malc
```

If you run the command that the output gives you, `pm2` will run on boot and immediately start your application. More information on this step can be found on this [DigitalOcean tutorial page](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04).

## Finishing up

As I'm still working on Pinsir, I'll need to roll out updates to it by restarting the process. I can accomplish this with

```bash
pm2 restart pinsir
```

and the bot will start up with the updated code.

## Using a Pi beats a subscription fee by far

If you're not hosting anything particularly resource-intensive, I found this process to be far better than paying DigitalOcean or some other VPS service. As long as my Raspberry Pi maintains a stable power source and Internet connection, uptime will be solid and the bot will be quite responsive.
