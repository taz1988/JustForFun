#!/bin/bash
# This script move the tmp directory to ramdisk

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

# If the temp directory is in ramdisk at the execution of this script,
# remove the link and make an ordinary /tmp directory

# If the temp directory is not a symbolic link already to the
# ramdisk directory (intended :) ), make it a symlink
if [ "$(readlink $tempdir)" != "$ramdisk/$ramtmp" ]; then
 echo -e '\E[0;31m'"\033[1m[TEMP DIRECTORY IS NOT SYMBOLIC LINK]\033[0m"
 echo -e '\E[0;32m'"\033[1mThis is intended at this point\033[0m"
 
 echo -e '\E[0;33m'"\033[1mMoving $tempdir ---> $ramdisk/$ramtmp\033[0m"
 
 # Copy the files
 sleep 1
 rsync -av $tempdir/ $ramdisk/$ramtmp/
 
 # Remove the original tmp directory
 rm -rf $tempdir
 
 # Create symbolic link
 ln -s $ramdisk/$ramtmp $tempdir
fi

echo -e '\E[0;32m'"\033[1m[DONE]\033[0m"
