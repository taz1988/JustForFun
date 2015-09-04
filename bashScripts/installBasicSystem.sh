#!/bin/bash
# first install and enable repos from http://rpmfusion.org

######## List of packages, what I want to install for my system ########

export packages=thunderbird
export packages=$packages vlc


######## End of list #############


#install 

dnf -q install $packages
