#!/bin/bash
# first install and enable repos from http://rpmfusion.org


function install {
  apt -y install $1
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
install lpf-skype
install mc
install maven
install gnome-subtitles
install samba
install system-config-samba
install htop
install alien
install rpmrebuild
install vim
install subscene
install workrave
### utilities###
install unrar
### reaqders ###
install chmsee
### games ###
install trophy
######## End of list #############

