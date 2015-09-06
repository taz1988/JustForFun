#!/bin/bash
# first install and enable repos from http://rpmfusion.org


function install {
  dnf -y install $1
}

######## List of packages, what I want to install for my system ########

install thunderbird
install vlc
install qbittorrent
install remmina
install remmina-plugins-rdp
install calibre

######## End of list #############

