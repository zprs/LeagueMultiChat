# LeagueMultiChat
This application allows multiple users to type for another player in the League of Legends in game chat.

League Multi Chat is an electron application running node packages, socket.io, express, and robotjs. The application connects clients from across a network and transmits a message to be typed in chat. In order to type the message in chat, robotjs is emulating an enter key press, followed by the message, and terminated by another enter key press to send the message and close the chat box.

This application lies in a grey area in Riot's rules. Macros are not allowed and a bannable offense, however, there are many players who macros to quickly type things in chat, which is very similar to how this program works. Please keep this in mind and use at your own risk.

The built windows version of this application can be acquired at the dropbox link: https://www.dropbox.com/s/3aznlg03nztrwg1/LeagueMultiChat-windows.zip?dl=1

## Building and Running

### Prerequisites
Have node.js(https://nodejs.org/) installed (for Windows you will want the 32-bit version)

### Build
1. Download the git repo
2. Run
```bash
npm i
```
(this should install all of the required npm packages)
3. Run

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
### Run
Run the generated application file located in the directory "release-builds"

## License
[MIT](https://choosealicense.com/licenses/mit/)
