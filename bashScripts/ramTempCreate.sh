#!/bin/bash
# This script creates the ramdisk tmp directory

ramdisk=/mnt/ramdisk # ramdisk address
ramtmp=tmp # Ramdisk temp directory name
tempdir=/tmp # Temp directory address

# If the ramdisk temp directory is missing, make it and set mode, owner
if [ ! -r $ramdisk/$ramtmp ]; then
 echo -e '\E[0;31m'"\033[1m[RAMDISK TEMP DIRECOTRY ($ramdisk/$ramtmp) NOT FOUND]\033[0m"
 echo -e '\E[0;33m'"\033[1mCreating ramdisk temp directory\033[0m"
 mkdir $ramdisk/$ramtmp
fi

chown root:root $ramdisk/$ramtmp
chmod 777 $ramdisk/$ramtmp
chmod +t $ramdisk/$ramtmp

echo "This is a mounted RAMdisk. The contents of this directory is stored entirely in the RAM." > $ramdisk/README
echo "Please be sure not to store important things here." >> $ramdisk/README
echo "When the computer shuts down or the power cuts off, things here will be purged." >> $ramdisk/README

# If the temp directory is in ramdisk at the execution of this script,
# remove the link and make an ordinary /tmp directory
if [ "$(readlink $tempdir)" == "$ramdisk/$ramtmp" ]; then
 echo -e '\E[0;31m'"\033[1m[TEMP DIRECTORY IS RAMDISK BEFORE BOOT]\033[0m"
 echo -e '\E[0;32m'"\033[1mThis can cause boot failure\033[0m"

 # Remove old tmp file (symlink)
 echo -e '\E[0;33m'"\033[1mRemoving symbolic link\033[0m"
 rm $tempdir
 
 echo -e '\E[0;33m'"\033[1mCreating ordinary /tmp directory\033[0m"
 mkdir $tempdir
fi

# If the "ordinary" /tmp directory is missing create it and set mode, owner
if [ ! -r $tempdir ]; then
 echo -e '\E[0;31m'"\033[1m[TEMP DIRECTORY IS MISSING]\033[0m"
 echo -e '\E[0;32m'"\033[1mThis can cause boot failure\033[0m"
 
 echo -e '\E[0;33m'"\033[1mCreating ordinary /tmp directory\033[0m"
 mkdir $tempdir
fi

# Remove old tmp file (symlink)
echo -e '\E[0;33m'"\033[1mRemoving symbolic link\033[0m"
rm $tempdir
 
echo -e '\E[0;33m'"\033[1mCreating ordinary /tmp directory\033[0m"
mkdir $tempdir

chown root:root $tempdir
chmod 777 $tempdir
chmod +t $tempdir
