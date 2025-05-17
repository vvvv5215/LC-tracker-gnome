# LC-tracker-gnome

I've made a simple GNOME extension which keeps a count of your all time leetcode problem count and weekly leetcode problem count in your shell! (Note that it only works on gnome versions after 45 )

## DEMO
![image](https://github.com/user-attachments/assets/dfb481cc-cb12-4ab5-a58d-2ef9cbe055c2)
(next to vitals)

## MAKE SURE THAT YOUR THAT : the uuid and the name of the folder is same, do not change the name of the folder! and if you are changing it, change the uuid in the metadata.json file too!
I couldnt get schemas going for me, so please edit the file and change the leetcode username yourself :sob: 
## How to run it:
 1) Download the folder as a zip file.
 2) Extract the folder.
 3) VERY IMPORTANT: go to extension.js and change the leetcodeusername to your leetcode username.
![image](https://github.com/user-attachments/assets/5d7ffd4e-23d3-44bb-a1a6-47ea37972574)

 4) Open your files app and press ctrl + H, to access hidden files.
 5) Place the gnome@gnome.com folder in the following path:
![image](https://github.com/user-attachments/assets/9da27852-54d6-4923-bd46-9b6b3d75d464)

6) If you are on Wayland, log out and log in back, if on X11, alt + f2, type r and enter.
    and enable the extension with your extension manager ( tweaks, extension manager).
   For cli people: run it the terminal
   ` gnome-extensions enable <gnome@gnome.com>`
7) The extension should be running with no problem!

## Changes to colours and text if you wanna make some!
![image](https://github.com/user-attachments/assets/4c173649-d3bb-4c1d-acd7-413d21a4eaf3)
change the colours here however you see fit!

## If you wanna uninstall it:
Go the path where you placed the folder and delete it from there, or just remove it from the extension manager.

## Features which I may add later:
Show easy, medium, hard on hover and submission percentage but that's for another day!

