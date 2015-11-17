# Twimages
#### Inline images (and other enhancements) for Twitch chat

This is a userscript that requires either Greasemonkey for Firefox, or Tampermonkey for Chrome.  I imagine it will work in other contexts as well, but those are the only two userscript plugins I've tested it with.

## Features
* Inserts images sent as links into the chat
* Highlights messages containing your username
* Provides an "@" link by usernames to quickly reply to a user in chat

## Installation
* Install [Greasemonkey](https://addons.mozilla.org/en-us/firefox/addon/greasemonkey/) or [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) (depending on your browser of choice)
* Click [here](https://github.com/SammyIAm/Twimages/raw/master/twimages.user.js) (or on the "raw" link on the [source page for the twimages.user.js](https://github.com/SammyIAm/Twimages/blob/master/twimages.user.js) file)
* Enter Twitch chat, and enjoy!

## Configuration
There's no preferences/settings available yet, but if you want to turn a particular feature off, you can edit the script and comment out the appropriate line in the processNewMessages() function.  (e.g. put a `//` in front of `hightlightUsername(newMessage);` to turn off username highlighting.

## Troubleshooting / Issues
Feel free to submit questions, issues, suggestions, pull requests, etc. to this Git repo.
* If you mistyped your username or want to change it, you'll need to uninstall and reinstall the userscript.
