# League Multi Chat
This application allows multiple users to type for another player in the League of Legends in game chat.

## Application Description
League Multi Chat is an electron application running node packages, socket.io, express, and robotjs. The application connects clients from across a network and transmits a message to be typed in chat. In order to type the message in chat, robotjs is emulating an enter key press, followed by the message, and terminated by another enter key press to send the message and close the chat box.

## A quick word on Riot's TOS
This application is aginst Riot's TOS. Macros are not allowed and a bannable offense, however, there are many players who macros to quickly type things in chat, which is very similar to how this program works. By using this application you will be breaking Riot's TOS and there is a possibility your account will be banned.

Here is a quick excerpt from the [TOS](https://www.riotgames.com/en/terms-of-service):

``` text
The following are examples of behavior that warrant disciplinary measures:

viii. Spamming chat, whether for personal or commercial purposes, by disrupting the 
flow of conversation with repeated postings;

x. Using any unauthorized third party programs, including mods, hacks, cheats, scripts, bots,
trainers and automation programs that interact with the Riot Services in any way, for any purpose,
including any unauthorized third party programs that intercept, emulate, or redirect any 
communication relating to the Riot Services and any unauthorized third party programs that 
collect info about the Riot Services by reading areas of memory used by the Riot Services to 
store info;
```

## Pre-Built Versions
The built windows version of this application can be acquired at the dropbox link: https://www.dropbox.com/s/3aznlg03nztrwg1/LeagueMultiChat-windows.zip?dl=1

## Building

### Prerequisites
Have [node.js](https://nodejs.org/) installed (for Windows you will want the 32-bit version)

### Build
1. Download the git repo
2. Run npm i to intall electron and other npm dependencies
```bash
npm i
```

3. Run the following command to rebuild the installed node packages to make sure they are built correctly (seems redundant but I have had problems with unmatched node versions)

```bash
npm run rebuild-all
```

4. If on windows run 
```bash
npm run fix-windows-type-lag
```
This will fix the delay in keystrokes when auto typing chat messages when on windows (default is about 2 characters per second without this fix)

5. Build for your given operating system by running one of the following commands respective of your operating sysrem
```bash
npm run package-mac
npm run package-win
npm run package-linux
```
Run the generated application file located in the directory "release-builds"

## License
[MIT](https://choosealicense.com/licenses/mit/)
