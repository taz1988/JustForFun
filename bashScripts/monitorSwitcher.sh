#!/bin/bash
if [ $1 = "tv" ]
then
    xrandr --output DVI-0 --auto --right-of VGA-0
    xrandr --output HDMI-0 --off
    xrandr --output VGA-0 --primary
else
    xrandr --output HDMI-0 --auto --left-of VGA-0
    xrandr --output DVI-0 --off
    xrandr --output HDMI-0 --primary
fi
