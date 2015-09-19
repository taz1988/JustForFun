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
install pidgin
install docker
install docker-compose
install ant
install ant-junit
install tomcat
install anki

######## End of list #############

